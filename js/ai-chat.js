/**
 * NADEEM READYMADE CENTRE — AI Chat Widget
 * Existing website ke saath match karta hai (gold + dark theme)
 * Yeh file js/ai-chat.js mein save karo
 */

(function () {
  'use strict';

  const SERVER_URL = 'http://localhost:3001/chat';
  let chatHistory = [];
  let isOpen = false;
  let isTyping = false;

  /* ===== INJECT CSS ===== */
  const style = document.createElement('style');
  style.textContent = `
    /* ===== AI CHAT WIDGET ===== */
    #nadeemAIBtn {
      position: fixed;
      bottom: 7rem;
      left: 1.5rem;
      z-index: 450;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #D4AF37, #F5D060);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(212,175,55,0.5);
      transition: all .3s;
      animation: ai-pulse 3s ease-in-out infinite;
    }
    #nadeemAIBtn:hover {
      transform: scale(1.12);
      box-shadow: 0 6px 28px rgba(212,175,55,0.7);
    }
    #nadeemAIBtn svg {
      width: 26px;
      height: 26px;
      fill: #000;
    }
    @keyframes ai-pulse {
      0%,100% { box-shadow: 0 4px 20px rgba(212,175,55,.5); }
      50% { box-shadow: 0 4px 32px rgba(212,175,55,.8), 0 0 0 8px rgba(212,175,55,.1); }
    }

    /* Tooltip */
    #nadeemAIBtn::after {
      content: '🤖 AI Assistant';
      position: absolute;
      left: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%);
      background: #0d0d1a;
      border: 1px solid rgba(212,175,55,.3);
      color: #D4AF37;
      font-size: .72rem;
      font-weight: 700;
      padding: .3rem .8rem;
      border-radius: 20px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity .25s;
      font-family: 'DM Sans', sans-serif;
    }
    #nadeemAIBtn:hover::after { opacity: 1; }

    /* Notification dot */
    #nadeemAIBtn .ai-notif {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 14px;
      height: 14px;
      background: #e84560;
      border-radius: 50%;
      border: 2px solid #07070f;
      animation: notif-blink 1.5s infinite;
    }
    @keyframes notif-blink {
      0%,100% { opacity: 1; }
      50% { opacity: .3; }
    }

    /* ===== CHAT WINDOW ===== */
    #nadeemAIChat {
      position: fixed;
      bottom: 7rem;
      left: 1.5rem;
      width: 340px;
      height: 480px;
      background: #0d0d1a;
      border: 1px solid rgba(212,175,55,.25);
      border-radius: 24px;
      z-index: 451;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,.7);
      transform: scale(.85) translateY(20px);
      opacity: 0;
      pointer-events: none;
      transition: all .35s cubic-bezier(.175,.885,.32,1.275);
      font-family: 'DM Sans', sans-serif;
    }
    #nadeemAIChat.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    @media(max-width: 480px) {
      #nadeemAIChat {
        left: .8rem;
        right: .8rem;
        width: auto;
        bottom: 5.5rem;
        height: 420px;
      }
    }

    /* Header */
    .ai-head {
      background: linear-gradient(135deg, #13131f, #1a1a2e);
      border-bottom: 1px solid rgba(212,175,55,.2);
      padding: .9rem 1.1rem;
      display: flex;
      align-items: center;
      gap: .7rem;
      flex-shrink: 0;
    }
    .ai-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #D4AF37, #F5D060);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .ai-head-info { flex: 1; }
    .ai-head-name {
      font-size: .85rem;
      font-weight: 800;
      color: #f0f0f5;
      letter-spacing: .03em;
    }
    .ai-head-status {
      font-size: .65rem;
      color: #2fcc71;
      display: flex;
      align-items: center;
      gap: .3rem;
      margin-top: .1rem;
    }
    .ai-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #2fcc71;
      animation: notif-blink 2s infinite;
    }
    .ai-head-close {
      background: rgba(255,255,255,.08);
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #8a8aa0;
      font-size: .75rem;
      transition: all .2s;
    }
    .ai-head-close:hover { background: #e84560; color: #fff; }

    /* Messages */
    .ai-messages {
      flex: 1;
      overflow-y: auto;
      padding: .9rem;
      display: flex;
      flex-direction: column;
      gap: .6rem;
      scrollbar-width: thin;
      scrollbar-color: rgba(212,175,55,.2) transparent;
    }
    .ai-messages::-webkit-scrollbar { width: 3px; }
    .ai-messages::-webkit-scrollbar-thumb { background: rgba(212,175,55,.2); border-radius: 3px; }

    /* Message bubbles */
    .ai-msg {
      max-width: 85%;
      padding: .6rem .9rem;
      border-radius: 16px;
      font-size: .82rem;
      line-height: 1.6;
      animation: msg-in .25s ease;
    }
    @keyframes msg-in {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .ai-msg.bot {
      background: rgba(212,175,55,.1);
      border: 1px solid rgba(212,175,55,.18);
      color: #eeeef5;
      border-radius: 4px 16px 16px 16px;
      align-self: flex-start;
    }
    .ai-msg.user {
      background: linear-gradient(135deg, #D4AF37, #F5D060);
      color: #000;
      font-weight: 600;
      border-radius: 16px 16px 4px 16px;
      align-self: flex-end;
    }

    /* Typing indicator */
    .ai-typing {
      display: flex;
      gap: .3rem;
      align-items: center;
      padding: .6rem .9rem;
      background: rgba(212,175,55,.08);
      border: 1px solid rgba(212,175,55,.15);
      border-radius: 4px 16px 16px 16px;
      align-self: flex-start;
      animation: msg-in .25s ease;
    }
    .ai-typing span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #D4AF37;
      animation: typing-dot 1.2s ease-in-out infinite;
    }
    .ai-typing span:nth-child(2) { animation-delay: .2s; }
    .ai-typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes typing-dot {
      0%,100% { transform: translateY(0); opacity: .4; }
      50% { transform: translateY(-5px); opacity: 1; }
    }

    /* Quick replies */
    .ai-quick-replies {
      display: flex;
      gap: .4rem;
      flex-wrap: wrap;
      padding: .5rem .9rem 0;
    }
    .ai-qr {
      background: rgba(212,175,55,.1);
      border: 1px solid rgba(212,175,55,.25);
      color: #D4AF37;
      font-size: .68rem;
      font-weight: 700;
      padding: .3rem .7rem;
      border-radius: 20px;
      cursor: pointer;
      transition: all .2s;
      white-space: nowrap;
      font-family: 'DM Sans', sans-serif;
    }
    .ai-qr:hover { background: #D4AF37; color: #000; }

    /* Input area */
    .ai-input-area {
      padding: .7rem .9rem;
      border-top: 1px solid rgba(212,175,55,.15);
      display: flex;
      gap: .5rem;
      align-items: flex-end;
      flex-shrink: 0;
      background: #0d0d1a;
    }
    .ai-input {
      flex: 1;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(212,175,55,.2);
      border-radius: 20px;
      padding: .55rem 1rem;
      color: #f0f0f5;
      font-size: .82rem;
      outline: none;
      resize: none;
      font-family: 'DM Sans', sans-serif;
      transition: border .2s;
      max-height: 80px;
      line-height: 1.4;
    }
    .ai-input:focus { border-color: #D4AF37; }
    .ai-input::placeholder { color: #8a8aa0; }
    .ai-send {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #D4AF37, #F5D060);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all .2s;
    }
    .ai-send:hover { transform: scale(1.1); }
    .ai-send svg { width: 15px; height: 15px; fill: #000; }
    .ai-send:disabled { opacity: .5; cursor: not-allowed; transform: none; }

    /* Powered by */
    .ai-powered {
      text-align: center;
      font-size: .58rem;
      color: rgba(138,138,160,.5);
      padding: .3rem;
      letter-spacing: .08em;
    }
  `;
  document.head.appendChild(style);

  /* ===== INJECT HTML ===== */
  const btnHTML = `
    <button id="nadeemAIBtn" title="AI Assistant se baat karo">
      <div class="ai-notif"></div>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-5h2v2h-2zm0-8h2v6h-2z"/>
      </svg>
    </button>`;

  const chatHTML = `
    <div id="nadeemAIChat">
      <div class="ai-head">
        <div class="ai-avatar">🤖</div>
        <div class="ai-head-info">
          <div class="ai-head-name">Nadeem AI Assistant</div>
          <div class="ai-head-status">
            <div class="ai-status-dot"></div>
            Online — Madad ke liye hoon!
          </div>
        </div>
        <button class="ai-head-close" id="aiClose">✕</button>
      </div>
      <div class="ai-messages" id="aiMessages"></div>
      <div class="ai-quick-replies" id="aiQuickReplies">
        <button class="ai-qr" onclick="window.nadeemAI.quickReply('Products ki prices kya hain?')">💰 Prices</button>
        <button class="ai-qr" onclick="window.nadeemAI.quickReply('COD available hai?')">🚚 COD</button>
        <button class="ai-qr" onclick="window.nadeemAI.quickReply('Wholesale ke baare mein batao')">📦 Wholesale</button>
        <button class="ai-qr" onclick="window.nadeemAI.quickReply('Offer code kya hai?')">🏷️ Offer</button>
      </div>
      <div class="ai-input-area">
        <textarea class="ai-input" id="aiInput" placeholder="Kuch bhi poochhein..." rows="1"></textarea>
        <button class="ai-send" id="aiSend">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div class="ai-powered">⚡ Powered by NVIDIA AI</div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', btnHTML + chatHTML);

  /* ===== LOGIC ===== */
  const btn = document.getElementById('nadeemAIBtn');
  const chat = document.getElementById('nadeemAIChat');
  const closeBtn = document.getElementById('aiClose');
  const messagesEl = document.getElementById('aiMessages');
  const inputEl = document.getElementById('aiInput');
  const sendBtn = document.getElementById('aiSend');

  function toggleChat() {
    isOpen = !isOpen;
    chat.classList.toggle('open', isOpen);
    // Remove notification dot when opened
    const dot = btn.querySelector('.ai-notif');
    if (isOpen && dot) dot.remove();
    if (isOpen) setTimeout(() => inputEl.focus(), 350);
  }

  function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `ai-msg ${sender}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'ai-typing';
    div.id = 'aiTyping';
    div.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    document.getElementById('aiTyping')?.remove();
  }

  async function sendMessage(text) {
    if (!text.trim() || isTyping) return;
    isTyping = true;
    sendBtn.disabled = true;

    addMessage(text, 'user');
    inputEl.value = '';
    inputEl.style.height = 'auto';

    // Hide quick replies after first message
    document.getElementById('aiQuickReplies').style.display = 'none';

    showTyping();

    try {
      const res = await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: chatHistory }),
      });

      const data = await res.json();
      hideTyping();

      if (data.reply) {
        addMessage(data.reply, 'bot');
        chatHistory.push({ role: 'user', content: text });
        chatHistory.push({ role: 'assistant', content: data.reply });
        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
      } else {
        addMessage('Maafi chahta hoon, kuch technical problem aa gayi. Please call karein: +91 80109 29093 🙏', 'bot');
      }
    } catch (err) {
      hideTyping();
      addMessage('Server se connect nahi ho pa raha. Pehle "node server.js" run karein! 🙏', 'bot');
    }

    isTyping = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }

  // Welcome message
  setTimeout(() => {
    addMessage('Assalamualaikum! 🙏 Main Nadeem AI hoon. Aap kaise hain? Koi bhi sawaal poochhein — products, prices, wholesale, sab kuch!', 'bot');
  }, 500);

  // Events
  btn.addEventListener('click', toggleChat);
  closeBtn.addEventListener('click', toggleChat);
  sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputEl.value);
    }
  });
  inputEl.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });

  // Public API
  window.nadeemAI = {
    quickReply: (text) => {
      if (!isOpen) toggleChat();
      setTimeout(() => sendMessage(text), 400);
    },
    open: () => { if (!isOpen) toggleChat(); },
    close: () => { if (isOpen) toggleChat(); },
  };

})();
