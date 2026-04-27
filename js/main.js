/* ===== SETTINGS & CONSTANTS ===== */
const DEFAULT_SETTINGS = { shopName: 'Nadeem Readymade Centre', wa: '918010929093', saleTitle: 'Eid Sale', promo: 'NADEEM50', saleEnd: '' };
const settings = JSON.parse(localStorage.getItem('nd_settings') || 'null') || DEFAULT_SETTINGS;

const WA_NUMBER = settings.wa;
const SHOP_NAME = settings.shopName;

/* ===== PRODUCT DATA ===== */
const DEFAULT_PRODUCTS = [
  {id:1,name:"Premium Slim Blazer",price:799,orig:1999,img:"img/blazer.png",disc:"60%",badge:"best",cat:"men",desc:"Sophisticated slim-fit blazer crafted from premium fabric.",sizes:["S","M","L","XL","XXL"],stock:15},
  {id:2,name:"Oxford Cotton Shirt",price:499,orig:999,img:"img/shirt.png",disc:"50%",badge:"best",cat:"men",desc:"Pure cotton Oxford weave shirt.",sizes:["S","M","L","XL","XXL","3XL"],stock:8},
  {id:3,name:"Stretch High Rise Jeans",price:899,orig:1499,img:"img/jeans.png",disc:"40%",badge:"",cat:"men",desc:"Premium stretch denim with 4-way flex.",sizes:["28","30","32","34","36","38"],stock:3},
  {id:4,name:"Silk Embroidered Kurta",price:999,orig:1999,img:"https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500",disc:"55%",badge:"best",cat:"women",desc:"Stunning silk-blend kurta with intricate hand embroidery.",sizes:["XS","S","M","L","XL"],stock:12},
  {id:5,name:"Floral Anarkali Suit",price:1099,orig:2499,img:"img/anarkali.png",disc:"56%",badge:"best",cat:"women",desc:"Beautiful floral print Anarkali suit.",sizes:["XS","S","M","L","XL","XXL"],stock:4},
  {id:6,name:"Kids Traditional Kurta",price:549,orig:1099,img:"img/kids_kurta.png",disc:"50%",badge:"best",cat:"kids",desc:"Traditional silk kurta set.",sizes:["2-4Y","4-6Y","6-8Y","8-10Y"],stock:15},
  {id:7,name:"Kids Party Dress",price:799,orig:1599,img:"img/kids_dress.png",disc:"50%",badge:"new",cat:"kids",desc:"Elegant party wear dress.",sizes:["2-4Y","4-6Y","6-8Y","8-10Y"],stock:12},
  {id:8,name:"Designer Wedding Lehenga",price:4999,orig:12999,img:"img/lehenga.png",disc:"62%",badge:"sale",cat:"women",desc:"Exquisite designer lehenga.",sizes:["S","M","L","XL"],stock:3},
  {id:9,name:"Cotton Printed Kurti",price:349,orig:799,img:"img/kurti.png",disc:"56%",badge:"",cat:"women",desc:"Lightweight cotton kurti.",sizes:["S","M","L","XL","XXL"],stock:25},
];

function loadProducts() {
  const adminProds = localStorage.getItem('nd_products');
  if (adminProds) {
    try {
      const parsed = JSON.parse(adminProds);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch(e) {}
  }
  return DEFAULT_PRODUCTS;
}
window.products = loadProducts();

const categories = [
  {icon:"fa-tshirt",name:"Men's Wear",from:"₹399",filter:"men"},
  {icon:"fa-female",name:"Women's Wear",from:"₹699",filter:"women"},
  {icon:"fa-child",name:"Kids Wear",from:"₹449",filter:"kids"},
  {icon:"fa-gem",name:"Sarees",from:"₹1299",filter:"women"},
  {icon:"fa-user-tie",name:"Blazers",from:"₹799",filter:"men"},
  {icon:"fa-shopping-bag",name:"New Arrivals",from:"₹499",filter:"all"},
];

const reviews = [
  {name:"Razia Begum",loc:"Murshidabad",avatar:"R",stars:5,text:"Quality ekdam zabardast!",date:"2 hafta pehle",verified:true},
  {name:"Arif Hossain",loc:"Baharampur",avatar:"A",stars:5,text:"Wholesale order kiya tha 50 pieces ka.",date:"1 mahina pehle",verified:true},
  {name:"Salma Khatun",loc:"Nagra",avatar:"S",stars:5,text:"Banarasi saree bilkul original nikli.",date:"3 hafta pehle",verified:true},
];

/* ===== USER SYSTEM ===== */
let customers = JSON.parse(localStorage.getItem('nd_customers') || '[]');
let currentUser = JSON.parse(localStorage.getItem('nd_current_user') || 'null');
let orders = JSON.parse(localStorage.getItem('nd_orders') || '[]');

if (customers.length === 0) {
  customers.push({id:1,name:"Demo User",mobile:"9999999999",password:"demo123",joinDate:new Date().toISOString(),points:50});
  localStorage.setItem('nd_customers', JSON.stringify(customers));
}

/* ===== CART ===== */
let cart = JSON.parse(localStorage.getItem('nd_cart') || '[]');
let uidCounter = cart.length > 0 ? Math.max(...cart.map(i => i.uid || 0), 0) + 1 : 1;
let selectedSize = null;

function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }

function saveCart() {
  localStorage.setItem('nd_cart', JSON.stringify(cart));
  updateCartUI();
}

window.addToCart = function(id, size) {
  const prod = window.products.find(p => p.id === id);
  if (!prod) return;
  if (prod.stock !== undefined && prod.stock <= 0) {
    showToast('❌ Out of stock!');
    return;
  }
  const existing = cart.find(i => i.id === id && i.size === size);
  if (existing) {
    if (prod.stock !== undefined && existing.qty + 1 > prod.stock) {
      showToast(`⚠️ Only ${prod.stock} left!`);
      return;
    }
    existing.qty++;
  } else {
    cart.push({...prod, qty:1, size:size||null, uid:uidCounter++});
  }
  saveCart();
  showToast('🛍️ ' + prod.name + ' added to bag!');
}

function updateCartUI() {
  const count = getCartCount();
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = '₹' + getCartTotal().toLocaleString('en-IN');
  
  const empty = document.getElementById('cartEmpty');
  const container = document.getElementById('cartItems');
  if (container) {
    container.querySelectorAll('.cart-item').forEach(e => e.remove());
    if (cart.length === 0) {
      if (empty) empty.style.display = 'flex';
      return;
    }
    if (empty) empty.style.display = 'none';
    cart.forEach(item => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}${item.size ? ' · ' + item.size : ''}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.uid},-1)"><i class="fas fa-minus"></i></button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.uid},1)"><i class="fas fa-plus"></i></button>
            <button class="remove-item" onclick="removeItem(${item.uid})"><i class="fas fa-trash"></i></button>
          </div>
        </div>`;
      container.appendChild(el);
    });
  }
}

window.changeQty = function(uid, delta) {
  const item = cart.find(i => i.uid === uid);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.uid !== uid);
  saveCart();
}

window.removeItem = function(uid) {
  cart = cart.filter(i => i.uid !== uid);
  saveCart();
}

window.checkoutWA = function() {
  if (cart.length === 0) { showToast('Cart is empty!'); return; }
  let msg = `🛍️ *New Order*\n\n`;
  if (currentUser) msg += `Customer: ${currentUser.name}\nMobile: ${currentUser.mobile}\n\n`;
  msg += `*Items:*\n`;
  cart.forEach((item, i) => msg += `${i+1}. ${item.name} x${item.qty} = ₹${item.price*item.qty}\n`);
  msg += `\n*Total: ₹${getCartTotal()}*`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ===== AUTH FUNCTIONS ===== */
window.openLoginModal = function() {
  document.getElementById('authModal')?.classList.add('open');
  document.body.classList.add('modal-open');
}

window.closeLoginModal = function() {
  document.getElementById('authModal')?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

window.switchAuthTab = function(tab) {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = ['customerLoginForm', 'adminLoginForm', 'signupForm'];
  forms.forEach(f => { const el = document.getElementById(f); if(el) el.classList.remove('active'); });
  tabs.forEach(t => t.classList.remove('active'));
  
  if (tab === 'customer') {
    document.getElementById('customerLoginForm')?.classList.add('active');
    tabs[0]?.classList.add('active');
  } else if (tab === 'admin') {
    document.getElementById('adminLoginForm')?.classList.add('active');
    tabs[1]?.classList.add('active');
  } else if (tab === 'signup') {
    document.getElementById('signupForm')?.classList.add('active');
    tabs[2]?.classList.add('active');
  }
}

window.customerLogin = function() {
  const mobile = document.getElementById('customerMobile')?.value.trim();
  const password = document.getElementById('customerPassword')?.value;
  if (!mobile || !password) { showToast('❌ Mobile and password required!'); return; }
  const user = customers.find(c => c.mobile === mobile && c.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem('nd_current_user', JSON.stringify(user));
    updateUserUI();
    closeLoginModal();
    showToast(`🎉 Welcome back, ${user.name}!`);
  } else {
    showToast('❌ Invalid credentials! Demo: 9999999999 / demo123');
  }
}

window.adminLogin = function() {
  const username = document.getElementById('adminUser')?.value.trim();
  const password = document.getElementById('adminPass')?.value;
  if (username === 'admin' && password === 'nadeem2025') {
    showToast('🔐 Redirecting to admin panel...');
    setTimeout(() => { window.location.href = 'admin.html'; }, 800);
  } else {
    showToast('❌ Invalid admin credentials!');
  }
}

window.customerSignup = function() {
  const name = document.getElementById('signupName')?.value.trim();
  const mobile = document.getElementById('signupMobile')?.value.trim();
  const password = document.getElementById('signupPassword')?.value;
  if (!name || !mobile || !password) { showToast('❌ All fields required!'); return; }
  if (mobile.length !== 10) { showToast('❌ Enter 10 digit mobile number!'); return; }
  if (password.length < 4) { showToast('❌ Password must be at least 4 characters!'); return; }
  if (customers.find(c => c.mobile === mobile)) { showToast('❌ Mobile already registered!'); return; }
  const newUser = { id: Date.now(), name, mobile, password, joinDate: new Date().toISOString(), points: 50 };
  customers.push(newUser);
  localStorage.setItem('nd_customers', JSON.stringify(customers));
  localStorage.setItem('nd_points_' + newUser.id, '50');
  currentUser = newUser;
  localStorage.setItem('nd_current_user', JSON.stringify(newUser));
  updateUserUI();
  closeLoginModal();
  showToast(`🎉 Welcome ${name}! 50 points earned!`);
}

window.logoutUser = function() {
  currentUser = null;
  localStorage.removeItem('nd_current_user');
  updateUserUI();
  document.getElementById('userMenu')?.classList.remove('show');
  showToast('✅ Logged out!');
}

function updateUserUI() {
  const userBtn = document.getElementById('userBtn');
  if (userBtn) {
    if (currentUser) {
      userBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${currentUser.name.split(' ')[0]}`;
      userBtn.onclick = (e) => { e.stopPropagation(); toggleUserMenu(); };
    } else {
      userBtn.innerHTML = `<i class="fas fa-user"></i>`;
      userBtn.onclick = () => openLoginModal();
    }
  }
}

window.toggleUserMenu = function() {
  const menu = document.getElementById('userMenu');
  if (menu) currentUser ? menu.classList.toggle('show') : openLoginModal();
}

window.openOrdersModal = function() {
  if (!currentUser) { showToast('Please login first!'); openLoginModal(); return; }
  const modal = document.getElementById('ordersModal');
  const container = document.getElementById('ordersList');
  const userOrders = orders.filter(o => o.userId === currentUser.id);
  if (userOrders.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--muted)"><i class="fas fa-box-open" style="font-size:2rem"></i><p>No orders yet</p></div>';
  } else {
    container.innerHTML = userOrders.reverse().map(order => `
      <div class="order-card"><div class="order-header"><span class="order-id">${order.id}</span><span class="order-status">${order.status}</span></div>
      <div class="order-date">${new Date(order.date).toLocaleDateString()}</div><div class="order-items">${order.items.length} items · ₹${order.total}</div></div>`).join('');
  }
  modal?.classList.add('open');
  document.body.classList.add('modal-open');
}

window.closeOrdersModal = function() {
  document.getElementById('ordersModal')?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

window.openWishlistView = function() {
  if (!currentUser) { showToast('Please login first!'); openLoginModal(); return; }
  const wl = JSON.parse(localStorage.getItem('nd_wishlist') || '[]');
  if (wl.length === 0) { showToast('Wishlist is empty!'); return; }
  const prods = wl.map(id => window.products?.find(p => p.id === id)).filter(Boolean);
  const modal = document.getElementById('ordersModal');
  const container = document.getElementById('ordersList');
  container.innerHTML = prods.map(p => `
    <div style="display:flex;gap:1rem;padding:.8rem 0;border-bottom:1px solid var(--border);align-items:center">
      <img src="${p.img}" style="width:60px;height:60px;border-radius:10px;object-fit:cover">
      <div style="flex:1"><div style="font-weight:700">${p.name}</div><div style="color:var(--gold)">₹${p.price}</div></div>
      <button class="btn btn-gold" style="padding:.3rem .8rem" onclick="addToCart(${p.id},null);closeOrdersModal()">Add</button>
    </div>`).join('');
  modal?.classList.add('open');
  document.body.classList.add('modal-open');
}

window.openProfile = function() {
  if (!currentUser) { openLoginModal(); return; }
  document.getElementById('profileAvatar').textContent = currentUser.name[0].toUpperCase();
  document.getElementById('profileName').textContent = currentUser.name;
  document.getElementById('profileMobile').textContent = '+91 ' + currentUser.mobile;
  document.getElementById('profilePts').textContent = localStorage.getItem('nd_points_' + currentUser.id) || '0';
  document.getElementById('profileOrderCount').textContent = orders.filter(o => o.userId === currentUser.id).length;
  document.getElementById('profileOverlay')?.classList.add('open');
  document.getElementById('profileSidebar')?.classList.add('open');
  document.body.classList.add('modal-open');
}

window.closeProfile = function() {
  document.getElementById('profileOverlay')?.classList.remove('open');
  document.getElementById('profileSidebar')?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

window.checkPincode = function() {
  const pincode = document.getElementById('pincodeInput')?.value.trim();
  const result = document.getElementById('pincodeResult');
  const deliverable = ['800001','800002','801301','841301','841302'];
  if (!pincode || pincode.length !== 6) { result.innerHTML = '<span style="color:var(--muted)">Enter valid pincode</span>'; return; }
  if (deliverable.includes(pincode)) {
    result.innerHTML = '<span style="color:var(--green)"><i class="fas fa-check-circle"></i> Delivery available!</span>';
  } else {
    result.innerHTML = '<span style="color:var(--red)"><i class="fas fa-times-circle"></i> Not deliverable. Contact us!</span>';
  }
}

/* ===== PRODUCT MODAL ===== */
let currentProductImages = [];

window.openModal = function(id) {
  const prod = window.products.find(p => p.id === id);
  if (!prod) return;
  currentProductImages = prod.images || [prod.img];
  selectedSize = null;
  document.getElementById('modalImgSrc').src = currentProductImages[0];
  document.getElementById('modalCat').textContent = prod.cat.charAt(0).toUpperCase() + prod.cat.slice(1);
  document.getElementById('modalTitle').textContent = prod.name;
  document.getElementById('modalPrice').textContent = '₹' + prod.price;
  document.getElementById('modalOrig').textContent = prod.orig ? '₹' + prod.orig : '';
  document.getElementById('modalOff').textContent = prod.disc ? prod.disc + ' OFF' : '';
  document.getElementById('modalDesc').textContent = prod.desc;
  
  const stockStatus = document.getElementById('modalStock');
  if (stockStatus) {
    if (prod.stock === undefined || prod.stock > 10) stockStatus.innerHTML = '<span style="color:var(--green)">✓ In Stock</span>';
    else if (prod.stock > 0) stockStatus.innerHTML = `<span style="color:#ff8c42">⚠️ Only ${prod.stock} left!</span>`;
    else stockStatus.innerHTML = '<span style="color:var(--red)">✗ Out of Stock</span>';
  }
  
  const badgeEl = document.getElementById('modalBadge');
  if (prod.badge) {
    badgeEl.className = 'modal-img-badge ' + (prod.badge === 'best' ? 'badge-best' : prod.badge === 'new' ? 'badge-new' : 'badge-sale');
    badgeEl.textContent = {best:'BESTSELLER', new:'NEW', sale:'SALE'}[prod.badge];
    badgeEl.style.display = 'block';
  } else { badgeEl.style.display = 'none'; }
  
  const sizeGrid = document.getElementById('sizeGrid');
  if (sizeGrid) sizeGrid.innerHTML = prod.sizes.map(s => `<button class="size-btn" onclick="selectSize('${s}',this)">${s}</button>`).join('');
  
  document.getElementById('modalWABtn').href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I want to buy ${prod.name} - ₹${prod.price}`)}`;
  document.getElementById('modalAddBtn').onclick = () => {
    if (prod.sizes.length > 0 && prod.sizes[0] !== 'Free Size' && !selectedSize) {
      showToast('⚠️ Please select size first!');
      return;
    }
    if (prod.stock !== undefined && prod.stock <= 0) { showToast('❌ Out of stock!'); return; }
    window.addToCart(prod.id, selectedSize);
    closeModal();
    openCart();
  };
  document.getElementById('prodModal')?.classList.add('open');
  document.body.classList.add('modal-open');
}

window.closeModal = function() {
  document.getElementById('prodModal')?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

window.selectSize = function(size, btn) {
  selectedSize = size;
  document.querySelectorAll('#sizeGrid .size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

window.openSizeGuide = function() { document.getElementById('sgPopup')?.classList.add('open'); document.body.classList.add('modal-open'); }
window.closeSizeGuide = function() { document.getElementById('sgPopup')?.classList.remove('open'); document.body.classList.remove('modal-open'); }

window.openCart = function() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.classList.add('modal-open');
}
window.closeCart = function() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

/* ===== TOAST ===== */
let toastTimer;
window.showToast = function(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.innerHTML = `<i class="fas fa-check-circle"></i> <span>${msg}</span>`;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ===== UI BUILDERS ===== */
function buildCategories() {
  const catGrid = document.getElementById('catGrid');
  if (!catGrid) return;
  catGrid.innerHTML = categories.map(c => `<div class="cat-card" onclick="filterByCategory('${c.filter}')"><i class="fas ${c.icon}"></i><h3>${c.name}</h3><p>${c.from}</p></div>`).join('');
}

window.filterByCategory = function(filter) {
  const chip = document.querySelector(`#filterChips .chip[data-filter="${filter}"]`);
  if (chip) chip.click();
  document.getElementById('trending')?.scrollIntoView({behavior: 'smooth'});
}

function buildReviews() {
  const reviewGrid = document.getElementById('reviewGrid');
  if (!reviewGrid) return;
  reviewGrid.innerHTML = reviews.map(r => `<div class="review-card"><div class="review-head"><div class="review-avatar">${r.avatar}</div><div><div class="review-name">${r.name}</div><div class="review-loc">${r.loc}</div></div></div><div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div><p class="review-text">"${r.text}"</p><div class="review-date">${r.date}</div>${r.verified ? '<span class="review-badge">✓ Verified</span>' : ''}</div>`).join('');
}

function buildTicker() {
  const items = ['Free Shipping Above ₹999', 'New Arrivals', 'Wholesale Available', 'Up to 67% Off', 'COD Available'];
  const inner = document.getElementById('tickerInner');
  if (inner) inner.innerHTML = items.map(i => `<div class="ticker-item">${i}<div class="ticker-dot"></div></div>`).join('') + items.map(i => `<div class="ticker-item">${i}<div class="ticker-dot"></div></div>`).join('');
}

function startCountdown() {
  let target;
  if (settings.saleEnd) {
    target = new Date(settings.saleEnd);
  } else {
    let savedTarget = localStorage.getItem('nd_countdown_end');
    if (savedTarget) target = new Date(parseInt(savedTarget));
    else target = new Date(Date.now() + 72 * 3600000);
    if (target < new Date()) target = new Date(Date.now() + 72 * 3600000);
    localStorage.setItem('nd_countdown_end', target.getTime());
  }
  setInterval(() => {
    const diff = target - new Date();
    if (diff <= 0) { ['cd-h','cd-m','cd-s'].forEach(id => { const el = document.getElementById(id); if(el) el.textContent = '00'; }); return; }
    document.getElementById('cd-h').textContent = String(Math.floor(diff / 3600000)).padStart(2,'0');
    document.getElementById('cd-m').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
    document.getElementById('cd-s').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
  }, 1000);
}

let isLight = localStorage.getItem('theme') === 'light';
function applyTheme() {
  document.body.classList.toggle('light', isLight);
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
}

window.closeMobile = function() { document.getElementById('mobileMenu')?.classList.remove('open'); }

/* ===== FIX: REVEAL — use simple IntersectionObserver, NO opacity:0 on hero elements ===== */
function initReveal() {
  /* FIX: Force hero elements visible immediately - no animation delay */
  document.querySelectorAll('.hero .reveal, .hero .reveal-left, .hero .reveal-right').forEach(el => {
    el.classList.add('in');
  });

  /* Non-hero elements use IntersectionObserver */
  const io = new IntersectionObserver(e => e.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  }), {threshold: .05, rootMargin: '0px 0px -50px 0px'});

  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => {
    /* Skip hero elements - already made visible above */
    if (!el.closest('.hero')) io.observe(el);
  });
}

function syncSettingsUI() {
  if (settings.saleTitle) {
    const el = document.getElementById('saleTitleText');
    if (el) el.textContent = '🎉 ' + settings.saleTitle + ' — Ends In:';
  }
  if (settings.promo) {
    ['promoCodeText', 'promoCodeStrong'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = settings.promo;
    });
  }
}

function syncWebsiteDesignUI() {
  const ws = JSON.parse(localStorage.getItem('nd_website_settings'));
  if (!ws) return;

  const elHero1 = document.getElementById('heroLine1');
  if (elHero1 && ws.hero?.title1) elHero1.textContent = ws.hero.title1;
  const elHero2 = document.getElementById('heroLine2');
  if (elHero2 && ws.hero?.title2) elHero2.textContent = ws.hero.title2;
  const elHero3 = document.getElementById('heroLine3');
  if (elHero3 && ws.hero?.title3) elHero3.textContent = ws.hero.title3;
  const elHeroSub = document.getElementById('heroSubtitle');
  if (elHeroSub && ws.hero?.subtitle) elHeroSub.textContent = ws.hero.subtitle;
  const elHeroImg = document.getElementById('heroImage');
  if (elHeroImg && ws.hero?.image && ws.hero.image.trim() !== '') {
    elHeroImg.src = ws.hero.image;
  }

  const elStatProd = document.getElementById('heroStatProducts');
  if (elStatProd && ws.stats?.products) elStatProd.textContent = ws.stats.products;
  const elStatDisc = document.getElementById('heroStatDiscount');
  if (elStatDisc && ws.stats?.discount) elStatDisc.textContent = ws.stats.discount;
  const elStatCust = document.getElementById('heroStatCustomers');
  if (elStatCust && ws.stats?.customers) elStatCust.textContent = ws.stats.customers;

  const elLogo = document.getElementById('siteLogoText');
  if (elLogo) {
    if (ws.logo?.image) {
      elLogo.innerHTML = `<img src="${ws.logo.image}" style="max-height: 40px; display: block;" alt="Logo">`;
    } else if (ws.logo?.text) {
      const parts = ws.logo.text.split(' ');
      if (parts.length > 1) {
          elLogo.innerHTML = `<span>${parts[0]}</span> ${parts.slice(1).join(' ')}`;
      } else {
          elLogo.textContent = ws.logo.text;
      }
    }
  }

  const elFooter = document.getElementById('footerCopyText');
  if (elFooter && ws.footer) elFooter.textContent = ws.footer;

  if (ws.colors) {
      const root = document.documentElement;
      if (ws.colors.gold) {
        root.style.setProperty('--gold', ws.colors.gold);
        root.style.setProperty('--gold-light', ws.colors.gold);
      }
      if (ws.colors.bg) root.style.setProperty('--bg', ws.colors.bg);
      if (ws.colors.text) root.style.setProperty('--text', ws.colors.text);
      if (ws.colors.green) root.style.setProperty('--green', ws.colors.green);
  }
}

/* ===== SCROLL EVENTS ===== */
function initScrollEvents() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const scrollProgress = document.getElementById('scrollProgress');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollProgress) {
      scrollProgress.style.width = (scrolled / total * 100) + '%';
    }
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('show', scrolled > 400);
    }
  }, {passive: true});
}

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  syncSettingsUI();
  syncWebsiteDesignUI();

  document.getElementById('themeBtn')?.addEventListener('click', () => {
    isLight = !isLight;
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    applyTheme();
  });

  buildTicker();
  buildCategories();
  buildReviews();
  startCountdown();
  updateCartUI();
  updateUserUI();
  initScrollEvents();

  /* FIX: Run reveal AFTER a tiny delay so DOM is settled */
  setTimeout(initReveal, 50);

  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('prodModal')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
  document.getElementById('authModal')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeLoginModal(); });
  document.getElementById('authClose')?.addEventListener('click', closeLoginModal);
  document.getElementById('ordersModal')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeOrdersModal(); });
  document.getElementById('ordersClose')?.addEventListener('click', closeOrdersModal);
  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  document.getElementById('navToggle')?.addEventListener('click', () => document.getElementById('mobileMenu')?.classList.toggle('open'));

  /* FIX: NO GSAP animation on hero — it was leaving text at opacity:0 */
  /* Hero elements are already visible via CSS / initReveal */

  /* FIX: Hero image — force visible immediately */
  const heroImg = document.getElementById('heroImage');
  if (heroImg) {
    heroImg.style.cssText = 'display:block !important; opacity:1 !important; visibility:visible !important; width:100%; height:100%; object-fit:cover;';
  }
});

/* ===== NADEEM LOADER SCRIPT ===== */
(function() {
  const loader = document.getElementById('nadeemLoader');
  if (!loader) return;

  const MIN_TIME = 1800;
  const startTime = Date.now();

  function hideLoader() {
    const elapsed = Date.now() - startTime;
    const delay = Math.max(0, MIN_TIME - elapsed);
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.remove();
        document.body.style.overflow = '';
      }, 650);
    }, delay);
  }

  document.body.style.overflow = 'hidden';

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader, { once: true });
    setTimeout(hideLoader, 4000);
  }
})();
