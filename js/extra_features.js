/* ===== EXTRA FEATURES ===== */
const PROMOC = {'NADEEM50':{disc:50,type:'percent'}, 'WELCOME20':{disc:20,type:'percent'}};
let appliedPromo = null;
let recentlyViewed = JSON.parse(localStorage.getItem('nd_recently') || '[]');

function updateGreeting(user) {
  const banner = document.getElementById('greetingBanner');
  if (!banner) return;
  if (!user) { banner.classList.remove('show'); return; }
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  const avatarEl = document.getElementById('greetingAvatar');
  const msgEl = document.getElementById('greetingMsg');
  const ptsEl = document.getElementById('greetingPtsVal');
  if (avatarEl) avatarEl.textContent = user.name[0].toUpperCase();
  if (msgEl) msgEl.innerHTML = `${greet}, <strong>${user.name.split(' ')[0]}</strong>! 👋`;
  if (ptsEl) ptsEl.textContent = localStorage.getItem('nd_points_' + user.id) || '0';
  banner.classList.add('show');
}

function trackView(prodId) {
  recentlyViewed = [prodId, ...recentlyViewed.filter(id => id !== prodId)].slice(0,10);
  localStorage.setItem('nd_recently', JSON.stringify(recentlyViewed));
}

function buildRecentlyViewedSection() {
  const sec = document.getElementById('recentlySection');
  if (!sec) return;
  if (!recentlyViewed.length) { sec.style.display = 'none'; return; }
  sec.style.display = 'block';
  const scroll = document.getElementById('recentlyScroll');
  if (scroll) {
    const prods = recentlyViewed.slice(0,6).map(id => window.products?.find(p=>p.id===id)).filter(Boolean);
    scroll.innerHTML = prods.map(p => `<div class="prod-card" style="min-width:160px;flex:0 0 160px" onclick="openModal(${p.id})"><div class="prod-img" style="height:160px"><img src="${p.img}" alt="${p.name}"></div><div class="prod-info"><div class="prod-name">${p.name}</div><div class="prod-price">₹${p.price}</div></div></div>`).join('');
  }
}

function showPointsToast(msg) { if(window.showToast) window.showToast(msg); }

function updateWishBadge() {
  const wl = JSON.parse(localStorage.getItem('nd_wishlist') || '[]');
  const badge = document.getElementById('wishBadge');
  if (badge) { badge.textContent = wl.length; badge.style.display = wl.length > 0 ? 'flex' : 'none'; }
}

function showLoyaltyInCart(user) {
  const el = document.getElementById('cartLoyalty');
  if (el && user) {
    const pts = parseInt(localStorage.getItem('nd_points_'+user.id) || '0');
    if (pts > 0) { 
      el.style.display = 'flex'; 
      const ptsEl = document.getElementById('cartLoyaltyPts');
      if(ptsEl) ptsEl.textContent = pts + ' pts = ₹' + Math.floor(pts/10);
    }
  }
}

// Override addToCart to show mini cart preview
const _origAddToCart = window.addToCart;
window.addToCart = function(id, size) {
  if(_origAddToCart) _origAddToCart(id, size);
  updateWishBadge();
  const preview = document.getElementById('miniCartPreview');
  if (preview) {
    const cart = JSON.parse(localStorage.getItem('nd_cart') || '[]');
    if (cart.length > 0) {
      const itemsDiv = document.getElementById('mcpItems');
      const totalDiv = document.getElementById('mcpTotal');
      if(itemsDiv) itemsDiv.innerHTML = cart.slice(0,2).map(i => `<div class="mcp-item"><div class="mcp-img"><img src="${i.img}"></div><div class="mcp-name">${i.name}</div><div class="mcp-price">₹${i.price} × ${i.qty}</div></div>`).join('');
      if(totalDiv) totalDiv.textContent = '₹' + cart.reduce((s,i)=>s+i.price*i.qty,0);
      preview.classList.add('peek');
      setTimeout(() => preview.classList.remove('peek'), 3000);
    }
  }
};

// Override login to update greeting
const _origLogin = window.customerLogin;
window.customerLogin = function() {
  if(_origLogin) _origLogin();
  setTimeout(() => {
    const user = JSON.parse(localStorage.getItem('nd_current_user') || 'null');
    if (user) { updateGreeting(user); showLoyaltyInCart(user); }
  }, 100);
};

const _origSignup = window.customerSignup;
window.customerSignup = function() {
  if(_origSignup) _origSignup();
  setTimeout(() => {
    const user = JSON.parse(localStorage.getItem('nd_current_user') || 'null');
    if (user) updateGreeting(user);
  }, 100);
};

const _origLogout = window.logoutUser;
window.logoutUser = function() {
  if(window.closeProfile) window.closeProfile();
  if(_origLogout) _origLogout();
  updateGreeting(null);
};

// Override openModal to track views
const _origOpenModal = window.openModal;
window.openModal = function(id) {
  if(_origOpenModal) _origOpenModal(id);
  trackView(id);
};

/* ===== SPIN WHEEL LOGIC ===== */
const WHEEL_PRIZES = [
  {text: '5% OFF', type: 'promo', val: 'SPIN5'},
  {text: 'FREE DEL', type: 'promo', val: 'FREESHIP'},
  {text: '10% OFF', type: 'promo', val: 'SPIN10'},
  {text: '50 PTS', type: 'points', val: 50},
  {text: '20% OFF', type: 'promo', val: 'SPIN20'},
  {text: 'JACKPOT', type: 'points', val: 200}
];

window.openSpin = function() {
  document.getElementById('spinOverlay').classList.add('open');
  document.getElementById('spinContainer').classList.add('open');
  document.body.classList.add('modal-open');
}

window.closeSpin = function() {
  document.getElementById('spinOverlay').classList.remove('open');
  document.getElementById('spinContainer').classList.remove('open');
  document.body.classList.remove('modal-open');
}

let isSpinning = false;
window.spinWheel = function() {
  if (isSpinning) return;
  const user = JSON.parse(localStorage.getItem('nd_current_user') || 'null');
  if (!user) {
    if(window.showToast) window.showToast('❌ Please login to spin!');
    if(window.openLoginModal) window.openLoginModal();
    return;
  }
  
  const lastSpin = localStorage.getItem('nd_last_spin_' + user.id);
  if (lastSpin && (Date.now() - parseInt(lastSpin)) < 24 * 3600000) {
    if(window.showToast) window.showToast('🕒 You already spun today! Try tomorrow.');
    return;
  }

  isSpinning = true;
  const wheel = document.getElementById('wheel');
  const btn = document.getElementById('spinBtn');
  btn.disabled = true;
  btn.textContent = 'SPINNING...';

  const randomDeg = Math.floor(3000 + Math.random() * 2000);
  wheel.style.transition = 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)';
  wheel.style.transform = `rotate(${randomDeg}deg)`;

  setTimeout(() => {
    isSpinning = false;
    const actualDeg = randomDeg % 360;
    const prizeIndex = Math.floor((360 - actualDeg) / 60) % 6;
    const prize = WHEEL_PRIZES[prizeIndex];
    
    // Save spin time
    localStorage.setItem('nd_last_spin_' + user.id, Date.now());
    
    // Show result
    const res = document.getElementById('spinResult');
    const resTitle = document.getElementById('spinResultTitle');
    const resMsg = document.getElementById('spinResultMsg');
    res.style.display = 'block';
    resTitle.textContent = prize.text;
    
    if (prize.type === 'points') {
      const currentPts = parseInt(localStorage.getItem('nd_points_' + user.id) || '0');
      localStorage.setItem('nd_points_' + user.id, currentPts + prize.val);
      resMsg.textContent = `Congratulations! ${prize.val} points added to your account.`;
      if(window.showToast) window.showToast(`🎁 You won ${prize.val} points!`);
    } else {
      resMsg.textContent = `You won a promo code: ${prize.val}. Use it at checkout!`;
      if(window.showToast) window.showToast(`🎉 Promo code won: ${prize.val}`);
    }
    
    btn.textContent = 'SPUN TODAY';
    btn.disabled = true;
  }, 4100);
}

/* ===== SIZE HELPER LOGIC ===== */
window.openSizeRec = function() {
  document.getElementById('sizeRecPopup').classList.add('open');
  document.body.classList.add('modal-open');
}

window.closeSizeRec = function() {
  document.getElementById('sizeRecPopup').classList.remove('open');
  document.body.classList.remove('modal-open');
}

window.calcSize = function() {
  const h = parseFloat(document.getElementById('srec-height').value);
  const w = parseFloat(document.getElementById('srec-weight').value);
  if (!h || !w) { alert('Please enter both height and weight!'); return; }

  // Simple size recommendation logic
  let size = 'M';
  const bmi = w / ((h/100) * (h/100));
  
  if (bmi < 18.5) size = 'S';
  else if (bmi < 22) size = 'M';
  else if (bmi < 26) size = 'L';
  else if (bmi < 30) size = 'XL';
  else if (bmi < 35) size = 'XXL';
  else size = '3XL';

  const res = document.getElementById('srecResult');
  const sizeBig = document.getElementById('srecSizeBig');
  res.style.display = 'block';
  sizeBig.textContent = size;
  
  if(window.showToast) window.showToast(`📏 Recommended Size: ${size}`);
}

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('nd_current_user') || 'null');
  updateGreeting(user);
  updateWishBadge();
  if (user) showLoyaltyInCart(user);
  buildRecentlyViewedSection();
});
