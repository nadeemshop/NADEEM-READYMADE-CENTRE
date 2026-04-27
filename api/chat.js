/**
 * NADEEM READYMADE CENTRE — Vercel Serverless Function
 * File: api/chat.js
 * 
 * Vercel Dashboard → Settings → Environment Variables mein daalo:
 * NVIDIA_API_KEY = nvapi-xxxxxxxx
 */

const https = require('https');

const SYSTEM_PROMPT = `
Tum "Nadeem AI" ho — Nadeem Readymade Centre ke dil se helpful aur samajhdar assistant.

PERSONALITY:
- Warm, caring aur helpful dost ki tarah baat karo
- Customer ki feeling samjho — gusse mein ho toh maafi maango, pareshan ho toh sympathy do
- Hamesha Hindi/Hinglish mein baat karo
- Emojis use karo 😊
- Short helpful replies do

SHOP INFO:
- Naam: Nadeem Readymade Centre, Nagra, Bihar
- Owner: Nadeem Aktar | WA: +91 80109 29093

PRODUCTS:
- Men: Blazer ₹799, Shirt ₹499, Jeans ₹899
- Women: Kurta ₹999, Anarkali ₹1099, Lehenga ₹4999, Kurti ₹349
- Kids: Kurta ₹549, Party Dress ₹799

POLICIES:
- Free shipping ₹999+, COD available, 7 din return
- Wholesale: 10+ pieces pe 65% off
- Offer: NADEEM50 = pehle order 50% off

Complex sawaal ho toh WhatsApp karne kaho: +91 80109 29093 🤲
`;

module.exports = async (req, res) => {
  // CORS — website se call allow karo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { message, history = [] } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    // ✅ Vercel Environment Variable se aata hai
    const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
    if (!NVIDIA_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-8),
      { role: 'user', content: message },
    ];

    const payload = JSON.stringify({
      model: 'meta/llama-3.1-70b-instruct',
      messages,
      max_tokens: 350,
      temperature: 0.75,
      stream: false,
    });

    // NVIDIA API call
    const reply = await new Promise((resolve, reject) => {
      const nreq = https.request({
        hostname: 'integrate.api.nvidia.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NVIDIA_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      }, (nres) => {
        let data = '';
        nres.on('data', c => data += c);
        nres.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.error) return reject(json.error.message || JSON.stringify(json.error));
            if (json.choices && json.choices[0]) {
              resolve(json.choices[0].message.content);
            } else {
              reject('Invalid API response: ' + data);
            }
          } catch (e) {
            reject('Parse error: ' + data.slice(0, 100));
          }
        });
      });
      nreq.on('error', reject);
      nreq.write(payload);
      nreq.end();
    });

    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({
      error: 'Server error',
      reply: 'Maafi chahta hoon, abhi kuch technical problem hai. Please call karein: +91 80109 29093 🤲'
    });
  }
};
