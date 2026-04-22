/* ===== CONSTANTS ===== */
const WA_NUMBER = '918010929093';
const SHOP_NAME = 'Nadeem Readymade Centre';

/* ===== PRODUCT DATA — synced from Admin localStorage ===== */
const DEFAULT_PRODUCTS = [
  {id:1,name:"Premium Slim Blazer",price:799,orig:1999,img:"img/blazer.png",images:["img/blazer.png"],disc:"60%",badge:"best",cat:"men",desc:"Sophisticated slim-fit blazer crafted from premium poly-viscose fabric. Perfect for festive occasions, weddings, and formal meetings.",sizes:["S","M","L","XL","XXL"],stock:15},
  {id:2,name:"Oxford Cotton Shirt",price:499,orig:999,img:"img/shirt.png",images:["img/shirt.png"],disc:"50%",badge:"best",cat:"men",desc:"Pure cotton Oxford weave shirt, breathable and comfortable all day. Available in multiple colors.",sizes:["S","M","L","XL","XXL","3XL"],stock:8},
  {id:3,name:"Stretch High Rise Jeans",price:899,orig:1499,img:"img/jeans.png",images:["img/jeans.png"],disc:"40%",badge:"",cat:"men",desc:"Premium stretch denim with 4-way flex. High-rise fit for maximum comfort and style.",sizes:["28","30","32","34","36","38"],stock:3},
  {id:4,name:"Silk Embroidered Kurta",price:999,orig:1999,img:"https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500",images:["https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500"],disc:"55%",badge:"best",cat:"women",desc:"Stunning silk-blend kurta with intricate hand embroidery. Perfect for Eid, pujas, and family gatherings.",sizes:["XS","S","M","L","XL"],stock:12},
  {id:5,name:"Biker Leather Jacket",price:1299,orig:2499,img:"https://images.unsplash.com/photo-1551028719-00167b16eac1?w=500",images:["https://images.unsplash.com/photo-1551028719-00167b16eac1?w=500"],disc:"48%",badge:"new",cat:"men",desc:"Faux leather biker jacket with quilted shoulder panels. Edgy, durable, and weather-resistant.",sizes:["S","M","L","XL","XXL"],stock:5},
  {id:6,name:"Casual Poplin Shirt",price:399,orig:899,img:"https://images.unsplash.com/photo-1598032895397-b7f59a2f3b2c?w=500",images:["https://images.unsplash.com/photo-1598032895397-b7f59a2f3b2c?w=500"],disc:"55%",badge:"",cat:"men",desc:"Lightweight poplin fabric, wrinkle-resistant. Great for daily wear and casual outings.",sizes:["S","M","L","XL","XXL","3XL"],stock:20},
  {id:7,name:"Combat Cargo Pants",price:899,orig:1599,img:"https://images.unsplash.com/photo-1517438476312-10d79c077509?w=500",images:["https://images.unsplash.com/photo-1517438476312-10d79c077509?w=500"],disc:"44%",badge:"",cat:"men",desc:"Heavy-duty cargo pants with 6 pockets. Ripstop fabric, adjustable waist, streetwear ready.",sizes:["28","30","32","34","36"],stock:2},
  {id:8,name:"Banarasi Silk Saree",price:1999,orig:5999,img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d4?w=500",images:["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d4?w=500"],disc:"67%",badge:"best",cat:"women",desc:"Authentic Banarasi silk saree with golden zari border. A timeless heirloom for special occasions.",sizes:["Free Size"],stock:7},
  {id:9,name:"Festive Kids Wear",price:599,orig:1199,img:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500",images:["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500"],disc:"50%",badge:"new",cat:"kids",desc:"Adorable festive outfit set for kids. Comfortable fabric, easy to wash, looks stunning.",sizes:["2-3Y","3-4Y","4-5Y","5-6Y","6-7Y","7-8Y"],stock:10},
  {id:10,name:"Floral Anarkali Suit",price:1099,orig:2499,img:"img/anarkali.png",images:["img/anarkali.png"],disc:"56%",badge:"best",cat:"women",desc:"Beautiful floral print Anarkali suit with matching dupatta. Floor-length elegance for every occasion.",sizes:["XS","S","M","L","XL","XXL"],stock:4},
  {id:11,name:"Kids Denim Jacket",price:449,orig:899,img:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",images:["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"],disc:"50%",badge:"",cat:"kids",desc:"Trendy denim jacket for kids with snap buttons and patch pockets. Cool, comfy, durable.",sizes:["4-5Y","5-6Y","6-7Y","7-8Y","8-9Y"],stock:18},
  {id:12,name:"Premium Jodhpur Suits",price:1599,orig:3999,img:"https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500",images:["https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500"],disc:"60%",badge:"best",cat:"men",desc:"Royal Jodhpuri suit for weddings and formal events. Traditional look with a modern slim fit.",sizes:["38","40","42","44"],stock:6},
  {id:13,name:"Designer Wedding Lehengas",price:4999,orig:12999,img:"img/lehenga.png",images:["img/lehenga.png"],disc:"62%",badge:"sale",cat:"women",desc:"Exquisite designer lehenga with heavy zari work. Perfect for brides and festive celebrations.",sizes:["S","M","L","XL"],stock:3},
  {id:14,name:"Cotton Printed Kurti",price:349,orig:799,img:"img/kurti.png",images:["img/kurti.png"],disc:"56%",badge:"",cat:"women",desc:"Lightweight cotton kurti with trendy floral prints. Ideal for office and daily casual wear.",sizes:["S","M","L","XL","XXL"],stock:25},
  {id:15,name:"Kids Party Dress",price:799,orig:1599,img:"img/kids_dress.png",images:["img/kids_dress.png"],disc:"50%",badge:"new",cat:"kids",desc:"Elegant party wear dress for young girls. Soft lining and comfortable fit for all-day celebrations.",sizes:["2-4Y","4-6Y","6-8Y","8-10Y"],stock:12},
  {id:16,name:"Men's Formal Trousers",price:699,orig:1299,img:"https://images.unsplash.com/photo-1624371414361-e6e8ea062532?w=500",images:["https://images.unsplash.com/photo-1624371414361-e6e8ea062532?w=500"],disc:"46%",badge:"",cat:"men",desc:"Premium formal trousers with a sharp flat-front design. Durable fabric that stays crisp all day.",sizes:["30","32","34","36","38"],stock:15},
  {id:17,name:"Kids Winter Sweatshirt",price:499,orig:999,img:"https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=500",images:["https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=500"],disc:"50%",badge:"",cat:"kids",desc:"Warm and cozy fleece sweatshirt for kids. Vibrant colors and fun prints that they will love.",sizes:["4-6Y","6-8Y","8-10Y","10-12Y"],stock:20},
  {id:18,name:"Traditional Sherwani Set",price:2499,orig:5999,img:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500",images:["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500"],disc:"58%",badge:"best",cat:"men",desc:"Elegant Sherwani set with matching pajama and stole. Designed for the perfect wedding look.",sizes:["38","40","42","44"],stock:5},
  {id:19,name:"Kids Traditional Kurta",price:549,orig:1099,img:"img/kids_kurta.png",images:["img/kids_kurta.png"],disc:"50%",badge:"best",cat:"kids",desc:"Traditional silk kurta set for young boys. Perfect for festivals and weddings.",sizes:["2-4Y","4-6Y","6-8Y","8-10Y"],stock:15},
  {id:20,name:"Summer Casual Set",price:449,orig:899,img:"https://images.unsplash.com/photo-1519457431-757125281309?w=500",images:["https://images.unsplash.com/photo-1519457431-757125281309?w=500"],disc:"50%",badge:"",cat:"kids",desc:"Cotton summer set for toddlers. Breathable fabric and cute prints.",sizes:["1-2Y","2-3Y","3-4Y","4-5Y"],stock:10},
  {id:21,name:"Silk Palazzo Set",price:1299,orig:2999,img:"https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=500",images:["https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=500"],disc:"56%",badge:"new",cat:"women",desc:"Designer silk kurta with matching palazzo pants and dupatta. A perfect festive ensemble.",sizes:["S","M","L","XL","XXL"],stock:6}
];



/* ===== FIX #2: Admin se products sync karo ===== */
function loadProducts() {
  const adminProds = localStorage.getItem('nd_products');
  if (adminProds) {
    try {
      const parsed = JSON.parse(adminProds);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch(e) {}
  }
  return DEFAULT_PRODUCTS;
}
window.products = loadProducts();

const categories = [
  {icon:"fa-tshirt",name:"Men's Casual",from:"₹399",filter:"men"},
  {icon:"fa-user-tie",name:"Formal Wear",from:"₹699",filter:"men"},
  {icon:"fa-female",name:"Ethnic Kurti",from:"₹349",filter:"women"},
  {icon:"fa-gem",name:"Party Saree",from:"₹1299",filter:"women"},
  {icon:"fa-child",name:"Kids Special",from:"₹449",filter:"kids"},
  {icon:"fa-crown",name:"Wedding Suits",from:"₹1599",filter:"men"},
  {icon:"fa-hat-cowboy",name:"Accessories",from:"₹199",filter:"all"},
  {icon:"fa-shopping-bag",name:"New Season",from:"₹499",filter:"all"},
];


const reviews = [
  {name:"Razia Begum",loc:"Murshidabad, WB",avatar:"R",stars:5,text:"Bhaiiya ki dukaan se kurta liya — quality ekdam zabardast! Eid pe sabka attention mujhpe tha. Fast delivery, packing bhi acha tha.",date:"2 hafta pehle",verified:true},
  {name:"Arif Hossain",loc:"Baharampur, WB",avatar:"A",stars:5,text:"Wholesale order kiya tha 50 pieces ka. Sab exact size mein aaya, fabric mast hai. Price market se kam. Phir se order karunga!",date:"1 mahina pehle",verified:true},
  {name:"Salma Khatun",loc:"Nagra, Bihar",avatar:"S",stars:5,text:"Banarasi saree bilkul original nikli. WhatsApp par order kiya, 2 din mein ghar aa gayi. Nadeem bhai bahut helpful hain.",date:"3 hafta pehle",verified:true},
  {name:"Rahim Sheikh",loc:"Lalgola, WB",avatar:"R",stars:4,text:"Kids wear set liya for my daughter. Design sundar hai, material soft hai bacche ke liye. Thoda delivery time zyada laga par product acha tha.",date:"1 mahina pehle",verified:true},
  {name:"Fatima Nasrin",loc:"Dhulian, WB",avatar:"F",stars:5,text:"NADEEM50 code use kiya — 50% discount mila! Believe nahi ho raha tha pehle, but order aaya to real mein dil khush ho gaya. Recommended!",date:"2 mahine pehle",verified:true},
  {name:"Karim Molla",loc:"Farakka, WB",avatar:"K",stars:5,text:"Blazer pehna function mein — log pooch rahe the kahan se liya. Rs. 799 mein itna acha? Sach mein value for money hai.",date:"3 mahine pehle",verified:true},
];

/* ===== USER SYSTEM ===== */
let currentUser = JSON.parse(localStorage.getItem('nd_current_user') || 'null');
let users = JSON.parse(localStorage.getItem('nd_users') || '[]');
let orders = JSON.parse(localStorage.getItem('nd_orders') || '[]');

if (users.length === 0) {
  users.push({id:1,name:"Guest User",mobile:"9999999999",email:"guest@example.com",password:"guest123",joinDate:new Date().toISOString(),referralCode:"GUEST999",referredBy:null});
  localStorage.setItem('nd_users', JSON.stringify(users));
}

/* ===== CART ===== */
let cart = JSON.parse(localStorage.getItem('nd_cart') || '[]');
let uidCounter = cart.length > 0 ? Math.max(...cart.map(i => i.uid || 0), 0) + 1 : 1;
let selectedProdId = null;
let selectedSize = null;
let currentProductImages = [];

/* ===== FIX #5: Wishlist localStorage mein save hogi ===== */
let wishlist = JSON.parse(localStorage.getItem('nd_wishlist') || '[]');

function saveWishlist() {
  localStorage.setItem('nd_wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(id, btn) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
    btn.classList.remove('liked');
  } else {
    wishlist.push(id);
    btn.classList.add('liked');
    showToast('❤️ Wishlist mein add ho gaya!');
  }
  saveWishlist();
}

function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function getCartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }

function saveCart() {
  localStorage.setItem('nd_cart', JSON.stringify(cart));
}

window.addToCart = function(id, size) {
  const prod = window.products.find(p => p.id === id);
  if (!prod) return;
  if (prod.stock !== undefined && prod.stock <= 0) {
    showToast('❌ Sorry, yeh product out of stock hai!');
    return;
  }
  const existing = cart.find(i => i.id === id && i.size === size);
  if (existing) {
    if (prod.stock !== undefined && existing.qty + 1 > prod.stock) {
      showToast(`⚠️ Sirf ${prod.stock} items available hain!`);
      return;
    }
    existing.qty++;
  } else {
    cart.push({...prod, qty:1, size:size||null, uid:uidCounter++});
  }
  saveCart();
  updateCartUI();
  showToast('🛍️ ' + prod.name + ' bag mein add ho gaya!');
}

function updateCartUI() {
  const count = getCartCount();
  const badge = document.getElementById('cartBadge');

  /* FIX #4: Badge 0 pe hide karo */
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
  const prod = window.products.find(p => p.id === item.id);
  if (delta > 0 && prod && prod.stock !== undefined && item.qty + 1 > prod.stock) {
    showToast(`⚠️ Sirf ${prod.stock} items available hain!`);
    return;
  }
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.uid !== uid);
  saveCart();
  updateCartUI();
}

window.removeItem = function(uid) {
  cart = cart.filter(i => i.uid !== uid);
  saveCart();
  updateCartUI();
}

/* ===== FIX #1: checkoutWA function — was missing, caused crash ===== */
window.checkoutWA = function() {
  if (cart.length === 0) {
    showToast('⚠️ Cart khali hai!');
    return;
  }
  let msg = `🛍️ *Nadeem Readymade Centre — New Order*\n\n`;
  if (currentUser) {
    msg += `*Customer:* ${currentUser.name}\n`;
    msg += `*Mobile:* ${currentUser.mobile}\n\n`;
  }
  msg += `*Order Items:*\n`;
  cart.forEach((item, i) => {
    msg += `${i + 1}. ${item.name}`;
    if (item.size) msg += ` (Size: ${item.size})`;
    msg += ` × ${item.qty} = ₹${(item.price * item.qty).toLocaleString('en-IN')}\n`;
  });
  msg += `\n*Total: ₹${getCartTotal().toLocaleString('en-IN')}*`;
  msg += `\n\nPlease confirm my order. 🙏`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ===== FIX: checkoutWithCOD bhi rakha original ke liye ===== */
window.checkoutWithCOD = function() {
  if (cart.length === 0) { showToast('⚠️ Cart khali hai!'); return; }
  if (!currentUser) { showToast('Pehle login karo!'); openLoginModal(); return; }
  const address = prompt('Apna complete delivery address enter karo:');
  if (!address) return;
  placeOrder('cod', address);
  closeCart();
}

function placeOrder(paymentMethod, address) {
  if (cart.length === 0) { showToast('Cart khali hai!'); return false; }
  if (!currentUser) { showToast('Pehle login karo!'); openLoginModal(); return false; }
  const orderId = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
  const order = {
    id: orderId, userId: currentUser.id, items: [...cart],
    total: getCartTotal(), paymentMethod, status: paymentMethod === 'cod' ? 'Pending' : 'Processing',
    date: new Date().toISOString(), address
  };
  orders.push(order);
  localStorage.setItem('nd_orders', JSON.stringify(orders));
  cart = [];
  saveCart();
  updateCartUI();
  showToast(`✅ Order place ho gaya! ID: ${orderId}`);
  return orderId;
}

/* ===== USER AUTH ===== */
window.openLoginModal = function() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.add('open');
  document.body.classList.add('modal-open');
}
window.closeLoginModal = function() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}
window.switchAuthTab = function(tab) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const tabs = document.querySelectorAll('.auth-tab');
  tabs.forEach(t => t.classList.remove('active'));
  if (tab === 'login') {
    loginForm.classList.add('active'); signupForm.classList.remove('active'); tabs[0].classList.add('active');
  } else {
    loginForm.classList.remove('active'); signupForm.classList.add('active'); tabs[1].classList.add('active');
  }
}
window.loginWithMobile = function() {
  const mobile = document.getElementById('loginMobile').value.trim();
  const password = document.getElementById('loginPassword').value;
  if (!mobile || !password) { showToast('Mobile aur password dono bharo!'); return; }
  const user = users.find(u => u.mobile === mobile && u.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem('nd_current_user', JSON.stringify(user));
    updateUserUI();
    closeLoginModal();
    showToast(`Welcome back, ${user.name}! 🎉`);
    
    /* Abandoned Cart Restoration */
    const abandoned = localStorage.getItem('nd_abandoned_cart_' + user.id);
    if (abandoned) {
      try {
        const savedCart = JSON.parse(abandoned);
        if (savedCart.length > 0 && confirm('Aapke pichle saved items cart mein hain. Restore karein?')) {
          cart = [...cart, ...savedCart];
          saveCart();
          updateCartUI();
        }
      } catch(e) {}
      localStorage.removeItem('nd_abandoned_cart_' + user.id);
    }
  } else {
    showToast('Galat credentials! Try: 9999999999 / guest123');
  }
}
window.signupUser = function() {
  const name = document.getElementById('signupName').value.trim();
  const mobile = document.getElementById('signupMobile').value.trim();
  const password = document.getElementById('signupPassword').value;
  if (!name || !mobile || !password) { showToast('Sab fields bharo!'); return; }
  if (password.length < 4) { showToast('Password kam se kam 4 characters ka ho!'); return; }
  if (users.find(u => u.mobile === mobile)) { showToast('Yeh mobile already registered hai! Login karo.'); return; }
  const referralCode = 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const newUser = { id: users.length + 1, name, mobile, email: mobile + '@user.com', password, joinDate: new Date().toISOString(), referralCode, referredBy: null, referralEarnings: 0 };
  users.push(newUser);
  localStorage.setItem('nd_users', JSON.stringify(users));
  currentUser = newUser;
  localStorage.setItem('nd_current_user', JSON.stringify(newUser));
  updateUserUI();
  closeLoginModal();
  showToast(`Welcome ${name}! 🎉 Code ${referralCode} se friends ko refer karo!`);
}
window.logoutUser = function() {
  currentUser = null;
  localStorage.removeItem('nd_current_user');
  updateUserUI();
  const menu = document.getElementById('userMenu');
  if (menu) menu.classList.remove('show');
  showToast('Logout ho gaye!');
}
function updateUserUI() {
  const userBtn = document.getElementById('userBtn');
  const userMenu = document.getElementById('userMenu');
  if (userBtn) {
    if (currentUser) {
      userBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${currentUser.name.split(' ')[0]}`;
      userBtn.onclick = () => toggleUserMenu();
    } else {
      userBtn.innerHTML = `<i class="fas fa-user"></i> Login`;
      userBtn.onclick = () => openLoginModal();
      if (userMenu) userMenu.classList.remove('show');
    }
  }
}
window.toggleUserMenu = function() {
  const menu = document.getElementById('userMenu');
  if (menu) menu.classList.toggle('show');
}
window.openOrdersModal = function() {
  const modal = document.getElementById('ordersModal');
  if (!modal) return;
  const userOrders = orders.filter(o => o.userId === currentUser?.id);
  const container = document.getElementById('ordersList');
  if (userOrders.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--muted)"><i class="fas fa-box-open" style="font-size:2rem;opacity:.3;display:block;margin-bottom:.8rem"></i>Abhi tak koi order nahi</div>';
  } else {
    container.innerHTML = userOrders.reverse().map(order => `
      <div class="order-card">
        <div class="order-header">
          <span class="order-id">${order.id}</span>
          <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
        </div>
        <div class="order-date">${new Date(order.date).toLocaleDateString('en-IN')}</div>
        <div class="order-items">${order.items.length} items · ₹${order.total.toLocaleString('en-IN')}</div>
        <button class="btn-small" onclick="trackOrder('${order.id}')">Track Order</button>
      </div>`).join('');
  }
  modal.classList.add('open');
}
window.closeOrdersModal = function() {
  const modal = document.getElementById('ordersModal');
  if (modal) modal.classList.remove('open');
}
window.trackOrder = function(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) { showToast('Order nahi mila!'); return; }
  const msg = `🔍 *Order Status*\n\nOrder ID: ${order.id}\nStatus: ${order.status}\nTotal: ₹${order.total}\nDate: ${new Date(order.date).toLocaleDateString('en-IN')}\n\nKisi bhi query ke liye WhatsApp karo.`;
  alert(msg);
}
window.checkPincode = function() {
  const pincode = document.getElementById('pincodeInput').value.trim();
  const result = document.getElementById('pincodeResult');
  if (!pincode || pincode.length !== 6) {
    result.innerHTML = '<span style="color:var(--muted)">Sahi 6-digit pincode enter karo</span>';
    return;
  }
  const deliverable = ['800001','800002','801301','801302','841301','841302','841101','841102','841428','841412','841226'];
  if (deliverable.includes(pincode)) {
    result.innerHTML = '<span style="color:var(--green)"><i class="fas fa-check-circle"></i> Delivery available hai aapke area mein!</span>';
  } else {
    result.innerHTML = '<span style="color:var(--red)"><i class="fas fa-times-circle"></i> Is pincode pe delivery nahi ho rahi. WhatsApp karo options ke liye.</span>';
  }
}
window.generateReferralLink = function() {
  if (!currentUser) { showToast('Pehle login karo!'); openLoginModal(); return; }
  const link = `${window.location.origin}${window.location.pathname}?ref=${currentUser.referralCode}`;
  navigator.clipboard.writeText(link).then(() => {
    showToast('Referral link copy ho gaya! Share karo ₹100 kamao!');
  }).catch(() => {
    showToast('Link: ' + link);
  });
}

/* ===== PRODUCT MODAL ===== */
let currentProd = null;

window.openModal = function(id) {
  const prod = window.products.find(p => p.id === id);
  if (!prod) return;
  currentProd = prod;
  currentProductImages = prod.images || [prod.img];
  selectedSize = null;

  document.getElementById('modalImgSrc').src = currentProductImages[0];

  const galleryContainer = document.getElementById('modalGallery');
  if (galleryContainer && currentProductImages.length > 1) {
    galleryContainer.innerHTML = currentProductImages.map((img, idx) => `
      <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="changeModalImage(${idx})">
        <img src="${img}" alt="Product view ${idx + 1}">
      </div>`).join('');
    galleryContainer.style.display = 'flex';
  } else if (galleryContainer) {
    galleryContainer.style.display = 'none';
  }

  document.getElementById('modalCat').textContent = prod.cat.charAt(0).toUpperCase() + prod.cat.slice(1) + ' Collection';
  document.getElementById('modalTitle').textContent = prod.name;
  document.getElementById('modalPrice').textContent = '₹' + prod.price.toLocaleString('en-IN');
  document.getElementById('modalOrig').textContent = prod.orig ? '₹' + prod.orig.toLocaleString('en-IN') : '';
  document.getElementById('modalOff').textContent = prod.disc ? prod.disc + ' OFF' : '';
  document.getElementById('modalDesc').textContent = prod.desc;

  const stockStatus = document.getElementById('modalStock');
  if (stockStatus) {
    if (prod.stock === undefined || prod.stock > 10) {
      stockStatus.innerHTML = '<span style="color:var(--green)"><i class="fas fa-check-circle"></i> In Stock</span>';
    } else if (prod.stock > 0) {
      stockStatus.innerHTML = `<span style="color:#ff8c42"><i class="fas fa-exclamation-triangle"></i> Sirf ${prod.stock} bacha hai!</span>`;
    } else {
      stockStatus.innerHTML = '<span style="color:var(--red)"><i class="fas fa-times-circle"></i> Out of Stock</span>';
    }
  }

  const badgeEl = document.getElementById('modalBadge');
  if (prod.badge) {
    badgeEl.className = 'modal-img-badge ' + (prod.badge === 'best' ? 'badge-best' : prod.badge === 'new' ? 'badge-new' : 'badge-sale');
    badgeEl.textContent = {best:'BESTSELLER', new:'NEW', sale:'SALE'}[prod.badge];
    badgeEl.style.display = 'block';
  } else { badgeEl.style.display = 'none'; }

  const sizeGrid = document.getElementById('sizeGrid');
  sizeGrid.innerHTML = prod.sizes.map(s => `<button class="size-btn" onclick="selectSize('${s}',this)">${s}</button>`).join('');

  const waMsg = encodeURIComponent(`Hi ${SHOP_NAME}! 🛍️ Yeh product kharidna chahta hoon:\n\n*${prod.name}*\nPrice: ₹${prod.price}\n\nStock confirm karein please.`);
  document.getElementById('modalWABtn').href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  document.getElementById('modalAddBtn').onclick = () => {
    if (prod.sizes.length > 0 && prod.sizes[0] !== 'Free Size' && !selectedSize) {
      showToast('⚠️ Pehle size select karo!');
      document.getElementById('sizeGrid').style.animation = 'shake .3s ease';
      setTimeout(() => document.getElementById('sizeGrid').style.animation = '', 300);
      return;
    }
    if (prod.stock !== undefined && prod.stock <= 0) {
      showToast('❌ Out of stock!');
      return;
    }
    window.addToCart(prod.id, selectedSize);
    closeModal();
    openCart();
  };

  document.getElementById('prodModal').classList.add('open');
  /* FIX #3: body overflow properly manage karo */
  document.body.classList.add('modal-open');
}

window.changeModalImage = function(index) {
  if (!currentProductImages[index]) return;
  document.getElementById('modalImgSrc').src = currentProductImages[index];
  document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

window.closeModal = function() {
  document.getElementById('prodModal').classList.remove('open');
  /* FIX #3: body scroll wapas karo properly */
  document.body.classList.remove('modal-open');
}

window.selectSize = function(size, btn) {
  selectedSize = size;
  document.querySelectorAll('#sizeGrid .size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

window.openSizeGuide = function() { document.getElementById('sizeGuideModal').classList.add('open'); }
window.closeSizeGuide = function() { document.getElementById('sizeGuideModal').classList.remove('open'); }

/* ===== TOAST ===== */
let toastTimer;
window.showToast = function(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ===== CART DRAWER ===== */
window.openCart = function() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.classList.add('modal-open');
}
window.closeCart = function() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.classList.remove('modal-open');
}

/* ===== CATEGORIES ===== */
function buildCategories() {
  const catGrid = document.getElementById('catGrid');
  if (!catGrid) return;
  catGrid.innerHTML = categories.map(c => `
    <div class="cat-card" onclick="filterByCategory('${c.filter}')">
      <i class="fas ${c.icon}"></i>
      <h3>${c.name}</h3>
      <p>${c.from}</p>
    </div>`).join('');
}

/* FIX: Category click pe filter bhi ho aur scroll bhi */
window.filterByCategory = function(filter) {
  const chip = document.querySelector(`#filterChips .chip[data-filter="${filter}"]`);
  if (chip) {
    chip.click();
  }
  document.getElementById('trending')?.scrollIntoView({behavior: 'smooth'});
}

/* ===== REVIEWS ===== */
function buildReviews() {
  const reviewGrid = document.getElementById('reviewGrid');
  if (!reviewGrid) return;
  reviewGrid.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-head">
        <div class="review-avatar">${r.avatar}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-loc"><i class="fas fa-map-marker-alt" style="font-size:.65rem"></i> ${r.loc}</div>
        </div>
      </div>
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:.6rem;flex-wrap:wrap;gap:.4rem">
        <span class="review-date">${r.date}</span>
        ${r.verified ? '<span class="review-badge"><i class="fas fa-check-circle"></i> Verified Purchase</span>' : ''}
      </div>
    </div>`).join('');
}

/* ===== TICKER ===== */
function buildTicker() {
  const items = ['Free Shipping Above ₹999', 'New Arrivals Every Week', 'Wholesale Available', 'Up to 67% Off', 'COD Available', 'Premium Quality Guaranteed', 'WhatsApp Order करें'];
  const inner = document.getElementById('tickerInner');
  if (!inner) return;
  const markup = items.map(i => `<div class="ticker-item">${i}<div class="ticker-dot"></div></div>`).join('');
  inner.innerHTML = markup + markup;
}

/* ===== COUNTDOWN ===== */
function startCountdown() {
  const savedEnd = localStorage.getItem('nd_countdown_end');
  let target;
  if (savedEnd) {
    target = new Date(parseInt(savedEnd));
    if (target < new Date()) {
      target = new Date(Date.now() + 72 * 3600000);
      localStorage.setItem('nd_countdown_end', target.getTime().toString());
    }
  } else {
    target = new Date(Date.now() + 72 * 3600000);
    localStorage.setItem('nd_countdown_end', target.getTime().toString());
  }
  function update() {
    const diff = target - new Date();
    if (diff <= 0) {
      ['cd-h','cd-m','cd-s'].forEach(id => { const el = document.getElementById(id); if(el) el.textContent = '00'; });
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const cd_h = document.getElementById('cd-h');
    const cd_m = document.getElementById('cd-m');
    const cd_s = document.getElementById('cd-s');
    if (cd_h) cd_h.textContent = String(h).padStart(2, '0');
    if (cd_m) cd_m.textContent = String(m).padStart(2, '0');
    if (cd_s) cd_s.textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

/* ===== THEME ===== */
let isLight = localStorage.getItem('theme') === 'light';
function applyTheme() {
  document.body.classList.toggle('light', isLight);
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
}

/* ===== MOBILE MENU ===== */
window.closeMobile = function() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.remove('open');
}

/* ===== REVEAL ===== */
function initReveal() {
  const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold: .08});
  els.forEach(el => io.observe(el));
}

/* ===== KEYBOARD SHORTCUTS ===== */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeSizeGuide();
    closeCart();
    closeLoginModal();
    closeOrdersModal();
    window.closeMobile();
    const userMenu = document.getElementById('userMenu');
    if (userMenu) userMenu.classList.remove('show');
  }
});

/* ===== CLICK OUTSIDE USER MENU ===== */
document.addEventListener('click', (e) => {
  const userMenu = document.getElementById('userMenu');
  const userBtn = document.getElementById('userBtn');
  if (userMenu && userMenu.classList.contains('show')) {
    if (!userMenu.contains(e.target) && !userBtn.contains(e.target)) {
      userMenu.classList.remove('show');
    }
  }
});

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded', () => {

  applyTheme();

  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      isLight = !isLight;
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      applyTheme();
      /* FIX #6: GSAP correct selector — div pe rotate animation */
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(themeBtn, {scale:.7, rotate:-30}, {scale:1, rotate:0, duration:.4, ease:'back.out(2)'});
      }
    });
  }

  buildTicker();
  buildCategories();
  buildReviews();
  initReveal();
  startCountdown();
  updateCartUI();
  updateUserUI();

  /* Referral check */
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');
  if (ref) {
    localStorage.setItem('nd_referred_by', ref);
    showToast('🎁 Welcome! Referral code apply ho gaya.');
  }

  /* Modal setups */
  const modalCloseBtn = document.getElementById('modalClose');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  const prodModal = document.getElementById('prodModal');
  if (prodModal) prodModal.addEventListener('click', function(e) { if (e.target === this) closeModal(); });

  const sizeGuideModal = document.getElementById('sizeGuideModal');
  if (sizeGuideModal) sizeGuideModal.addEventListener('click', function(e) { if (e.target === this) closeSizeGuide(); });

  const authModal = document.getElementById('authModal');
  if (authModal) authModal.addEventListener('click', function(e) { if (e.target === this) closeLoginModal(); });
  
  const authClose = document.getElementById('authClose');
  if (authClose) authClose.addEventListener('click', closeLoginModal);

  const ordersModal = document.getElementById('ordersModal');
  if (ordersModal) ordersModal.addEventListener('click', function(e) { if (e.target === this) closeOrdersModal(); });
  
  const ordersClose = document.getElementById('ordersClose');
  if (ordersClose) ordersClose.addEventListener('click', closeOrdersModal);

  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);

  const cartCloseBtn = document.getElementById('cartClose');
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);

  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  const navToggle = document.getElementById('navToggle');
  if (navToggle) navToggle.addEventListener('click', () => {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebarOverlay').classList.add('open');
  });
  
  const sidebarClose = document.getElementById('sidebarClose');
  if (sidebarClose) sidebarClose.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
  });
  
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
  });

  /* GSAP hero animations */
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-title', {duration:1, y:50, opacity:0, ease:'power3.out'});
    gsap.from('.hero-tag', {duration:1, y:30, opacity:0, delay:.2, ease:'power3.out'});
    gsap.from('.hero-btns', {duration:.8, y:20, opacity:0, delay:.4, ease:'power2.out'});
  }
});
