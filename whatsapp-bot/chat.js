/**
 * Nadeem Readymade Centre — AI Chatbot (Terminal Test)
 * Sirf NVIDIA API chahiye — koi WhatsApp setup nahi!
 * 
 * Run: node chat.js
 */

const https = require('https');
const readline = require('readline');

// ✅ APNI NVIDIA API KEY YAHAN DAALO
const NVIDIA_API_KEY = 'nvapi-xxxxxxxxxxxxxxxx'; // <-- sirf yeh change karo

const NVIDIA_MODEL = 'nvidia/llama-3.1-nemotron-ultra-253b-v1';

const SHOP_KNOWLEDGE = `
Tum Nadeem Readymade Centre ke helpful customer support assistant ho.
Shop: Nagra, Chhapra, Bihar | Owner: Aktar Hussain | WA: +91 80109 29093
Products: Shirts ₹499+, Blazers ₹799+, Kurtas ₹349+, Lehenga ₹4999+, Kids ₹549+
Offers: Code NADEEM50 = 50% off | Free shipping above ₹999 | COD available
Wholesale: Min 10 pieces, 65% discount
Rules: Hindi/Hinglish mein baat karo. Short answers do.
`;

const history = [];

async function askNvidia(userMessage) {
  const messages = [
    { role: 'system', content: SHOP_KNOWLEDGE },
    ...history.slice(-8),
    { role: 'user', content: userMessage },
  ];

  const body = JSON.stringify({
    model: NVIDIA_MODEL,
    messages,
    max_tokens: 300,
    temperature: 0.7,
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
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.error) return reject(json.error.message);
            resolve(json.choices[0].message.content);
          } catch (e) {
            reject('Response parse error: ' + data);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('\n🤖 Nadeem Readymade Centre — AI Bot');
  console.log('=====================================');
  console.log('Type karo aur Enter dabaao. "exit" likhke band karo.\n');

  const ask = () => {
    rl.question('Aap: ', async (input) => {
      const userMsg = input.trim();
      if (!userMsg) return ask();
      if (userMsg.toLowerCase() === 'exit') {
        console.log('Bot: Shukriya! Allah Hafiz 🙏');
        rl.close();
        return;
      }

      process.stdout.write('Bot: ');
      try {
        const reply = await askNvidia(userMsg);
        history.push({ role: 'user', content: userMsg });
        history.push({ role: 'assistant', content: reply });
        console.log(reply + '\n');
      } catch (err) {
        console.log('❌ Error: ' + err + '\n');
      }
      ask();
    });
  };

  ask();
}

main();
