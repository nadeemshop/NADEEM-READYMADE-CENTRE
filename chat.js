const https = require('https');
const readline = require('readline');

const NVIDIA_API_KEY = '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';

const SHOP_KNOWLEDGE = `
Tum Nadeem Readymade Centre ke helpful customer support assistant ho.
Shop: Nagra, Chhapra, Bihar | Owner: Aktar Hussain | WA: +91 80109 29093
Products: Shirts 499+, Blazers 799+, Kurtas 349+, Lehenga 4999+
Offers: Code NADEEM50 = 50% off | Free shipping above 999 | COD available
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
    model: 'nvidia/llama-3.1-nemotron-ultra-253b-v1',
    messages,
    max_tokens: 300,
    temperature: 0.7,
    stream: false,
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'integrate.api.nvidia.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return reject(json.error.message);
          if (json.choices && json.choices[0]) {
            resolve(json.choices[0].message.content);
          } else {
            reject('Invalid response format');
          }
        } catch (e) {
          reject('Error: ' + data);
        }
      });
    });
    req.on('error', (e) => reject(e.message));
    req.write(body);
    req.end();
  });
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  console.log('\n🤖 Nadeem AI Bot — Type karo, "exit" se band karo\n');

  const ask = () => {
    rl.question('Aap: ', async (input) => {
      const msg = input.trim();
      if (!msg) return ask();
      if (msg.toLowerCase() === 'exit') { console.log('Bot: Allah Hafiz! 🙏'); rl.close(); return; }
      
      process.stdout.write('Bot: thinking...');
      try {
        const reply = await askNvidia(msg);
        // Clear "thinking..."
        readline.cursorTo(process.stdout, 0);
        readline.clearLine(process.stdout, 0);
        
        history.push({ role: 'user', content: msg });
        history.push({ role: 'assistant', content: reply });
        console.log('Bot:', reply, '\n');
      } catch (err) {
        readline.cursorTo(process.stdout, 0);
        readline.clearLine(process.stdout, 0);
        console.log('❌ Error:', err, '\n');
      }
      ask();
    });
  };
  ask();
}

main();
