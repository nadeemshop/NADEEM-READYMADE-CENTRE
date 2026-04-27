/**
 * =====================================================
 * NADEEM READYMADE CENTRE — Smart AI Bot v2.0
 * Emotionally Intelligent + Helpful + Hindi/Urdu
 * =====================================================
 * Run: node chat.js
 */

const https = require('https');
const readline = require('readline');

// ✅ APNI NVIDIA API KEY YAHAN DAALO
const NVIDIA_API_KEY = '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';

const SYSTEM_PROMPT = `
Tum "Nadeem AI" ho — Nadeem Readymade Centre ke dil se helpful aur samajhdar assistant.

=== TUMHARI PERSONALITY ===
- Tum ek caring, warm aur samajhdar dost ki tarah baat karte ho
- Customer ki feeling aur emotion pehle samjho, phir help karo
- Agar koi pareshan ho toh pehle unhe sunte ho, phir solution dete ho
- Kabhi robotic ya cold mat bano — hamesha insaani laho
- Mazaak mein bhi participate karo lekin limits mein
- Agar koi udaas ho toh pehle unhe support karo

=== EMOTION DETECTION ===
- Agar customer gusse mein ho → pehle maafi maango, phir solve karo
- Agar koi pareshan ya stressed ho → sympathy do, dheeraj se baat karo
- Agar koi khush ho → unki khushi mein shamil ho
- Agar koi confused ho → simple language mein samjhao, patience rakho
- Agar koi complain kare → seriously lo, defensive mat bano

=== SHOP INFO ===
Naam: Nadeem Readymade Centre
Owner: Nadeem Aktar
Location: Nagra, Chhapra, Bihar
WhatsApp: +91 80109 29093
Email: support@nadeemshop.com

=== PRODUCTS & PRICES ===
Men's Wear:
- Premium Slim Blazer: ₹799 (MRP ₹1999) — 60% off
- Oxford Cotton Shirt: ₹499 (MRP ₹999) — 50% off
- Stretch High Rise Jeans: ₹899 (MRP ₹1499) — 40% off

Women's Wear:
- Silk Embroidered Kurta: ₹999 (MRP ₹1999) — 55% off
- Floral Anarkali Suit: ₹1099 (MRP ₹2499) — 56% off
- Designer Wedding Lehenga: ₹4999 (MRP ₹12999) — 62% off
- Cotton Printed Kurti: ₹349 (MRP ₹799) — 56% off

Kids Wear:
- Traditional Kurta Set: ₹549 (MRP ₹1099) — 50% off
- Party Dress: ₹799 (MRP ₹1599) — 50% off

=== POLICIES ===
- Free shipping: ₹999 se upar
- COD: Haan, available hai
- Return: 7 din ke andar
- Payment: UPI, Bank Transfer, COD
- Sizes: XS se 3XL, Kids 2Y-10Y

=== WHOLESALE ===
- Minimum order: 10 pieces
- Discount: 65% tak
- Custom colors/sizes available
- Fast dispatch: 24-48 hours
- Contact: +91 80109 29093

=== OFFERS ===
- NADEEM50: Pehle order pe 50% off
- Eid Sale chal raha hai

=== LANGUAGE RULES ===
- Hamesha Hindi/Hinglish mein baat karo
- Customer jo language use kare, wahi use karo
- Simple aur samajhne wali bhasha
- Emojis use karo — warm feel ke liye 😊
- Short replies do jab simple sawaal ho
- Lambi reply tab do jab zaroorat ho

=== IMPORTANT ===
- Koi information nahi pata toh honestly batao
- Galat information mat do
- Hamesha WhatsApp pe direct contact suggest karo complex cases mein
- Customer ko kabhi ignore feel mat karao
`;

const history = [];

// ===== MOOD DETECT (simple local check) =====
function detectMood(text) {
  const lower = text.toLowerCase();
  if (/gussa|bakwaas|bekar|worst|ghatiya|pagal|bura|problem|complaint|cheated|dhoka/.test(lower))
    return 'angry';
  if (/pareshan|tension|stress|worried|anxious|musibat|takleef|dukh|sad|rona/.test(lower))
    return 'distressed';
  if (/khush|maza|great|awesome|shukriya|thanks|wah|zabardast|badhiya/.test(lower))
    return 'happy';
  if (/confused|samajh|kaise|kya|kyun|pata nahi|help/.test(lower))
    return 'confused';
  return 'neutral';
}

function moodPrefix(mood) {
  switch (mood) {
    case 'angry':
      return '[Customer gusse mein hai — pehle genuinely apologize karo, phir calmly solve karo]\n';
    case 'distressed':
      return '[Customer pareshan hai — pehle empathy dikhao, dheeraj se baat karo]\n';
    case 'happy':
      return '[Customer khush hai — unki khushi mein shamil ho, warm reply do]\n';
    case 'confused':
      return '[Customer confused hai — simple words mein step by step samjhao]\n';
    default:
      return '';
  }
}

// ===== NVIDIA API CALL =====
async function askNvidia(userMessage) {
  const mood = detectMood(userMessage);
  const prefix = moodPrefix(mood);

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-10),
    { role: 'user', content: prefix + userMessage },
  ];

  const body = JSON.stringify({
    model: 'meta/llama-3.1-70b-instruct',
    messages,
    max_tokens: 400,
    temperature: 0.75,
    stream: false,
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'integrate.api.nvidia.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.error) return reject(json.error.message);
            resolve(json.choices[0].message.content);
          } catch (e) {
            reject('Parse error: ' + data.slice(0, 200));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ===== TYPING EFFECT =====
function typeOut(text) {
  return new Promise((resolve) => {
    process.stdout.write('\x1b[33mNadeem AI:\x1b[0m ');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        process.stdout.write(text[i]);
        i++;
      } else {
        clearInterval(interval);
        process.stdout.write('\n\n');
        resolve();
      }
    }, 18);
  });
}

// ===== MAIN =====
async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('\n\x1b[36m╔════════════════════════════════════════╗');
  console.log('║   NADEEM READYMADE CENTRE — AI Bot    ║');
  console.log('║        Powered by NADEEM AKHTAR       ║');
  console.log('╚════════════════════════════════════════╝\x1b[0m');
  console.log('\x1b[90m"exit" likhke band karo\x1b[0m\n');

  // Welcome message
  await typeOut('Assalamualaikum! 🤲 Main Nadeem AI hoon. Aap kaise hain? Koi bhi sawaal poochhein — main yahan hoon aapki madad ke liye! 😊');

  const ask = () => {
    rl.question('\x1b[32mAap:\x1b[0m ', async (input) => {
      const msg = input.trim();
      if (!msg) return ask();
      if (msg.toLowerCase() === 'exit') {
        console.log('\x1b[33mNadeem AI:\x1b[0m Allah Hafiz! Dobara zaroor aana 🤲\n');
        rl.close();
        return;
      }

      process.stdout.write('\x1b[90m[Soch raha hoon...]\x1b[0m\r');

      try {
        const reply = await askNvidia(msg);
        process.stdout.write('                        \r');
        history.push({ role: 'user', content: msg });
        history.push({ role: 'assistant', content: reply });
        await typeOut(reply);
      } catch (err) {
        process.stdout.write('                        \r');
        console.log('\x1b[31mNadeem AI: Maafi chahta hoon, abhi kuch technical problem aa gayi. Thodi der baad try karein ya call karein: +91 80109 29093 🤲\x1b[0m\n');
      }

      ask();
    });
  };

  ask();
}

main();
