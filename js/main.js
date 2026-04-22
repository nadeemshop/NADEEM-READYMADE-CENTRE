/* ===== CONSTANTS ===== */
const WA_NUMBER = '918010929093'; 
const SHOP_NAME = 'Nadeem Readymade Centre';

/* ===== PRODUCT DATA ===== */
window.products = [
  {id:1,name:"Premium Slim Blazer",price:799,orig:1999,img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",images:["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600","https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=700"],disc:"60%",badge:"best",cat:"men",desc:"Sophisticated slim-fit blazer crafted from premium poly-viscose fabric. Perfect for festive occasions, weddings, and formal meetings.",sizes:["S","M","L","XL","XXL"],stock:15},
  {id:2,name:"Oxford Cotton Shirt",price:499,orig:999,img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",images:["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"],disc:"50%",badge:"best",cat:"men",desc:"Pure cotton Oxford weave shirt, breathable and comfortable all day. Available in multiple colors.",sizes:["S","M","L","XL","XXL","3XL"],stock:8},
  {id:3,name:"Stretch High Rise Jeans",price:899,orig:1499,img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",images:["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"],disc:"40%",badge:"",cat:"men",desc:"Premium stretch denim with 4-way flex. High-rise fit for maximum comfort and style.",sizes:["28","30","32","34","36","38"],stock:3},
  {id:4,name:"Silk Embroidered Kurta",price:999,orig:1999,img:"https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500",images:["https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500"],disc:"55%",badge:"best",cat:"women",desc:"Stunning silk-blend kurta with intricate hand embroidery. Perfect for Eid, pujas, and family gatherings.",sizes:["XS","S","M","L","XL"],stock:12},
  {id:5,name:"Biker Leather Jacket",price:1299,orig:2499,img:"https://images.unsplash.com/photo-1551028719-00167b16eac1?w=500",images:["https://images.unsplash.com/photo-1551028719-00167b16eac1?w=500"],disc:"48%",badge:"new",cat:"men",desc:"Faux leather biker jacket with quilted shoulder panels. Edgy, durable, and weather-resistant.",sizes:["S","M","L","XL","XXL"],stock:5},
  {id:6,name:"Casual Poplin Shirt",price:699,orig:1399,img:"https://images.unsplash.com/photo-1598032895397-b7f59a2f3b2c?w=500",images:["https://images.unsplash.com/photo-1598032895397-b7f59a2f3b2c?w=500"],disc:"50%",badge:"",cat:"men",desc:"Lightweight poplin fabric, wrinkle-resistant. Great for daily wear and casual outings.",sizes:["S","M","L","XL","XXL","3XL"],stock:20},
  {id:7,name:"Combat Cargo Pants",price:899,orig:1599,img:"https://images.unsplash.com/photo-1517438476312-10d79c077509?w=500",images:["https://images.unsplash.com/photo-1517438476312-10d79c077509?w=500"],disc:"44%",badge:"",cat:"men",desc:"Heavy-duty cargo pants with 6 pockets. Ripstop fabric, adjustable waist, streetwear ready.",sizes:["28","30","32","34","36"],stock:2},
  {id:8,name:"Banarasi Silk Saree",price:1999,orig:5999,img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d4?w=500",images:["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d4?w=500"],disc:"67%",badge:"best",cat:"women",desc:"Authentic Banarasi silk saree with golden zari border. A timeless heirloom for special occasions.",sizes:["Free Size"],stock:7},
  {id:9,name:"Festive Kids Wear",price:599,orig:1199,img:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500",images:["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500"],disc:"50%",badge:"new",cat:"kids",desc:"Adorable festive outfit set for kids. Comfortable fabric, easy to wash, looks stunning.",sizes:["2-3Y","3-4Y","4-5Y","5-6Y","6-7Y","7-8Y"],stock:10},
  {id:10,name:"Floral Anarkali Suit",price:1099,orig:2499,img:"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500",images:["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500"],disc:"56%",badge:"best",cat:"women",desc:"Beautiful floral print Anarkali suit with matching dupatta. Floor-length elegance for every occasion.",sizes:["XS","S","M","L","XL","XXL"],stock:4},
  {id:11,name:"Kids Denim Jacket",price:449,orig:899,img:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",images:["https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"],disc:"50%",badge:"",cat:"kids",desc:"Trendy denim jacket for kids with snap buttons and patch pockets. Cool, comfy, durable.",sizes:["4-5Y","5-6Y","6-7Y","7-8Y","8-9Y"],stock:18},
];

const categories = [
  {icon:"fa-tshirt",name:"Men's Wear",from:"₹499"},
  {icon:"fa-female",name:"Women's Wear",from:"₹699"},
  {icon:"fa-child",name:"Kids Sets",from:"₹449"},
  {icon:"fa-hat-cowboy",name:"Accessories",from:"₹199"},
  {icon:"fa-user-tie",name:"Blazers",from:"₹799"},
  {icon:"fa-socks",name:"Jeans & Pants",from:"₹899"},
  {icon:"fa-gem",name:"Sarees",from:"₹1299"},
  {icon:"fa-shopping-bag",name:"New Arrivals",from:"₹499"},
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
let referrals = JSON.parse(localStorage.getItem('nd_referrals') || '{}');

// Initialize default user if none exists
if(users.length === 0){
  users.push({id:1, name:"Guest User", mobile:"9999999999", email:"guest@example.com", password:"guest123", joinDate:new Date().toISOString(), referralCode:"GUEST999", referredBy:null});
  localStorage.setItem('nd_users', JSON.stringify(users));
}

/* ===== CART ===== */
let cart = JSON.parse(localStorage.getItem('nd_cart') || '[]');
let uidCounter = cart.length > 0 ? Math.max(...cart.map(i=>i.uid||0),0) + 1 : 1;
let selectedProdId = null;
let selectedSize = null;
let currentProductImages = [];

function getCartCount(){return cart.reduce((s,i)=>s+i.qty,0)}
function getCartTotal(){return cart.reduce((s,i)=>s+i.price*i.qty,0)}

// Save cart to localStorage
function saveCart(){
  localStorage.setItem('nd_cart', JSON.stringify(cart));
}

window.addToCart = function(id, size) {
  const prod=window.products.find(p=>p.id===id);
  if(!prod)return;
  
  // Check stock
  if(prod.stock !== undefined && prod.stock <= 0){
    showToast('❌ Sorry, this product is out of stock!');
    return;
  }
  
  const existing=cart.find(i=>i.id===id && i.size===size);
  if(existing){
    if(prod.stock !== undefined && existing.qty + 1 > prod.stock){
      showToast(`⚠️ Only ${prod.stock} items available in stock!`);
      return;
    }
    existing.qty++;
  }
  else{
    cart.push({...prod,qty:1,size:size||null,uid:uidCounter++});
  }
  saveCart();
  updateCartUI();
  showToast('🛍️ '+prod.name+' added to bag!');
  
  // Track abandoned cart
  if(currentUser){
    localStorage.setItem('nd_abandoned_cart', JSON.stringify({cart, userId: currentUser.id, timestamp: Date.now()}));
  }
}

function updateCartUI(){
  const badge=document.getElementById('cartBadge');
  if(badge) badge.textContent=getCartCount();
  
  const totalEl = document.getElementById('cartTotal');
  if(totalEl) totalEl.textContent='₹'+getCartTotal().toLocaleString('en-IN');
  
  const empty=document.getElementById('cartEmpty');
  const container=document.getElementById('cartItems');
  if(container) {
      container.querySelectorAll('.cart-item').forEach(e=>e.remove());
      if(cart.length===0){
        if(empty) empty.style.display='flex';
        return;
      }
      if(empty) empty.style.display='none';
      cart.forEach(item=>{
        const el=document.createElement('div');
        el.className='cart-item';
        el.innerHTML=`
          <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}${item.size?' · '+item.size:''}</div>
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

window.changeQty = function(uid,delta){
  const item=cart.find(i=>i.uid===uid);
  if(!item)return;
  const prod = window.products.find(p=>p.id===item.id);
  if(delta > 0 && prod.stock !== undefined && item.qty + 1 > prod.stock){
    showToast(`⚠️ Only ${prod.stock} items available!`);
    return;
  }
  item.qty+=delta;
  if(item.qty<=0)cart=cart.filter(i=>i.uid!==uid);
  saveCart();
  updateCartUI();
}
window.removeItem = function(uid){cart=cart.filter(i=>i.uid!==uid);saveCart();updateCartUI();}

/* ===== ORDER PLACEMENT ===== */
function placeOrder(paymentMethod, address){
  if(cart.length===0){
    showToast('Cart is empty!');
    return false;
  }
  if(!currentUser){
    showToast('Please login to place order!');
    openLoginModal();
    return false;
  }
  
  const orderId = 'ORD' + Date.now() + Math.floor(Math.random()*1000);
  const order = {
    id: orderId,
    userId: currentUser.id,
    items: [...cart],
    total: getCartTotal(),
    paymentMethod: paymentMethod,
    status: paymentMethod === 'cod' ? 'Pending' : 'Processing',
    date: new Date().toISOString(),
    address: address,
    tracking: null
  };
  
  orders.push(order);
  localStorage.setItem('nd_orders', JSON.stringify(orders));
  
  // Reduce stock
  cart.forEach(cartItem => {
    const prod = window.products.find(p => p.id === cartItem.id);
    if(prod && prod.stock !== undefined){
      prod.stock -= cartItem.qty;
    }
  });
  localStorage.setItem('nd_products', JSON.stringify(window.products));
  
  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();
  
  // Send WhatsApp confirmation
  sendOrderConfirmationWA(order);
  
  showToast(`✅ Order placed! ID: ${orderId}`);
  return orderId;
}

function sendOrderConfirmationWA(order){
  let msg = `🛍️ *New Order Received!*\n\n`;
  msg += `*Order ID:* ${order.id}\n`;
  msg += `*Customer:* ${currentUser.name}\n`;
  msg += `*Mobile:* ${currentUser.mobile}\n`;
  msg += `*Total:* ₹${order.total}\n`;
  msg += `*Payment:* ${order.paymentMethod.toUpperCase()}\n\n`;
  msg += `*Items:*\n`;
  order.items.forEach((item,i) => {
    msg += `${i+1}. ${item.name} x${item.qty} = ₹${item.price*item.qty}\n`;
  });
  msg += `\n*Status:* ${order.status}`;
  
  // For demo, just show in console. In production, use WhatsApp API
  console.log('WhatsApp Order Notification:', msg);
  
  // Also send to customer
  const customerMsg = `🛍️ *Thank you for your order!*\n\nOrder ID: ${order.id}\nTotal: ₹${order.total}\nStatus: ${order.status}\n\nTrack your order: https://nadeemreadymade.com/track?order=${order.id}\n\nFor any query, WhatsApp us: +91${WA_NUMBER}`;
  window.open(`https://wa.me/${order.mobile || WA_NUMBER}?text=${encodeURIComponent(customerMsg)}`, '_blank');
}

window.checkoutWithCOD = function(){
  if(cart.length===0){showToast('⚠️ Cart is empty!');return;}
  if(!currentUser){showToast('Please login first!');openLoginModal();return;}
  
  const address = prompt('Enter your complete delivery address:');
  if(!address) return;
  
  placeOrder('cod', address);
  closeCart();
}

/* ===== USER AUTH MODAL ===== */
window.openLoginModal = function(){
  const modal = document.getElementById('loginModal');
  if(modal) modal.classList.add('open');
}

window.closeLoginModal = function(){
  const modal = document.getElementById('loginModal');
  if(modal) modal.classList.remove('open');
}

window.switchAuthTab = function(tab){
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const tabs = document.querySelectorAll('.auth-tab');
  
  tabs.forEach(t => t.classList.remove('active'));
  if(tab === 'login'){
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    tabs[0].classList.add('active');
  } else {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
    tabs[1].classList.add('active');
  }
}

window.loginWithMobile = function(){
  const mobile = document.getElementById('loginMobile').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  if(!mobile || !password){
    showToast('Please enter mobile and password!');
    return;
  }
  
  const user = users.find(u => u.mobile === mobile && u.password === password);
  if(user){
    currentUser = user;
    localStorage.setItem('nd_current_user', JSON.stringify(user));
    updateUserUI();
    closeLoginModal();
    showToast(`Welcome back, ${user.name}! 🎉`);
    
    // Restore abandoned cart if any
    const abandoned = localStorage.getItem('nd_abandoned_cart');
    if(abandoned){
      const data = JSON.parse(abandoned);
      if(data.userId === user.id && data.cart.length > 0){
        if(confirm('You have items saved in your cart. Restore them?')){
          cart = data.cart;
          saveCart();
          updateCartUI();
        }
        localStorage.removeItem('nd_abandoned_cart');
      }
    }
  } else {
    showToast('Invalid credentials! Try: 9999999999 / guest123');
  }
}

window.signupUser = function(){
  const name = document.getElementById('signupName').value.trim();
  const mobile = document.getElementById('signupMobile').value.trim();
  const password = document.getElementById('signupPassword').value;
  
  if(!name || !mobile || !password){
    showToast('Please fill all fields!');
    return;
  }
  if(password.length < 4){
    showToast('Password must be at least 4 characters!');
    return;
  }
  if(users.find(u => u.mobile === mobile)){
    showToast('Mobile number already registered! Please login.');
    return;
  }
  
  const referralCode = 'REF' + Math.random().toString(36).substring(2,8).toUpperCase();
  const newUser = {
    id: users.length + 1,
    name: name,
    mobile: mobile,
    email: mobile + '@user.com',
    password: password,
    joinDate: new Date().toISOString(),
    referralCode: referralCode,
    referredBy: null,
    referralEarnings: 0
  };
  
  users.push(newUser);
  localStorage.setItem('nd_users', JSON.stringify(users));
  currentUser = newUser;
  localStorage.setItem('nd_current_user', JSON.stringify(newUser));
  updateUserUI();
  closeLoginModal();
  showToast(`Welcome ${name}! 🎉 Use code ${referralCode} to refer friends!`);
}

window.logoutUser = function(){
  currentUser = null;
  localStorage.removeItem('nd_current_user');
  updateUserUI();
  showToast('Logged out successfully!');
}

function updateUserUI(){
  const userBtn = document.getElementById('userBtn');
  const userMenu = document.getElementById('userMenu');
  if(userBtn){
    if(currentUser){
      userBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${currentUser.name.split(' ')[0]}`;
      userBtn.onclick = () => toggleUserMenu();
      if(userMenu) userMenu.style.display = 'flex';
    } else {
      userBtn.innerHTML = `<i class="fas fa-user"></i> Login`;
      userBtn.onclick = () => openLoginModal();
      if(userMenu) userMenu.style.display = 'none';
    }
  }
}

window.toggleUserMenu = function(){
  const menu = document.getElementById('userMenu');
  if(menu) menu.classList.toggle('show');
}

window.openOrdersModal = function(){
  const modal = document.getElementById('ordersModal');
  if(!modal) return;
  
  const userOrders = orders.filter(o => o.userId === currentUser?.id);
  const container = document.getElementById('ordersList');
  
  if(userOrders.length === 0){
    container.innerHTML = '<div class="empty-orders"><i class="fas fa-box-open"></i><p>No orders yet</p></div>';
  } else {
    container.innerHTML = userOrders.map(order => `
      <div class="order-card">
        <div class="order-header">
          <span class="order-id">${order.id}</span>
          <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
        </div>
        <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
        <div class="order-items">${order.items.length} items · ₹${order.total}</div>
        <div class="order-payment">Payment: ${order.paymentMethod.toUpperCase()}</div>
        <button class="btn-small" onclick="trackOrder('${order.id}')">Track Order</button>
      </div>
    `).join('');
  }
  
  modal.classList.add('open');
}

window.closeOrdersModal = function(){
  const modal = document.getElementById('ordersModal');
  if(modal) modal.classList.remove('open');
}

window.trackOrder = function(orderId){
  const order = orders.find(o => o.id === orderId);
  if(!order){
    showToast('Order not found!');
    return;
  }
  const msg = `🔍 *Order Status*\n\nOrder ID: ${order.id}\nStatus: ${order.status}\nTotal: ₹${order.total}\nDate: ${new Date(order.date).toLocaleDateString()}\n\nFor any query, WhatsApp us.`;
  alert(msg);
}

window.checkPincode = function(){
  const pincode = document.getElementById('pincodeInput').value;
  const result = document.getElementById('pincodeResult');
  const deliverable = ['800001','800002','801301','801302','841301','841302','841101','841102'];
  if(deliverable.includes(pincode)){
    result.innerHTML = '<span style="color:var(--green)"><i class="fas fa-check-circle"></i> Delivery available to your location!</span>';
  } else {
    result.innerHTML = '<span style="color:var(--red)"><i class="fas fa-times-circle"></i> Currently not delivering to this pincode. Contact us for options.</span>';
  }
}

window.generateReferralLink = function(){
  if(!currentUser){
    showToast('Please login to get referral link!');
    openLoginModal();
    return;
  }
  const link = `${window.location.origin}${window.location.pathname}?ref=${currentUser.referralCode}`;
  navigator.clipboard.writeText(link);
  showToast('Referral link copied! Share with friends to earn ₹100 each!');
}

/* ===== PRODUCT MODAL WITH GALLERY ===== */
let currentProd=null;

window.openModal = function(id){
  const prod=window.products.find(p=>p.id===id);
  if(!prod)return;
  currentProd=prod;
  currentProductImages = prod.images || [prod.img];
  selectedSize=null;
  
  // Set main image
  document.getElementById('modalImgSrc').src = currentProductImages[0];
  
  // Build gallery thumbnails
  const galleryContainer = document.getElementById('modalGallery');
  if(galleryContainer && currentProductImages.length > 1){
    galleryContainer.innerHTML = currentProductImages.map((img, idx) => `
      <div class="gallery-thumb ${idx===0?'active':''}" onclick="changeModalImage(${idx})">
        <img src="${img}" alt="Product view ${idx+1}">
      </div>
    `).join('');
  }
  
  document.getElementById('modalCat').textContent = prod.cat.charAt(0).toUpperCase()+prod.cat.slice(1)+' Collection';
  document.getElementById('modalTitle').textContent = prod.name;
  document.getElementById('modalPrice').textContent='₹'+prod.price;
  document.getElementById('modalOrig').textContent='₹'+prod.orig;
  document.getElementById('modalOff').textContent=prod.disc+' OFF';
  document.getElementById('modalDesc').textContent=prod.desc;
  
  // Stock status
  const stockStatus = document.getElementById('modalStock');
  if(stockStatus){
    if(prod.stock === undefined || prod.stock > 10){
      stockStatus.innerHTML = '<span style="color:var(--green)"><i class="fas fa-check-circle"></i> In Stock</span>';
    } else if(prod.stock > 0){
      stockStatus.innerHTML = `<span style="color:var(--orange)"><i class="fas fa-exclamation-triangle"></i> Only ${prod.stock} left!</span>`;
    } else {
      stockStatus.innerHTML = '<span style="color:var(--red)"><i class="fas fa-times-circle"></i> Out of Stock</span>';
    }
  }
  
  const badgeEl=document.getElementById('modalBadge');
  if(prod.badge){
    badgeEl.className='modal-img-badge '+(prod.badge==='best'?'badge-best':prod.badge==='new'?'badge-new':'badge-sale');
    badgeEl.textContent={best:'BESTSELLER',new:'NEW',sale:'SALE'}[prod.badge];
    badgeEl.style.display='block';
  } else {badgeEl.style.display='none';}
  
  const sizeGrid=document.getElementById('sizeGrid');
  sizeGrid.innerHTML=prod.sizes.map(s=>`<button class="size-btn" onclick="selectSize('${s}',this)">${s}</button>`).join('');
  
  const waMsg=encodeURIComponent(`Hi ${SHOP_NAME}! 🛍️ Main yeh product kharidna chahta hoon:\n\n*${prod.name}*\nPrice: ₹${prod.price}\n\nPlease stock confirm karein.`);
  document.getElementById('modalWABtn').href=`https://wa.me/${WA_NUMBER}?text=${waMsg}`;
  
  document.getElementById('modalAddBtn').onclick=()=>{
    if(prod.sizes.length>0 && !selectedSize) {
        showToast('⚠️ Please select a size first!');
        return;
    }
    if(prod.stock !== undefined && prod.stock <= 0){
      showToast('❌ Out of stock!');
      return;
    }
    window.addToCart(prod.id, selectedSize);
    closeModal();
  };
  
  document.getElementById('prodModal').classList.add('open');
  document.body.style.overflow='hidden';
}

window.changeModalImage = function(index){
  if(!currentProductImages[index]) return;
  document.getElementById('modalImgSrc').src = currentProductImages[index];
  document.querySelectorAll('.gallery-thumb').forEach((thumb,i) => {
    if(i === index) thumb.classList.add('active');
    else thumb.classList.remove('active');
  });
}

window.closeModal = function(){
  document.getElementById('prodModal').classList.remove('open');
  document.body.style.overflow='';
}

window.selectSize = function(size, btn){
  selectedSize=size;
  document.querySelectorAll('#sizeGrid .size-btn').forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');
}

window.openSizeGuide = function(){document.getElementById('sgPopup').classList.add('open');}
window.closeSizeGuide = function(){document.getElementById('sgPopup').classList.remove('open');}

/* ===== TOAST ===== */
let toastTimer;
window.showToast = function(msg){
  const t=document.getElementById('toast');
  if(!t) return;
  document.getElementById('toastMsg').textContent=msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}

/* ===== CART DRAWER ===== */
window.openCart = function(){
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}
window.closeCart = function(){
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

/* ===== CATEGORIES ===== */
function buildCategories(){
  const catGrid = document.getElementById('catGrid');
  if(!catGrid) return;
  catGrid.innerHTML=categories.map(c=>`
    <div class="cat-card" onclick="document.getElementById('filterChips').querySelector('[data-filter=\\'all\\']').click();document.getElementById('trending').scrollIntoView({behavior:'smooth'})">
      <i class="fas ${c.icon}"></i>
      <h3>${c.name}</h3>
      <p>${c.from}</p>
    </div>`).join('');
}

/* ===== REVIEWS ===== */
function buildReviews(){
  const reviewGrid = document.getElementById('reviewGrid');
  if(!reviewGrid) return;
  reviewGrid.innerHTML=reviews.map(r=>`
    <div class="review-card">
      <div class="review-head">
        <div class="review-avatar">${r.avatar}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-loc"><i class="fas fa-map-marker-alt" style="font-size:.65rem"></i> ${r.loc}</div>
        </div>
      </div>
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:.6rem;flex-wrap:wrap;gap:.4rem">
        <span class="review-date">${r.date}</span>
        ${r.verified?'<span class="review-badge"><i class="fas fa-check-circle"></i> Verified Purchase</span>':''}
      </div>
    </div>`).join('');
}

/* ===== TICKER ===== */
function buildTicker(){
  const items=['Free Shipping Above ₹999','New Arrivals Every Week','Wholesale Available','Up to 67% Off','COD Available','Premium Quality Guaranteed','WhatsApp Order करें'];
  const inner=document.getElementById('tickerInner');
  if(!inner) return;
  const markup=items.map(i=>`<div class="ticker-item">${i}<div class="ticker-dot"></div></div>`).join('');
  inner.innerHTML=markup+markup;
}

/* ===== COUNTDOWN TIMER ===== */
function startCountdown(){
  const target=new Date();
  target.setHours(target.getHours()+72);
  function update(){
    const now=new Date();
    const diff=target-now;
    if(diff<=0){
      document.getElementById('cd-h').textContent='00';
      document.getElementById('cd-m').textContent='00';
      document.getElementById('cd-s').textContent='00';
      return;
    }
    const h=Math.floor(diff/3600000);
    const m=Math.floor((diff%3600000)/60000);
    const s=Math.floor((diff%60000)/1000);
    const cd_h = document.getElementById('cd-h');
    const cd_m = document.getElementById('cd-m');
    const cd_s = document.getElementById('cd-s');
    if(cd_h) cd_h.textContent=String(h).padStart(2,'0');
    if(cd_m) cd_m.textContent=String(m).padStart(2,'0');
    if(cd_s) cd_s.textContent=String(s).padStart(2,'0');
  }
  update();
  setInterval(update,1000);
}

/* ===== THEME ===== */
let isLight=localStorage.getItem('theme')==='light';
function applyTheme(){
  document.body.classList.toggle('light',isLight);
  const themeIcon = document.getElementById('themeIcon');
  if(themeIcon) themeIcon.className=isLight?'fas fa-sun':'fas fa-moon';
}

/* ===== MOBILE MENU ===== */
window.closeMobile = function(){
    const menu = document.getElementById('mobileMenu');
    if(menu) menu.classList.remove('open');
}

/* ===== REVEAL ===== */
function initReveal(){
  const els=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')});
  },{threshold:.1});
  els.forEach(el=>io.observe(el));
}

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded',()=>{
  
  // Theme Setup
  applyTheme();
  const themeBtn = document.getElementById('themeBtn');
  if(themeBtn) {
      themeBtn.addEventListener('click',()=>{
        isLight=!isLight;
        localStorage.setItem('theme',isLight?'light':'dark');
        applyTheme();
        gsap.fromTo('#themeBtn',{scale:.7,rotate:-20},{scale:1,rotate:0,duration:.4,ease:'back.out(2)'});
      });
  }
  
  // Component Setup
  buildTicker();
  buildCategories();
  buildReviews();
  initReveal();
  startCountdown();
  updateCartUI();
  updateUserUI();
  
  // Check for referral in URL
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');
  if(ref){
    localStorage.setItem('nd_referred_by', ref);
    showToast('🎁 Welcome! Referral code applied.');
  }

  // Modals & Drawers Setup
  const modalCloseBtn = document.getElementById('modalClose');
  if(modalCloseBtn) modalCloseBtn.addEventListener('click',closeModal);
  
  const prodModal = document.getElementById('prodModal');
  if(prodModal) prodModal.addEventListener('click',function(e){if(e.target===this)closeModal();});
  
  const sgPopup = document.getElementById('sgPopup');
  if(sgPopup) sgPopup.addEventListener('click',function(e){if(e.target===this)closeSizeGuide();});
  
  const cartOpenBtn = document.getElementById('cartOpenBtn');
  if(cartOpenBtn) cartOpenBtn.addEventListener('click',openCart);
  
  const cartCloseBtn = document.getElementById('cartClose');
  if(cartCloseBtn) cartCloseBtn.addEventListener('click',closeCart);
  
  const cartOverlay = document.getElementById('cartOverlay');
  if(cartOverlay) cartOverlay.addEventListener('click',closeCart);

  // Mobile Menu Setup
  const hamburger = document.getElementById('hamburger');
  if(hamburger) hamburger.addEventListener('click',()=>{
    document.getElementById('mobileMenu').classList.toggle('open');
  });

  // Scroll to Top
  window.addEventListener('scroll',()=>{
    const st = document.getElementById('scrollTopBtn');
    if(st) st.classList.toggle('show',window.scrollY>400);
  });

  // GSAP Animations
  gsap.from('.hero-title',{duration:1,y:50,opacity:0,ease:'power3.out'});
  gsap.from('.hero-sub',{duration:1,y:30,opacity:0,delay:.2,ease:'power3.out'});
  gsap.from('.hero-btns',{duration:.8,y:20,opacity:0,delay:.4,ease:'power2.out'});
  gsap.from('.hero-stats .stat',{duration:.6,y:20,opacity:0,stagger:.12,delay:.5,ease:'power2.out'});
});
