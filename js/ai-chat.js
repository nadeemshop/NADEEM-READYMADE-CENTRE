/**
 * NADEEM READYMADE CENTRE — AI Chat Widget
 * Vercel Version — /api/chat endpoint use karta hai
 * Save karo: js/ai-chat.js
 */

(function () {
  'use strict';

  // ✅ Vercel pe deploy hone ke baad apna domain daalo
  // Locally test ke liye: '/api/chat' hi theek hai
  const API_URL = '/api/chat';

  let chatHistory = [];
  let isOpen = false;
  let isTyping = false;

  /* ===== CSS ===== */
  const style = document.createElement('style');
  style.textContent = `
    #nadeemAIBtn {
      position: fixed;
      bottom: 7rem;
      left: 1.5rem;
      z-index: 450;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #D4AF37, #F5D060);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(212,175,55,0.5);
      transition: transform .2s;
      animation: ai-bounce 2s cubic-bezier(.36,.07,.19,.97) infinite;
      font-size: 1.5rem;
    }
    #nadeemAIBtn:hover {
      animation: none;
      transform: scale(1.18) rotate(-8deg);
      box-shadow: 0 8px 32px rgba(212,175,55,.8);
    }

    /* Bounce up-down animation */
    @keyframes ai-bounce {
      0%,100%  { transform: translateY(0)    scale(1); }
      15%      { transform: translateY(-14px) scale(1.08); }
      30%      { transform: translateY(0)    scale(.96); }
      45%      { transform: translateY(-7px)  scale(1.04); }
      60%      { transform: translateY(0)    scale(.98); }
      75%      { transform: translateY(-3px)  scale(1.01); }
    }

    /* Ripple rings around button */
    #nadeemAIBtn::before {
      content: '';
      position: absolute;
      inset: -6px;
      border-radius: 50%;
      border: 2px solid rgba(212,175,55,.5);
      animation: ripple1 2s ease-out infinite;
    }
    @keyframes ripple1 {
      0%   { transform: scale(1);   opacity: .7; }
      100% { transform: scale(1.7); opacity: 0; }
    }

    /* Attention-grabbing bubble message */
    #nadeemAIBtn::after {
      content: '💬 Madad chahiye?';
      position: absolute;
      left: calc(100% + 12px);
      top: 50%;
      transform: translateY(-50%) scale(.85);
      background: linear-gradient(135deg,#1a1a2e,#13131f);
      border: 1.5px solid rgba(212,175,55,.45);
      color: #F5D060;
      font-size: .75rem;
      font-weight: 800;
      padding: .4rem 1rem;
      border-radius: 20px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity .3s, transform .3s;
      font-family: 'DM Sans', sans-serif;
      box-shadow: 0 4px 16px rgba(0,0,0,.4);
      letter-spacing: .03em;
    }
    /* Show bubble after 3s automatically, then on hover */
    #nadeemAIBtn:hover::after {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
    #nadeemAIBtn.show-bubble::after {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }

    .ai-notif {
      position: absolute;
      top: -3px; right: -3px;
      width: 15px; height: 15px;
      background: #e84560;
      border-radius: 50%;
      border: 2px solid #07070f;
      animation: blink 1s infinite;
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }

    #nadeemAIChat {
      position: fixed;
      bottom: 7rem; left: 1.5rem;
      width: 340px; height: 480px;
      background: #0d0d1a;
      border: 1px solid rgba(212,175,55,.25);
      border-radius: 24px;
      z-index: 451;
      display: flex; flex-direction: column;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,.7);
      transform: scale(.85) translateY(20px);
      opacity: 0; pointer-events: none;
      transition: all .35s cubic-bezier(.175,.885,.32,1.275);
      font-family: 'DM Sans', sans-serif;
    }
    #nadeemAIChat.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

    @media(max-width:480px) {
      #nadeemAIChat { left:.8rem; right:.8rem; width:auto; bottom:5.5rem; height:420px; }
    }

    .ai-head {
      background: linear-gradient(135deg,#13131f,#1a1a2e);
      border-bottom: 1px solid rgba(212,175,55,.2);
      padding: .9rem 1.1rem;
      display: flex; align-items: center; gap: .7rem;
      flex-shrink: 0;
    }
    .ai-avatar {
      width:36px; height:36px; border-radius:50%;
      background: linear-gradient(135deg,#D4AF37,#F5D060);
      display:flex; align-items:center; justify-content:center;
      font-size:1.1rem; flex-shrink:0;
    }
    .ai-head-info { flex:1; }
    .ai-head-name { font-size:.85rem; font-weight:800; color:#f0f0f5; }
    .ai-head-status {
      font-size:.65rem; color:#2fcc71;
      display:flex; align-items:center; gap:.3rem; margin-top:.1rem;
    }
    .ai-dot { width:6px;height:6px;border-radius:50%;background:#2fcc71;animation:blink 2s infinite; }
    .ai-head-close {
      background:rgba(255,255,255,.08); border:none;
      width:28px;height:28px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;color:#8a8aa0;font-size:.8rem;transition:all .2s;
    }
    .ai-head-close:hover { background:#e84560;color:#fff; }

    .ai-messages {
      flex:1; overflow-y:auto; padding:.9rem;
      display:flex; flex-direction:column; gap:.6rem;
      scrollbar-width:thin; scrollbar-color:rgba(212,175,55,.2) transparent;
    }
    .ai-msg {
      max-width:85%; padding:.6rem .9rem;
      border-radius:16px; font-size:.82rem; line-height:1.6;
      animation:msg-in .25s ease;
    }
    @keyframes msg-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    .ai-msg.bot {
      background:rgba(212,175,55,.1); border:1px solid rgba(212,175,55,.18);
      color:#eeeef5; border-radius:4px 16px 16px 16px; align-self:flex-start;
    }
    .ai-msg.user {
      background:linear-gradient(135deg,#D4AF37,#F5D060);
      color:#000; font-weight:600;
      border-radius:16px 16px 4px 16px; align-self:flex-end;
    }
    .ai-typing {
      display:flex; gap:.3rem; align-items:center;
      padding:.6rem .9rem;
      background:rgba(212,175,55,.08); border:1px solid rgba(212,175,55,.15);
      border-radius:4px 16px 16px 16px; align-self:flex-start;
      animation:msg-in .25s ease;
    }
    .ai-typing span {
      width:6px;height:6px;border-radius:50%;background:#D4AF37;
      animation:tdot 1.2s ease-in-out infinite;
    }
    .ai-typing span:nth-child(2){animation-delay:.2s}
    .ai-typing span:nth-child(3){animation-delay:.4s}
    @keyframes tdot { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-5px);opacity:1} }

    .ai-quick-replies { display:flex;gap:.4rem;flex-wrap:wrap;padding:.5rem .9rem 0; }
    .ai-qr {
      background:rgba(212,175,55,.1); border:1px solid rgba(212,175,55,.25);
      color:#D4AF37; font-size:.68rem; font-weight:700;
      padding:.3rem .7rem; border-radius:20px; cursor:pointer;
      transition:all .2s; white-space:nowrap; font-family:'DM Sans',sans-serif;
    }
    .ai-qr:hover { background:#D4AF37; color:#000; }

    .ai-input-area {
      padding:.7rem .9rem; border-top:1px solid rgba(212,175,55,.15);
      display:flex; gap:.5rem; align-items:flex-end;
      flex-shrink:0; background:#0d0d1a;
    }
    .ai-input {
      flex:1; background:rgba(255,255,255,.06);
      border:1px solid rgba(212,175,55,.2); border-radius:20px;
      padding:.55rem 1rem; color:#f0f0f5; font-size:.82rem;
      outline:none; resize:none; font-family:'DM Sans',sans-serif;
      transition:border .2s; max-height:80px; line-height:1.4;
    }
    .ai-input:focus { border-color:#D4AF37; }
    .ai-input::placeholder { color:#8a8aa0; }
    .ai-send {
      width:36px;height:36px;border-radius:50%;
      background:linear-gradient(135deg,#D4AF37,#F5D060);
      border:none; cursor:pointer; flex-shrink:0;
      font-size:1rem; transition:all .2s;
      display:flex;align-items:center;justify-content:center;
    }
    .ai-send:hover { transform:scale(1.1); }
    .ai-send:disabled { opacity:.5;cursor:not-allowed;transform:none; }
    .ai-powered { text-align:center;font-size:.58rem;color:rgba(138,138,160,.5);padding:.3rem;letter-spacing:.08em; }
  `;
  document.head.appendChild(style);

  /* ===== HTML ===== */
  document.body.insertAdjacentHTML('beforeend', `
    <button id="nadeemAIBtn" title="AI Assistant">
      <div class="ai-notif"></div>🤖
    </button>
    <div id="nadeemAIChat">
      <div class="ai-head">
        <div class="ai-avatar">🤖</div>
        <div class="ai-head-info">
          <div class="ai-head-name">Nadeem AI Assistant</div>
          <div class="ai-head-status"><div class="ai-dot"></div>Online — Madad ke liye hoon!</div>
        </div>
        <button class="ai-head-close" id="aiClose">✕</button>
      </div>
      <div class="ai-messages" id="aiMessages"></div>
      <div class="ai-quick-replies" id="aiQR">
        <button class="ai-qr" onclick="nadeemAI.quickReply('Products ki prices kya hain?')">💰 Prices</button>
        <button class="ai-qr" onclick="nadeemAI.quickReply('COD available hai?')">🚚 COD</button>
        <button class="ai-qr" onclick="nadeemAI.quickReply('Wholesale ke baare mein batao')">📦 Wholesale</button>
        <button class="ai-qr" onclick="nadeemAI.quickReply('Offer code kya hai?')">🏷️ Offer</button>
      </div>
      <div class="ai-input-area">
        <textarea class="ai-input" id="aiInput" placeholder="Kuch bhi poochhein..." rows="1"></textarea>
        <button class="ai-send" id="aiSend">➤</button>
      </div>
      <div class="ai-powered">⚡ Powered by NADEEM AKHTAR</div>
    </div>
  `);

  /* ===== LOGIC ===== */
  const btn = document.getElementById('nadeemAIBtn');
  const chat = document.getElementById('nadeemAIChat');
  const msgs = document.getElementById('aiMessages');
  const input = document.getElementById('aiInput');
  const send = document.getElementById('aiSend');

  function toggle() {
    isOpen = !isOpen;
    chat.classList.toggle('open', isOpen);
    btn.querySelector('.ai-notif')?.remove();
    btn.classList.remove('show-bubble');
    if (isOpen) setTimeout(() => input.focus(), 350);
  }

  function addMsg(text, who) {
    const d = document.createElement('div');
    d.className = `ai-msg ${who}`;
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const d = document.createElement('div');
    d.className = 'ai-typing'; d.id = 'aiTyping';
    d.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  async function sendMsg(text) {
    if (!text.trim() || isTyping) return;
    isTyping = true; send.disabled = true;
    addMsg(text, 'user');
    input.value = ''; input.style.height = 'auto';
    document.getElementById('aiQR').style.display = 'none';
    showTyping();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: chatHistory }),
      });
      const data = await res.json();
      document.getElementById('aiTyping')?.remove();

      const reply = data.reply || 'Maafi chahta hoon, kuch problem aa gayi. Call karein: +91 80109 29093 🙏';
      addMsg(reply, 'bot');
      chatHistory.push({ role: 'user', content: text });
      chatHistory.push({ role: 'assistant', content: reply });
      if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

    } catch {
      document.getElementById('aiTyping')?.remove();
      addMsg('Server se connect nahi ho pa raha. Thodi der baad try karein 🙏', 'bot');
    }

    isTyping = false; send.disabled = false; input.focus();
  }

  // Welcome & Auto-Bubble
  setTimeout(() => addMsg('Assalamualaikum! 🤲 Main Nadeem AI hoon. Koi bhi sawaal poochhein — products, prices, wholesale, sab kuch!', 'bot'), 600);
  
  // Show attention bubble after 4 seconds
  setTimeout(() => {
    if(!isOpen) btn.classList.add('show-bubble');
  }, 4000);

  btn.addEventListener('click', toggle);
  document.getElementById('aiClose').addEventListener('click', toggle);
  send.addEventListener('click', () => sendMsg(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(input.value); }
  });
  input.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });

  window.nadeemAI = {
    quickReply: (t) => { if (!isOpen) toggle(); setTimeout(() => sendMsg(t), 400); },
    open: () => { if (!isOpen) toggle(); },
    close: () => { if (isOpen) toggle(); },
  };
})();
