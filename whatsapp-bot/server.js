/**
 * =====================================================
 * NADEEM READYMADE CENTRE — WhatsApp AI Bot
 * Tech: Node.js + Meta Cloud API + NVIDIA API
 * =====================================================
 */

const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// ===== CONFIG (apni values yahan dalo) =====
const CONFIG = {
  // Meta WhatsApp Cloud API
  WA_TOKEN: 'YOUR_WHATSAPP_ACCESS_TOKEN',       // Meta Developer Console se
  WA_PHONE_ID: 'YOUR_PHONE_NUMBER_ID',           // Meta Developer Console se
  VERIFY_TOKEN: 'nadeem_bot_2025',               // Koi bhi secret string

  // NVIDIA API
  NVIDIA_API_KEY: 'YOUR_NVIDIA_API_KEY',         // build.nvidia.com se
  NVIDIA_MODEL: 'nvidia/llama-3.1-nemotron-ultra-253b-v1',

  // Shop Info
  SHOP_NAME: 'Nadeem Readymade Centre',
  OWNER: 'Aktar Hussain',
  LOCATION: 'Nagra, Chhapra, Bihar',
  WA_NUMBER: '+91 80109 29093',
};

// ===== SHOP KNOWLEDGE BASE =====
const SHOP_KNOWLEDGE = `
Tum Nadeem Readymade Centre ke helpful customer support assistant ho.
Shop Details:
- Naam: Nadeem Readymade Centre
- Owner: Aktar Hussain
- Location: Nagra, Chhapra, Bihar
- WhatsApp: +91 80109 29093
- Email: support@nadeemshop.com

Products Available:
- Men's Wear: Shirts (₹499+), Blazers (₹799+), Jeans (₹899+)
- Women's Wear: Kurtas (₹349+), Anarkali Suits (₹1099+), Lehengas (₹4999+), Sarees (₹1299+)
- Kids Wear: Kurtas (₹549+), Party Dresses (₹799+)

Policies:
- Free shipping above ₹999
- COD (Cash on Delivery) available
- Wholesale orders: Minimum 10 pieces, up to 65% discount
- Sizes available: XS to 3XL, Kids 2Y to 10Y
- Return policy: 7 days
- Payment: UPI, Bank Transfer, COD

Current Offers:
- Use code NADEEM50 for 50% off first order
- Eid Sale chal raha hai

Important Rules:
- Hindi/Hinglish mein baat karo (customer jo language use kare)
- Short aur helpful answers do
- Agar price confirm karna ho toh WhatsApp pe direct contact karne kaho
- Wholesale ke liye always +91 80109 29093 pe direct contact karne kaho
- Friendly aur professional raho
`;

// ===== CONVERSATION MEMORY (simple in-memory) =====
const conversations = new Map(); // phoneNumber -> message history

function getHistory(phone) {
  if (!conversations.has(phone)) {
    conversations.set(phone, []);
  }
  return conversations.get(phone);
}

function addToHistory(phone, role, content) {
  const history = getHistory(phone);
  history.push({ role, content });
  // Keep only last 10 messages to save tokens
  if (history.length > 10) {
    conversations.set(phone, history.slice(-10));
  }
}

// ===== NVIDIA API CALL =====
async function getNvidiaResponse(phone, userMessage) {
  const history = getHistory(phone);

  const messages = [
    {
      role: 'system',
      content: SHOP_KNOWLEDGE,
    },
    ...history,
    {
      role: 'user',
      content: userMessage,
    },
  ];

  try {
    const response = await axios.post(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        model: CONFIG.NVIDIA_MODEL,
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${CONFIG.NVIDIA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const aiReply = response.data.choices[0].message.content;

    // Save to history
    addToHistory(phone, 'user', userMessage);
    addToHistory(phone, 'assistant', aiReply);

    return aiReply;
  } catch (error) {
    console.error('NVIDIA API Error:', error.response?.data || error.message);

    // Fallback response
    return `Aapka message mila! 🙏\n\nAbhi temporarily service issue hai. Please seedha contact karein:\n📞 +91 80109 29093\n\nHum jald hi aapki help karenge! 😊`;
  }
}

// ===== SEND WHATSAPP MESSAGE =====
async function sendWAMessage(to, message) {
  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/${CONFIG.WA_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${CONFIG.WA_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(`✅ Message sent to ${to}`);
  } catch (error) {
    console.error('❌ WhatsApp send error:', error.response?.data || error.message);
  }
}

// ===== WEBHOOK VERIFICATION (Meta requires this) =====
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === CONFIG.VERIFY_TOKEN) {
    console.log('✅ Webhook verified!');
    res.status(200).send(challenge);
  } else {
    console.log('❌ Webhook verification failed');
    res.sendStatus(403);
  }
});

// ===== INCOMING MESSAGE HANDLER =====
app.post('/webhook', async (req, res) => {
  res.sendStatus(200); // Always respond quickly to Meta

  try {
    const body = req.body;

    // Check if it's a WhatsApp message
    if (
      body.object !== 'whatsapp_business_account' ||
      !body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]
    ) {
      return;
    }

    const change = body.entry[0].changes[0].value;
    const message = change.messages[0];
    const senderPhone = message.from; // e.g., "919876543210"
    const senderName = change.contacts?.[0]?.profile?.name || 'Customer';

    // Only handle text messages
    if (message.type !== 'text') {
      await sendWAMessage(
        senderPhone,
        `Namaste ${senderName}! 🙏 Abhi hum sirf text messages handle kar sakte hain. Apna sawaal type karein ya call karein: +91 80109 29093`
      );
      return;
    }

    const userText = message.text.body.trim();
    console.log(`📩 Message from ${senderName} (${senderPhone}): ${userText}`);

    // Get AI response
    const aiResponse = await getNvidiaResponse(senderPhone, userText);

    // Send response
    await sendWAMessage(senderPhone, aiResponse);

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
  }
});

// ===== HEALTH CHECK =====
app.get('/', (req, res) => {
  res.json({
    status: '✅ Running',
    bot: 'Nadeem Readymade Centre WhatsApp Bot',
    model: CONFIG.NVIDIA_MODEL,
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
🚀 ===============================================
   NADEEM READYMADE CENTRE — WhatsApp AI Bot
   Port: ${PORT}
   Webhook URL: https://YOUR_DOMAIN/webhook
   Model: ${CONFIG.NVIDIA_MODEL}
================================================`);
});
