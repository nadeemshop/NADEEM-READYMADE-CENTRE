/* ============================================================
   EXTRA FEATURES SCRIPT — Nadeem Readymade Centre
   ============================================================ */
const WA = '918010929093';
const PROMOC = {
  'NADEEM50':{disc:50,type:'percent',label:'50% OFF'},
  'WELCOME20':{disc:20,type:'percent',label:'20% OFF'},
  'FLAT100':{disc:100,type:'flat',label:'₹100 OFF'},
  'EID2025':{disc:30,type:'percent',label:'30% OFF'}
};
let appliedPromo = null;
let recentlyViewed = JSON.parse(localStorage.getItem('nd_recently') || '[]');
let compareList = [];
let fbRating = 0;
let spinUsed = localStorage.getItem('nd_spin_used') === 'true';
let loyaltyPoints = 0;

/* ===== SCROLL PROGRESS ===== */
window.addEventListener('scroll', () => {
  const prog = document.getElementById('scrollProgress');
  if(prog){
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    prog.style.width = Math.min(pct, 100) + '%';
  }
  const st = document.getElementById('scrollTopBtn');
  if(st) st.classList.toggle('show', window.scrollY > 400);
});

/* ===== GREETING BANNER ===== */
function updateGreeting(user){
  const banner = document.getElementById('greetingBanner');
  if(!banner) return;
  if(!user){ banner.classList.remove('show'); return; }
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Subah ka salam' : hour < 17 ? 'Dopahar ka salam' : 'Shaam ka salam';
  document.getElementById('greetingAvatar').textContent = user.name[0].toUpperCase();
  document.getElementById('greetingName').textContent = user.name.split(' ')[0];
  document.getElementById('greetingMsg').innerHTML = `${greet}, <strong id="greetingName">${user.name.split(' ')[0]}</strong>! 👋`;
  document.getElementById('greetingTime').textContent = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  loyaltyPoints = parseInt(localStorage.getItem('nd_points_' + user.id) || '0');
  document.getElementById('greetingPtsVal').textContent = loyaltyPoints;
  banner.classList.add('show');
}

/* ===== NAV USER AREA ===== */
function updateNavUser(user){
  const area = document.getElementById('userNavArea');
  if(!area) return;
  if(user){
    area.innerHTML = `
      <div style="display:flex;align-items:center;gap:.5rem;cursor:pointer" onclick="openProfile()">
        <div class="user-avatar-nav">${user.name[0].toUpperCase()}</div>
        <span class="user-name-nav" style="display:none" id="userNameNav">${user.name.split(' ')[0]}</span>
      </div>`;
    // Show name on wider screens
    const nameEl = document.getElementById('userNameNav');
    if(window.innerWidth > 900 && nameEl) nameEl.style.display = 'block';
  } else {
    area.innerHTML = `<button class="user-btn" id="userBtn" onclick="openLoginModal()"><i class="fas fa-user"></i> Login</button>`;
  }
}

/* ===== PROFILE SIDEBAR ===== */
function openProfile(){
  const user = JSON.parse(localStorage.getItem('nd_current_user') || 'null');
  if(!user){ openLoginModal(); return; }
  document.getElementById('profileAvatar').textContent = user.name[0].toUpperCase();
  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileMobile').textContent = '+91 ' + user.mobile;
  const pts = parseInt(localStorage.getItem('nd_points_' + user.id) || '0');
  document.getElementById('profilePts').textContent = pts;
  document.getElementById('profilePtsRs').textContent = Math.floor(pts / 10);
  document.getElementById('refCode').textContent = user.referralCode || 'REF000';
  const orders = JSON.parse(localStorage.getItem('nd_orders') || '[]');
  const userOrders = orders.filter(o => o.userId === user.id);
  document.getElementById('profileOrderCount').textContent = userOrders.length;
  const wl = JSON.parse(localStorage.getItem('nd_wishlist') || '[]');
  document.getElementById('profileWishCount').textContent = wl.length + ' items';
  const cart = JSON.parse(localStorage.getItem('nd_cart') || '[]');
  document.getElementById('profileCartCount').textContent = cart.reduce((s,i)=>s+i.qty,0) + ' items';
  document.getElementById('themeLabel').textContent = document.body.classList.contains('light') ? 'Light' : 'Dark';
  buildRecentlyViewedProfile();
  document.getElementById('profileOverlay').classList.add('open');
  document.getElementById('profileSidebar').classList.add('open');
  document.body.classList.add('modal-open');
}
function closeProfile(){
  document.getElementById('profileOverlay').classList.remove('open');
  document.getElementById('profileSidebar').classList.remove('open');
  document.body.classList.remove('modal-open');
}
function toggleThemeFromProfile(){
  document.getElementById('themeBtn').click();
  document.getElementById('themeLabel').textContent = document.body.classList.contains('light') ? 'Light' : 'Dark';
}

/* ===== RECENTLY VIEWED ===== */
function trackView(prodId){
  recentlyViewed = recentlyViewed.filter(id => id !== prodId);
  recentlyViewed.unshift(prodId);
  if(recentlyViewed.length > 10) recentlyViewed.pop();
  localStorage.setItem('nd_recently', JSON.stringify(recentlyViewed));
  buildRecentlyViewedSection();
}
function buildRecentlyViewedSection(){
  if(!recentlyViewed.length) return;
  const sec = document.getElementById('recentlySection');
  const scroll = document.getElementById('recentlyScroll');
  if(!sec || !scroll) return;
  sec.style.display = 'block';
  const prods = recentlyViewed.slice(0,8).map(id => window.products?.find(p=>p.id===id)).filter(Boolean);
  scroll.innerHTML = prods.map(p => `
    <div class="prod-card" style="min-width:160px;flex:0 0 160px" onclick="openModal(${p.id})">
      <div class="prod-img" style="height:160px">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="prod-info">
        <div class="prod-name" style="font-size:.78rem">${p.name}</div>
        <div class="prod-price" style="font-size:1rem">₹${p.price}</div>
      </div>
    </div>`).join('');
}
function buildRecentlyViewedProfile(){
  const sec = document.getElementById('recentViewedSection');
  const grid = document.getElementById('recentViewedGrid');
  if(!recentlyViewed.length){ sec.style.display='none'; return; }
  sec.style.display = 'block';
  const prods = recentlyViewed.slice(0,6).map(id => window.products?.find(p=>p.id===id)).filter(Boolean);
  grid.innerHTML = prods.map(p => `
    <div class="recent-item" onclick="closeProfile();openModal(${p.id})">
      <div class="recent-img"><img src="${p.img}" alt="${p.name}"></div>
      <div class="recent-name">${p.name}</div>
      <div class="recent-price">₹${p.price}</div>
    </div>`).join('');
}

/* ===== PROMO CODE ===== */
function applyPromo(){
  const code = document.getElementById('promoInput').value.trim().toUpperCase();
  const result = document.getElementById('promoResult');
  if(!code){ result.innerHTML = '<span style="color:var(--red)">Code enter karo</span>'; return; }
  if(PROMOC[code]){
    appliedPromo = {...PROMOC[code], code};
    result.innerHTML = `<span style="color:var(--green)"><i class="fas fa-check-circle"></i> ${appliedPromo.label} apply ho gaya!</span>`;
    updateCartTotal();
    showToast('🎉 Promo code ' + code + ' apply ho gaya!');
  } else {
    appliedPromo = null;
    result.innerHTML = '<span style="color:var(--red)"><i class="fas fa-times-circle"></i> Galat code hai</span>';
    updateCartTotal();
  }
}
function updateCartTotal(){
  // Called after promo apply — recalculate total
  if(typeof window.getCartTotal !== 'function') return;
  let total = window.getCartTotal();
  const disc = document.getElementById('cartDiscount');
  const totalEl = document.getElementById('cartTotal');
  if(appliedPromo){
    let save = appliedPromo.type === 'percent' ? Math.round(total * appliedPromo.disc / 100) : appliedPromo.disc;
    save = Math.min(save, total);
    const final = total - save;
    if(disc){ disc.textContent = `Promo discount: -₹${save.toLocaleString('en-IN')}`; disc.style.display='block'; }
    if(totalEl) totalEl.textContent = '₹' + final.toLocaleString('en-IN');
  } else {
    if(disc) disc.style.display = 'none';
    if(totalEl) totalEl.textContent = '₹' + total.toLocaleString('en-IN');
  }
}

/* ===== LOYALTY POINTS ===== */
function addPoints(userId, pts){
  const key = 'nd_points_' + userId;
  const curr = parseInt(localStorage.getItem(key) || '0');
  const newPts = curr + pts;
  localStorage.setItem(key, newPts.toString());
  loyaltyPoints = newPts;
  document.getElementById('greetingPtsVal').textContent = newPts;
  showPointsToast('+' + pts + ' points mile aapko!');
}
function showPointsToast(msg){
  const t = document.getElementById('pointsToast');
  const m = document.getElementById('pointsToastMsg');
  if(!t||!m) return;
  m.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ===== WISHLIST VIEW ===== */
function openWishlistView(){
  const wl = JSON.parse(localStorage.getItem('nd_wishlist') || '[]');
  if(wl.length === 0){ showToast('💔 Wishlist khali hai!'); return; }
  const prods = wl.map(id => window.products?.find(p=>p.id===id)).filter(Boolean);
  const modal = document.getElementById('ordersModal');
  const list = document.getElementById('ordersList');
  const title = modal.querySelector('.modal-title');
  if(title) title.textContent = '❤️ Meri Wishlist';
  list.innerHTML = prods.map(p => `
    <div style="display:flex;gap:1rem;padding:.8rem 0;border-bottom:1px solid var(--border);align-items:center">
      <img src="${p.img}" style="width:60px;height:60px;border-radius:10px;object-fit:cover">
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:.85rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.name}</div>
        <div style="color:var(--gold);font-weight:800">₹${p.price}</div>
      </div>
      <button class="btn btn-gold" style="padding:.4rem .9rem;font-size:.72rem" onclick="addToCart(${p.id},null);closeOrdersModal()">Add</button>
    </div>`).join('');
  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

/* ===== MINI CART PREVIEW ===== */
let mcpTimer;
function showMiniCart(){
  const preview = document.getElementById('miniCartPreview');
  const items = document.getElementById('mcpItems');
  const total = document.getElementById('mcpTotal');
  if(!preview) return;
  const cart = JSON.parse(localStorage.getItem('nd_cart') || '[]');
  if(cart.length === 0){ closeMiniCart(); return; }
  items.innerHTML = cart.slice(0,3).map(i => `
    <div class="mcp-item">
      <div class="mcp-img"><img src="${i.img}" alt="${i.name}"></div>
      <div style="flex:1;min-width:0">
        <div class="mcp-name">${i.name}</div>
        <div class="mcp-price">₹${i.price} × ${i.qty}</div>
      </div>
    </div>`).join('') + (cart.length > 3 ? `<div style="text-align:center;font-size:.72rem;color:var(--muted);padding:.4rem">+${cart.length-3} aur items</div>` : '');
  const t = cart.reduce((s,i)=>s+i.price*i.qty,0);
  total.textContent = '₹' + t.toLocaleString('en-IN');
  preview.classList.add('peek');
  clearTimeout(mcpTimer);
  mcpTimer = setTimeout(closeMiniCart, 4000);
}
function closeMiniCart(){
  document.getElementById('miniCartPreview')?.classList.remove('peek');
}

/* ===== SIZE RECOMMENDER ===== */
function openSizeRec(){ document.getElementById('sizeRecPopup').classList.add('open'); document.body.classList.add('modal-open'); }
function closeSizeRec(){ document.getElementById('sizeRecPopup').classList.remove('open'); document.body.classList.remove('modal-open'); }
function calcSize(){
  const h = parseFloat(document.getElementById('srec-height').value)||0;
  const w = parseFloat(document.getElementById('srec-weight').value)||0;
  const c = parseFloat(document.getElementById('srec-chest').value)||0;
  if(!h||!w){ showToast('Height aur weight enter karo!'); return; }
  let size = 'M';
  const bmi = w / ((h/100) ** 2);
  if(c){
    if(c<80)size='XS';else if(c<84)size='S';else if(c<88)size='M';else if(c<92)size='L';else if(c<96)size='XL';else if(c<106)size='XXL';else size='3XL';
  } else {
    if(bmi<18)size='XS';else if(bmi<20)size='S';else if(bmi<23)size='M';else if(bmi<26)size='L';else if(bmi<30)size='XL';else if(bmi<34)size='XXL';else size='3XL';
  }
  const res = document.getElementById('srecResult');
  document.getElementById('srecSizeBig').textContent = size;
  document.getElementById('srecSizeText').textContent = `Aapke liye recommended size · BMI: ${bmi.toFixed(1)}`;
  res.classList.add('show');
  // Auto-select this size in modal if open
  const sizeBtn = document.querySelector(`#sizeGrid .size-btn`);
  const matchBtn = Array.from(document.querySelectorAll('#sizeGrid .size-btn')).find(b=>b.textContent===size);
  if(matchBtn){ window.selectSize(size, matchBtn); }
}

/* ===== COMPARE ===== */
function addToCompare(prod){
  if(compareList.find(p=>p.id===prod.id)){ showToast('Yeh product pehle se compare mein hai!'); return; }
  if(compareList.length >= 3){ showToast('⚠️ Max 3 products compare kar sakte hain!'); return; }
  compareList.push(prod);
  renderCompareBar();
}
function removeFromCompare(id){
  compareList = compareList.filter(p=>p.id!==id);
  renderCompareBar();
}
function clearCompare(){
  compareList = [];
  renderCompareBar();
  document.getElementById('compareCheck').checked = false;
}
function renderCompareBar(){
  const bar = document.getElementById('compareBar');
  const items = document.getElementById('compareItems');
  if(compareList.length === 0){ bar.classList.remove('show'); return; }
  bar.classList.add('show');
  items.innerHTML = compareList.map(p => `
    <div class="compare-slot">
      <img src="${p.img}" alt="${p.name}">
      <span class="compare-slot-name">${p.name}</span>
      <button class="compare-slot-remove" onclick="removeFromCompare(${p.id})"><i class="fas fa-times"></i></button>
    </div>`).join('');
}
function openCompare(){
  if(compareList.length < 2){ showToast('Kam se kam 2 products select karo!'); return; }
  const rows = [
    {label:'Photo', key:'img', render:p=>`<img src="${p.img}" style="width:80px;height:80px;border-radius:10px;object-fit:cover">`},
    {label:'Name', key:'name', render:p=>`<strong>${p.name}</strong>`},
    {label:'Category', key:'cat', render:p=>`<span style="text-transform:capitalize">${p.cat}</span>`},
    {label:'Price', key:'price', render:p=>`<span style="color:var(--gold);font-family:'Bebas Neue',cursive;font-size:1.2rem">₹${p.price}</span>`},
    {label:'Original Price', key:'orig', render:p=>`<span style="text-decoration:line-through;color:var(--muted)">₹${p.orig||'-'}</span>`},
    {label:'Discount', key:'disc', render:p=>`<span style="color:var(--red);font-weight:800">${p.disc||'-'}</span>`},
    {label:'Sizes', key:'sizes', render:p=>(p.sizes||[]).join(', ')},
    {label:'', key:'action', render:p=>`<button class="btn btn-gold" style="font-size:.72rem;padding:.4rem .9rem" onclick="addToCart(${p.id},null);closeCompare()">Add to Bag</button>`},
  ];
  const colCount = compareList.length;
  const content = document.getElementById('compareContent');
  content.innerHTML = `
    <div style="display:grid;grid-template-columns:120px ${Array(colCount).fill('1fr').join(' ')};gap:0;border-radius:14px;overflow:hidden;border:1px solid var(--border)">
      ${rows.map(row=>`
        <div style="background:var(--bg3);padding:.6rem 1rem;font-size:.7rem;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;display:flex;align-items:center;border-bottom:1px solid var(--border)">${row.label}</div>
        ${compareList.map(p=>`<div style="background:var(--bg2);padding:.7rem 1rem;display:flex;align-items:center;border-left:1px solid var(--border);border-bottom:1px solid var(--border);font-size:.82rem">${row.render(p)}</div>`).join('')}
      `).join('')}
    </div>`;
  document.getElementById('compareModal').classList.add('open');
  document.body.classList.add('modal-open');
}
function closeCompare(){
  document.getElementById('compareModal').classList.remove('open');
  document.body.classList.remove('modal-open');
}

/* ===== LIVE CHAT ===== */
function toggleLiveChat(){
  document.getElementById('livechatPopup').classList.toggle('open');
}

/* ===== FEEDBACK ===== */
function toggleFeedback(){
  document.getElementById('feedbackPopup').classList.toggle('open');
}
function setFbStar(n){
  fbRating = n;
  document.querySelectorAll('.fb-star').forEach((s,i)=>{
    s.classList.toggle('on', i < n);
  });
}
function submitFeedback(){
  if(!fbRating){ showToast('Pehle rating do!'); return; }
  const msg = document.getElementById('fbMsg').value;
  const feedbacks = JSON.parse(localStorage.getItem('nd_feedbacks') || '[]');
  feedbacks.push({rating:fbRating, msg, date:new Date().toISOString()});
  localStorage.setItem('nd_feedbacks', JSON.stringify(feedbacks));
  document.getElementById('feedbackPopup').classList.remove('open');
  showToast('🙏 Feedback ke liye shukriya!');
  fbRating = 0;
  document.querySelectorAll('.fb-star').forEach(s=>s.classList.remove('on'));
  document.getElementById('fbMsg').value = '';
}

/* ===== SPIN WHEEL ===== */
const SEGMENTS = [
  {label:'10% OFF',color:'#D4AF37',promo:'SPIN10'},
  {label:'Free Ship',color:'#2fcc71',promo:'FREESHIP'},
  {label:'5% OFF',color:'#4a9eff',promo:'SPIN5'},
  {label:'Try Again',color:'#555',promo:null},
  {label:'20% OFF',color:'#e84560',promo:'SPIN20'},
  {label:'₹50 OFF',color:'#6c5ce7',promo:'FLAT50'},
  {label:'15% OFF',color:'#ff8c42',promo:'SPIN15'},
  {label:'Try Again',color:'#555',promo:null},
];
let currentAngle = 0;
let isSpinning = false;

function drawWheel(){
  const canvas = document.getElementById('wheel');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 120, cy = 120, r = 115;
  const segAngle = (2 * Math.PI) / SEGMENTS.length;
  SEGMENTS.forEach((seg, i) => {
    const start = currentAngle + i * segAngle;
    const end = start + segAngle;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,start,end); ctx.closePath();
    ctx.fillStyle = seg.color; ctx.fill();
    ctx.strokeStyle = '#0d0d1a'; ctx.lineWidth = 2; ctx.stroke();
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(start + segAngle/2);
    ctx.textAlign = 'right'; ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px DM Sans,sans-serif';
    ctx.fillText(seg.label, r-8, 4); ctx.restore();
  });
  // Center circle
  ctx.beginPath(); ctx.arc(cx,cy,18,0,Math.PI*2);
  ctx.fillStyle = '#0d0d1a'; ctx.fill();
  ctx.strokeStyle = '#D4AF37'; ctx.lineWidth = 2; ctx.stroke();
}

function spinWheel(){
  if(isSpinning) return;
  if(spinUsed){ showToast('Aap pehle spin kar chuke hain!'); return; }
  isSpinning = true;
  document.getElementById('spinBtn').disabled = true;
  const extraSpins = 5 + Math.floor(Math.random()*5);
  const winIdx = Math.floor(Math.random()*SEGMENTS.length);
  const segAngle = (2*Math.PI)/SEGMENTS.length;
  const targetAngle = extraSpins*2*Math.PI + (2*Math.PI - winIdx*segAngle - segAngle/2) - currentAngle;
  const duration = 4000;
  const start = performance.now();
  const startAngle = currentAngle;
  function animate(now){
    const elapsed = now - start;
    const progress = Math.min(elapsed/duration, 1);
    const eased = 1 - Math.pow(1-progress, 4);
    currentAngle = startAngle + targetAngle * eased;
    drawWheel();
    if(progress < 1){ requestAnimationFrame(animate); return; }
    isSpinning = false;
    spinUsed = true;
    localStorage.setItem('nd_spin_used', 'true');
    const won = SEGMENTS[winIdx];
    const res = document.getElementById('spinResult');
    const resTitle = document.getElementById('spinResultTitle');
    const resMsg = document.getElementById('spinResultMsg');
    resTitle.textContent = won.promo ? '🎉 Badhai ho!' : '😅 Agli baar!';
    resMsg.textContent = won.promo ? `Aapne jeeta: ${won.label}! Code: ${won.promo} use karo` : 'Iss baar luck nahi tha. WhatsApp karo special deal ke liye!';
    res.classList.add('show');
    if(won.promo){ PROMOC[won.promo] = {disc:10,type:'percent',label:won.label}; }
  }
  requestAnimationFrame(animate);
}
function openSpin(){ document.getElementById('spinModal').classList.add('open'); document.body.classList.add('modal-open'); drawWheel(); }
function closeSpin(){ document.getElementById('spinModal').classList.remove('open'); document.body.classList.remove('modal-open'); }

/* ===== SEARCH DROPDOWN ===== */
function initLiveSearch(){
  const inp = document.getElementById('searchInput');
  const dd = document.getElementById('searchDropdown');
  if(!inp||!dd) return;
  inp.addEventListener('input', function(){
    const q = this.value.toLowerCase().trim();
    if(!q){ dd.classList.remove('open'); return; }
    const res = (window.products||[]).filter(p=>
      p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)
    ).slice(0,5);
    if(!res.length){
      dd.innerHTML = `<div class="sd-empty">Koi result nahi mila</div>`;
    } else {
      dd.innerHTML = res.map(p=>`
        <div class="sd-item" onclick="closeSearchDD();openModal(${p.id})">
          <div class="sd-img"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
          <div class="sd-info">
            <div class="sd-name">${p.name}</div>
            <div class="sd-cat">${p.cat} collection</div>
          </div>
          <div class="sd-price">₹${p.price}</div>
        </div>`).join('');
    }
    dd.classList.add('open');
  });
  document.addEventListener('click', e=>{
    if(!inp.contains(e.target) && !dd.contains(e.target)) dd.classList.remove('open');
  });
}
function closeSearchDD(){ document.getElementById('searchDropdown')?.classList.remove('open'); }

/* ===== MOBILE SEARCH ===== */
function initMobileSearch(){
  const btn = document.getElementById('mobileSearchBtn');
  const bar = document.getElementById('mobileSearchBar');
  const inp = document.getElementById('mobileSearchInput');
  if(!btn||!bar||!inp) return;
  btn.style.display = window.innerWidth < 768 ? 'flex' : 'none';
  btn.addEventListener('click',()=>{ bar.classList.toggle('show'); if(bar.classList.contains('show')) inp.focus(); });
  inp.addEventListener('input', function(){
    // Sync with main carousel search
    const mainInp = document.getElementById('searchInput');
    if(mainInp){ mainInp.value = this.value; mainInp.dispatchEvent(new Event('input')); }
  });
}

/* ===== WISHLIST BADGE ===== */
function updateWishBadge(){
  const wl = JSON.parse(localStorage.getItem('nd_wishlist')||'[]');
  const badge = document.getElementById('wishBadge');
  if(badge){ badge.textContent=wl.length; badge.style.display=wl.length>0?'flex':'none'; }
}

/* ===== COPY REFERRAL CODE ===== */
function copyRefCode(){
  const user = JSON.parse(localStorage.getItem('nd_current_user')||'null');
  if(!user) return;
  const link = `${location.origin}${location.pathname}?ref=${user.referralCode}`;
  navigator.clipboard.writeText(link).then(()=>showToast('🔗 Referral link copy ho gaya!')).catch(()=>showToast('Code: '+user.referralCode));
}

/* ===== OVERRIDE openModal to track views + compare ===== */
const _origOpenModal = window.openModal;
window.openModal = function(id){
  _origOpenModal && _origOpenModal(id);
  trackView(id);
  // Compare checkbox handler
  const check = document.getElementById('compareCheck');
  if(check){
    check.checked = compareList.some(p=>p.id===id);
    check.onchange = function(){
      const prod = window.products?.find(p=>p.id===id);
      if(!prod) return;
      if(this.checked) addToCompare(prod);
      else removeFromCompare(id);
    };
  }
  // Urgency badge
  const prod = window.products?.find(p=>p.id===id);
  const urgencyDiv = document.getElementById('modalUrgency');
  const urgencyText = document.getElementById('urgencyText');
  if(prod && urgencyDiv && urgencyText){
    if(prod.stock !== undefined && prod.stock <= 5 && prod.stock > 0){
      urgencyText.textContent = `Sirf ${prod.stock} pieces bachhe hain! Jaldi karo.`;
      urgencyDiv.style.display = 'block';
    } else {
      urgencyDiv.style.display = 'none';
    }
  }
};

/* ===== OVERRIDE addToCart to add points + mini cart ===== */
const _origAddToCart = window.addToCart;
window.addToCart = function(id, size){
  _origAddToCart && _origAddToCart(id, size);
  const user = JSON.parse(localStorage.getItem('nd_current_user')||'null');
  if(user){
    const prod = window.products?.find(p=>p.id===id);
    if(prod){ const pts = Math.floor(prod.price/100); addPoints(user.id, pts); }
  }
  updateWishBadge();
  setTimeout(showMiniCart, 300);
};

/* ===== OVERRIDE customerLogin to update greeting ===== */
const _origLogin = window.customerLogin;
window.customerLogin = function() {
  _origLogin && _origLogin();
  setTimeout(()=>{
    const user = JSON.parse(localStorage.getItem('nd_current_user')||'null');
    if(user){ updateGreeting(user); updateNavUser(user); showLoyaltyInCart(user); }
  }, 100);
};

/* ===== OVERRIDE customerSignup ===== */
const _origSignup = window.customerSignup;
window.customerSignup = function() {
  _origSignup && _origSignup();
  setTimeout(()=>{
    const user = JSON.parse(localStorage.getItem('nd_current_user')||'null');
    if(user){ addPoints(user.id, 50); updateGreeting(user); updateNavUser(user); }
  }, 100);
};

/* ===== OVERRIDE logoutUser ===== */
const _origLogout = window.logoutUser;
window.logoutUser = function(){
  closeProfile();
  _origLogout && _origLogout();
  updateGreeting(null);
  updateNavUser(null);
  document.getElementById('greetingBanner').classList.remove('show');
};

function showLoyaltyInCart(user){
  const el = document.getElementById('cartLoyalty');
  const pts = document.getElementById('cartLoyaltyPts');
  if(!el||!pts) return;
  const p = parseInt(localStorage.getItem('nd_points_'+user.id)||'0');
  if(p > 0){ el.style.display='flex'; pts.textContent=p+' pts = ₹'+Math.floor(p/10); }
}

/* ===== KEYBOARD SHORTCUTS ===== */
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    window.closeModal?.(); window.closeSizeGuide?.(); window.closeCart?.();
    window.closeLoginModal?.(); window.closeOrdersModal?.(); window.closeMobile?.();
    closeProfile(); closeSizeRec(); closeCompare(); closeSpin();
    document.getElementById('searchDropdown')?.classList.remove('open');
    document.getElementById('userMenu')?.classList.remove('show');
    document.getElementById('livechatPopup')?.classList.remove('open');
    document.getElementById('feedbackPopup')?.classList.remove('open');
  }
  // Ctrl/Cmd+K to open search
  if((e.ctrlKey||e.metaKey)&&e.key==='k'){
    e.preventDefault();
    document.getElementById('searchInput')?.focus();
  }
});

/* ===== INIT ALL FEATURES ===== */
document.addEventListener('DOMContentLoaded', ()=>{
  const user = JSON.parse(localStorage.getItem('nd_current_user')||'null');
  updateGreeting(user);
  updateNavUser(user);
  updateWishBadge();
  if(user) showLoyaltyInCart(user);
  buildRecentlyViewedSection();
  initLiveSearch();
  initMobileSearch();
  drawWheel();

  // Mobile search btn visibility
  window.addEventListener('resize', ()=>{
    const btn = document.getElementById('mobileSearchBtn');
    if(btn) btn.style.display = window.innerWidth < 768 ? 'flex' : 'none';
    const nameEl = document.getElementById('userNameNav');
    if(nameEl) nameEl.style.display = window.innerWidth > 900 ? 'block' : 'none';
  });

  // Referral from URL
  const ref = new URLSearchParams(location.search).get('ref');
  if(ref){ localStorage.setItem('nd_referred_by', ref); showToast('🎁 Referral code apply ho gaya!'); }

  // Promo from URL
  const promo = new URLSearchParams(location.search).get('promo');
  if(promo && PROMOC[promo.toUpperCase()]){
    document.getElementById('promoInput').value = promo.toUpperCase();
    applyPromo();
  }
});
