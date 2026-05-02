/**
 * NADEEM READYMADE CENTRE — AI Chat Widget v3
 * Cute animated robot face + bounce animation + Assalamualaikum
 */

(function () {
  'use strict';

  const API_URL = '/api/chat';
  let chatHistory = [];
  let isOpen = false;
  let isTyping = false;

  /* ===== CSS ===== */
  const style = document.createElement('style');
  style.textContent = `
    /* ===== BOT BUTTON ===== */
    #nadeemAIBtn {
      position: fixed;
      bottom: 7rem;
      left: 1.5rem;
      z-index: 450;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(145deg, #1a2a6c, #2d3a8c);
      border: 3px solid rgba(212,175,55,0.5);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 24px rgba(26,42,108,0.6), 0 0 0 0 rgba(212,175,55,0.3);
      transition: transform .2s, box-shadow .2s;
      animation: bot-bounce 2.4s cubic-bezier(.36,.07,.19,.97) infinite;
      padding: 0;
      overflow: visible;
    }
    #nadeemAIBtn:hover {
      animation: none;
      transform: scale(1.15) rotate(-6deg);
      box-shadow: 0 10px 32px rgba(26,42,108,0.7), 0 0 0 8px rgba(212,175,55,0.15);
    }
    @keyframes bot-bounce {
      0%,100%  { transform: translateY(0)     scale(1);    }
      14%      { transform: translateY(-16px)  scale(1.07); }
      28%      { transform: translateY(0)      scale(.95);  }
      42%      { transform: translateY(-8px)   scale(1.03); }
      56%      { transform: translateY(0)      scale(.98);  }
      70%      { transform: translateY(-3px)   scale(1.01); }
    }

    /* Ripple ring */
    #nadeemAIBtn::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid rgba(212,175,55,0.55);
      animation: ripple 2.4s ease-out infinite;
      pointer-events: none;
    }
    @keyframes ripple {
      0%   { transform: scale(1);    opacity: .8; }
      100% { transform: scale(1.75); opacity: 0;  }
    }

    /* Speech bubble */
    #aiBubble {
      position: fixed;
      bottom: 9.8rem;
      left: 5.5rem;
      background: linear-gradient(135deg,#1a2a6c,#2d3a8c);
      border: 1.5px solid rgba(212,175,55,.5);
      color: #F5D060;
      font-size: .75rem;
      font-weight: 800;
      padding: .45rem 1rem;
      border-radius: 20px 20px 20px 4px;
      white-space: nowrap;
      z-index: 449;
      box-shadow: 0 4px 16px rgba(0,0,0,.4);
      letter-spacing: .03em;
      font-family: 'DM Sans', sans-serif;
      opacity: 0;
      transform: scale(.8) translateY(6px);
      transition: opacity .35s, transform .35s;
      pointer-events: none;
    }
    #aiBubble.show {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    /* Red notification dot */
    #aiNotifDot {
      position: absolute;
      top: -2px; right: -2px;
      width: 15px; height: 15px;
      background: #e84560;
      border-radius: 50%;
      border: 2.5px solid #07070f;
      animation: dotblink 1.2s infinite;
      pointer-events: none;
    }
    @keyframes dotblink { 0%,100%{opacity:1} 50%{opacity:.15} }

    /* ===== CHAT WINDOW ===== */
    #nadeemAIChat {
      position: fixed;
      bottom: 7rem; left: 1.5rem;
      width: 340px; height: 500px;
      background: #0a0a18;
      border: 1px solid rgba(212,175,55,.3);
      border-radius: 24px;
      z-index: 451;
      display: flex; flex-direction: column;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(0,0,0,.75);
      transform: scale(.82) translateY(24px);
      opacity: 0; pointer-events: none;
      transition: all .38s cubic-bezier(.175,.885,.32,1.275);
      font-family: 'DM Sans', sans-serif;
    }
    #nadeemAIChat.open {
      transform: scale(1) translateY(0);
      opacity: 1; pointer-events: all;
    }
    @media(max-width:480px) {
      #nadeemAIChat { left:.7rem; right:.7rem; width:auto; bottom:5.5rem; height:430px; }
      #aiBubble { left: 5rem; font-size:.7rem; }
    }

    /* Header */
    .ai-head {
      background: linear-gradient(135deg,#0f1535,#1a2a6c);
      border-bottom: 1px solid rgba(212,175,55,.22);
      padding: .85rem 1.1rem;
      display: flex; align-items: center; gap: .8rem;
      flex-shrink: 0;
    }
    .ai-avatar-wrap {
      width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(145deg,#1e3a8a,#2d5ad4);
      border: 2px solid rgba(212,175,55,.4);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; overflow: hidden;
    }
    .ai-head-info { flex: 1; }
    .ai-head-name { font-size: .86rem; font-weight: 800; color: #f0f0f5; letter-spacing: .02em; }
    .ai-head-status {
      font-size: .63rem; color: #2fcc71;
      display: flex; align-items: center; gap: .3rem; margin-top: .12rem;
    }
    .ai-online-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #2fcc71;
      animation: dotblink 2.2s infinite;
    }
    .ai-head-close {
      background: rgba(255,255,255,.07); border: none;
      width: 28px; height: 28px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #8a8aa0; font-size: .8rem; transition: all .2s;
    }
    .ai-head-close:hover { background: #e84560; color: #fff; }

    /* Messages */
    .ai-messages {
      flex: 1; overflow-y: auto; padding: .85rem;
      display: flex; flex-direction: column; gap: .55rem;
      scrollbar-width: thin; scrollbar-color: rgba(212,175,55,.2) transparent;
    }
    .ai-messages::-webkit-scrollbar { width: 3px; }
    .ai-messages::-webkit-scrollbar-thumb { background: rgba(212,175,55,.2); border-radius: 3px; }

    .ai-msg {
      max-width: 84%; padding: .58rem .9rem;
      border-radius: 16px; font-size: .82rem; line-height: 1.6;
      animation: msgin .22s ease;
    }
    @keyframes msgin { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:translateY(0)} }
    .ai-msg.bot {
      background: rgba(45,58,140,.35);
      border: 1px solid rgba(212,175,55,.18);
      color: #e8e8f5;
      border-radius: 4px 16px 16px 16px;
      align-self: flex-start;
    }
    .ai-msg.user {
      background: linear-gradient(135deg,#D4AF37,#F5D060);
      color: #000; font-weight: 700;
      border-radius: 16px 16px 4px 16px;
      align-self: flex-end;
    }

    /* Typing dots */
    .ai-typing {
      display: flex; gap: .3rem; align-items: center;
      padding: .6rem .9rem;
      background: rgba(45,58,140,.25);
      border: 1px solid rgba(212,175,55,.15);
      border-radius: 4px 16px 16px 16px;
      align-self: flex-start;
      animation: msgin .22s ease;
    }
    .ai-typing span {
      width: 6px; height: 6px; border-radius: 50%;
      background: #D4AF37;
      animation: tdot 1.2s ease-in-out infinite;
    }
    .ai-typing span:nth-child(2){animation-delay:.2s}
    .ai-typing span:nth-child(3){animation-delay:.4s}
    @keyframes tdot { 0%,100%{transform:translateY(0);opacity:.35} 50%{transform:translateY(-5px);opacity:1} }

    /* Quick replies */
    .ai-quick-replies {
      display: flex; gap: .4rem; flex-wrap: wrap;
      padding: .5rem .85rem 0;
    }
    .ai-qr {
      background: rgba(212,175,55,.1);
      border: 1px solid rgba(212,175,55,.28);
      color: #D4AF37; font-size: .68rem; font-weight: 800;
      padding: .3rem .75rem; border-radius: 20px;
      cursor: pointer; transition: all .2s; white-space: nowrap;
      font-family: 'DM Sans', sans-serif;
    }
    .ai-qr:hover { background: #D4AF37; color: #000; transform: translateY(-1px); }

    /* Input */
    .ai-input-area {
      padding: .65rem .85rem;
      border-top: 1px solid rgba(212,175,55,.15);
      display: flex; gap: .5rem; align-items: flex-end;
      flex-shrink: 0; background: #0a0a18;
    }
    .ai-input {
      flex: 1; background: rgba(255,255,255,.06);
      border: 1px solid rgba(212,175,55,.22);
      border-radius: 20px; padding: .55rem 1rem;
      color: #f0f0f5; font-size: .82rem;
      outline: none; resize: none;
      font-family: 'DM Sans', sans-serif;
      transition: border .2s; max-height: 80px; line-height: 1.4;
    }
    .ai-input:focus { border-color: #D4AF37; }
    .ai-input::placeholder { color: #8a8aa0; }
    .ai-send {
      width: 36px; height: 36px; border-radius: 50%;
      background: linear-gradient(135deg,#D4AF37,#F5D060);
      border: none; cursor: pointer; flex-shrink: 0;
      font-size: 1rem; transition: all .2s;
      display: flex; align-items: center; justify-content: center;
    }
    .ai-send:hover { transform: scale(1.12); }
    .ai-send:disabled { opacity: .5; cursor: not-allowed; transform: none; }
    .ai-powered {
      text-align: center; font-size: .57rem;
      color: rgba(138,138,160,.45); padding: .28rem;
      letter-spacing: .08em;
    }
  `;
  document.head.appendChild(style);

  /* ===== CUTE ROBOT SVG FACE ===== */
  const robotSVG = `
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Antenna -->
      <line x1="18" y1="2" x2="18" y2="7" stroke="#D4AF37" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="18" cy="1.5" r="1.8" fill="#F5D060"/>

      <!-- Head -->
      <rect x="6" y="7" width="24" height="20" rx="8" fill="#3B5BDB"/>
      <rect x="6" y="7" width="24" height="20" rx="8" fill="url(#rg)" opacity="0.4"/>

      <!-- Eyes -->
      <circle cx="13" cy="15" r="3.2" fill="#E8F0FF"/>
      <circle cx="23" cy="15" r="3.2" fill="#E8F0FF"/>
      <!-- Pupils (wink/blink anim) -->
      <circle cx="13.6" cy="15.4" r="1.6" fill="#1a2a6c" id="rpupL"/>
      <circle cx="23.6" cy="15.4" r="1.6" fill="#1a2a6c" id="rpupR"/>
      <!-- Eye shine -->
      <circle cx="14.2" cy="14.2" r=".65" fill="white"/>
      <circle cx="24.2" cy="14.2" r=".65" fill="white"/>

      <!-- Smile -->
      <path d="M13 21 Q18 25 23 21" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" fill="none"/>

      <!-- Cheek blush -->
      <ellipse cx="9.5" cy="21" rx="2.5" ry="1.4" fill="#F5D060" opacity="0.35"/>
      <ellipse cx="26.5" cy="21" rx="2.5" ry="1.4" fill="#F5D060" opacity="0.35"/>

      <!-- Ear bumps -->
      <rect x="3" y="13" width="3.5" height="6" rx="1.8" fill="#2d4abf"/>
      <rect x="29.5" y="13" width="3.5" height="6" rx="1.8" fill="#2d4abf"/>

      <defs>
        <radialGradient id="rg" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="white"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
    </svg>
  `;

  /* ===== SMALL ROBOT FOR HEADER ===== */
  const robotSmSVG = `
    <svg width="26" height="26" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="2" x2="18" y2="7" stroke="#D4AF37" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="18" cy="1.5" r="1.8" fill="#F5D060"/>
      <rect x="6" y="7" width="24" height="20" rx="8" fill="#3B5BDB"/>
      <circle cx="13" cy="15" r="3.2" fill="#E8F0FF"/>
      <circle cx="23" cy="15" r="3.2" fill="#E8F0FF"/>
      <circle cx="13.6" cy="15.4" r="1.6" fill="#1a2a6c"/>
      <circle cx="23.6" cy="15.4" r="1.6" fill="#1a2a6c"/>
      <circle cx="14.2" cy="14.2" r=".65" fill="white"/>
      <circle cx="24.2" cy="14.2" r=".65" fill="white"/>
      <path d="M13 21 Q18 25 23 21" stroke="#D4AF37" stroke-width="2" stroke-linecap="round" fill="none"/>
      <rect x="3" y="13" width="3.5" height="6" rx="1.8" fill="#2d4abf"/>
      <rect x="29.5" y="13" width="3.5" height="6" rx="1.8" fill="#2d4abf"/>
    </svg>
  `;

  /* ===== HTML ===== */
  document.body.insertAdjacentHTML('beforeend', `
    <div id="aiBubble">💬 Kuch poochhna hai?</div>

    <button id="nadeemAIBtn" title="AI Assistant se baat karein">
      <div id="aiNotifDot"></div>
      ${robotSVG}
    </button>

    <div id="nadeemAIChat">
      <div class="ai-head">
        <div class="ai-avatar-wrap">${robotSmSVG}</div>
        <div class="ai-head-info">
          <div class="ai-head-name">Nadeem AI Assistant</div>
          <div class="ai-head-status">
            <div class="ai-online-dot"></div>
            Online — Madad ke liye hoon!
          </div>
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
      <div class="ai-powered">⚡ Powered by NVIDIA AI</div>
    </div>
  `);

  /* ===== LOGIC ===== */
  const btn    = document.getElementById('nadeemAIBtn');
  const chat   = document.getElementById('nadeemAIChat');
  const msgs   = document.getElementById('aiMessages');
  const input  = document.getElementById('aiInput');
  const send   = document.getElementById('aiSend');
  const bubble = document.getElementById('aiBubble');

  /* Show speech bubble after 2.5s to attract attention */
  setTimeout(() => bubble.classList.add('show'), 2500);
  /* Hide bubble after 6s */
  setTimeout(() => bubble.classList.remove('show'), 6000);

  /* Eye blink animation on robot */
  function blinkRobot() {
    const pL = document.getElementById('rpupL');
    const pR = document.getElementById('rpupR');
    if (!pL || !pR) return;
    pL.setAttribute('ry', '0.3'); pR.setAttribute('ry', '0.3');
    setTimeout(() => { pL.removeAttribute('ry'); pR.removeAttribute('ry'); }, 150);
  }
  setInterval(blinkRobot, 3500);

  function toggle() {
    isOpen = !isOpen;
    chat.classList.toggle('open', isOpen);
    bubble.classList.remove('show');
    document.getElementById('aiNotifDot')?.remove();
    if (isOpen) setTimeout(() => input.focus(), 380);
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

  /* Welcome message — Assalamualaikum */
  setTimeout(() => {
    addMsg('Assalamualaikum wa Rahmatullahi wa Barakatuh! 🤲 Main Nadeem AI hoon. Koi bhi sawaal poochhein — products, prices, wholesale, sab kuch mein madad karunga!', 'bot');
  }, 650);

  btn.addEventListener('click', toggle);
  document.getElementById('aiClose').addEventListener('click', toggle);
  send.addEventListener('click', () => sendMsg(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(input.value); }
  });
  input.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });

  window.nadeemAI = {
    quickReply: (t) => { if (!isOpen) toggle(); setTimeout(() => sendMsg(t), 420); },
    open:  () => { if (!isOpen) toggle(); },
    close: () => { if (isOpen)  toggle(); },
  };
})();
