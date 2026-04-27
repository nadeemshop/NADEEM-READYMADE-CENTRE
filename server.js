/**
 * NADEEM READYMADE CENTRE — AI Chat Backend
 * Run: node server.js
 * Then open index.html in browser
 */

const http = require('http');
const https = require('https');

// ✅ APNI NVIDIA API KEY YAHAN DAALO
const NVIDIA_API_KEY = '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';

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
- Owner: Aktar Hussain | WA: +91 80109 29093

PRODUCTS:
- Men: Blazer ₹799, Shirt ₹499, Jeans ₹899
- Women: Kurta ₹999, Anarkali ₹1099, Lehenga ₹4999, Kurti ₹349
- Kids: Kurta ₹549, Party Dress ₹799

POLICIES:
- Free shipping ₹999+, COD available, 7 din return
- Wholesale: 10+ pieces pe 65% off
- Offer: NADEEM50 = pehle order 50% off

Agar koi complex sawaal ho toh WhatsApp karne kaho: +91 80109 29093
`;

// Simple CORS + JSON server
const server = http.createServer((req, res) => {
  // CORS headers — browser se call allow karo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { message, history = [] } = JSON.parse(body);

        const messages = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-8),
          { role: 'user', content: message },
        ];

        const payload = JSON.stringify({
          model: 'nvidia/llama-3.1-nemotron-ultra-253b-v1',
          messages,
          max_tokens: 350,
          temperature: 0.75,
          stream: false,
        });

        // Call NVIDIA API
        const nvidiaReq = https.request({
          hostname: 'integrate.api.nvidia.com',
          path: '/v1/chat/completions',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${NVIDIA_API_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
          },
        }, (nvidiaRes) => {
          let data = '';
          nvidiaRes.on('data', c => data += c);
          nvidiaRes.on('end', () => {
            try {
              const json = JSON.parse(data);
              if (json.error) throw new Error(json.error.message);
              const reply = json.choices[0].message.content;
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ reply }));
            } catch (e) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: e.message }));
            }
          });
        });

        nvidiaReq.on('error', (e) => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        });

        nvidiaReq.write(payload);
        nvidiaReq.end();

      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad request' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(3001, () => {
  console.log('\n🤖 ========================================');
  console.log('   NADEEM AI — Backend Server Running');
  console.log('   URL: http://localhost:3001/chat');
  console.log('   Ab index.html browser mein kholo!');
  console.log('==========================================\n');
});
