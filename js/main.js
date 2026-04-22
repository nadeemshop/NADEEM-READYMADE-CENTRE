/* ===== CONSTANTS ===== */
const WA_NUMBER = '918010929093'; 
const SHOP_NAME = 'Nadeem Readymade Centre';

/* ===== PRODUCT DATA ===== */
window.products = [
  {id:1,name:"Premium Slim Blazer",price:799,orig:1999,img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500",disc:"60%",badge:"best",cat:"men",desc:"Sophisticated slim-fit blazer crafted from premium poly-viscose fabric. Perfect for festive occasions, weddings, and formal meetings.",sizes:["S","M","L","XL","XXL"]},
  {id:2,name:"Oxford Cotton Shirt",price:499,orig:999,img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",disc:"50%",badge:"best",cat:"men",desc:"Pure cotton Oxford weave shirt, breathable and comfortable all day. Available in multiple colors.",sizes:["S","M","L","XL","XXL","3XL"]},
  {id:3,name:"Stretch High Rise Jeans",price:899,orig:1499,img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",disc:"40%",badge:"",cat:"men",desc:"Premium stretch denim with 4-way flex. High-rise fit for maximum comfort and style.",sizes:["28","30","32","34","36","38"]},
  {id:4,name:"Silk Embroidered Kurta",price:999,orig:1999,img:"https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500",disc:"55%",badge:"best",cat:"women",desc:"Stunning silk-blend kurta with intricate hand embroidery. Perfect for Eid, pujas, and family gatherings.",sizes:["XS","S","M","L","XL"]},
  {id:5,name:"Biker Leather Jacket",price:1299,orig:2499,img:"https://images.unsplash.com/photo-1551028719-00167b16eac1?w=500",disc:"48%",badge:"new",cat:"men",desc:"Faux leather biker jacket with quilted shoulder panels. Edgy, durable, and weather-resistant.",sizes:["S","M","L","XL","XXL"]},
  {id:6,name:"Casual Poplin Shirt",price:699,orig:1399,img:"https://images.unsplash.com/photo-1598032895397-b7f59a2f3b2c?w=500",disc:"50%",badge:"",cat:"men",desc:"Lightweight poplin fabric, wrinkle-resistant. Great for daily wear and casual outings.",sizes:["S","M","L","XL","XXL","3XL"]},
  {id:7,name:"Combat Cargo Pants",price:899,orig:1599,img:"https://images.unsplash.com/photo-1517438476312-10d79c077509?w=500",disc:"44%",badge:"",cat:"men",desc:"Heavy-duty cargo pants with 6 pockets. Ripstop fabric, adjustable waist, streetwear ready.",sizes:["28","30","32","34","36"]},
  {id:8,name:"Banarasi Silk Saree",price:1999,orig:5999,img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d4?w=500",disc:"67%",badge:"best",cat:"women",desc:"Authentic Banarasi silk saree with golden zari border. A timeless heirloom for special occasions.",sizes:["Free Size"]},
  {id:9,name:"Festive Kids Wear",price:599,orig:1199,img:"https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500",disc:"50%",badge:"new",cat:"kids",desc:"Adorable festive outfit set for kids. Comfortable fabric, easy to wash, looks stunning.",sizes:["2-3Y","3-4Y","4-5Y","5-6Y","6-7Y","7-8Y"]},
  {id:10,name:"Floral Anarkali Suit",price:1099,orig:2499,img:"https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500",disc:"56%",badge:"best",cat:"women",desc:"Beautiful floral print Anarkali suit with matching dupatta. Floor-length elegance for every occasion.",sizes:["XS","S","M","L","XL","XXL"]},
  {id:11,name:"Kids Denim Jacket",price:449,orig:899,img:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",disc:"50%",badge:"",cat:"kids",desc:"Trendy denim jacket for kids with snap buttons and patch pockets. Cool, comfy, durable.",sizes:["4-5Y","5-6Y","6-7Y","7-8Y","8-9Y"]},
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

/* ===== CART ===== */
let cart = [];
let selectedProdId = null;
let selectedSize = null;

function getCartCount(){return cart.reduce((s,i)=>s+i.qty,0)}
function getCartTotal(){return cart.reduce((s,i)=>s+i.price*i.qty,0)}

window.addToCart = function(id, size) {
  const prod=window.products.find(p=>p.id===id);
  if(!prod)return;
  // Check if same product+size already in cart
  const existing=cart.find(i=>i.id===id && i.size===size);
  if(existing){existing.qty++;}
  else{cart.push({...prod,qty:1,size:size||null,uid:++uidCounter});}
  updateCartUI();
  showToast('🛍️ '+prod.name+' added to bag!');
}

function updateCartUI(){
  const badge=document.getElementById('cartBadge');
  if(!badge) return;
  const count=getCartCount();
  badge.textContent=count;
  
  const totalEl = document.getElementById('cartTotal');
  if(totalEl) totalEl.textContent='₹'+getCartTotal().toLocaleString('en-IN');
  
  const empty=document.getElementById('cartEmpty');
  const container=document.getElementById('cartItems');
  if(container) {
      container.querySelectorAll('.cart-item').forEach(e=>e.remove());
      if(cart.length===0){empty.style.display='flex';return;}
      empty.style.display='none';
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

let uidCounter=0;

window.changeQty = function(uid,delta){
  const item=cart.find(i=>i.uid===uid);
  if(!item)return;
  item.qty+=delta;
  if(item.qty<=0)cart=cart.filter(i=>i.uid!==uid);
  updateCartUI();
}
window.removeItem = function(uid){cart=cart.filter(i=>i.uid!==uid);updateCartUI();}

/* ===== WHATSAPP ORDER ===== */
function buildWAOrderMsg(items){
  let msg=`Hi ${SHOP_NAME}! 🛍️ Main order karna chahta hoon:\n\n`;
  items.forEach((item,i)=>{
    msg+=`${i+1}. ${item.name}${item.size?' (Size: '+item.size+')':''} — ₹${item.price} x ${item.qty}\n`;
  });
  msg+=`\n💰 Total: ₹${getCartTotal().toLocaleString('en-IN')}`;
  msg+=`\n\nPlease confirm availability aur delivery details.`;
  return encodeURIComponent(msg);
}

window.checkoutWA = function(){
  if(cart.length===0){showToast('⚠️ Pehle bag mein kuch add karo!');return;}
  const msg=buildWAOrderMsg(cart);
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`,'_blank');
}

/* ===== PRODUCT MODAL ===== */
let currentProd=null;

window.openModal = function(id){
  const prod=window.products.find(p=>p.id===id);
  if(!prod)return;
  currentProd=prod;
  selectedSize=null;

  document.getElementById('modalImgSrc').src=prod.img;
  document.getElementById('modalCat').textContent=prod.cat.charAt(0).toUpperCase()+prod.cat.slice(1)+' Collection';
  document.getElementById('modalTitle').textContent=prod.name;
  document.getElementById('modalPrice').textContent='₹'+prod.price;
  document.getElementById('modalOrig').textContent='₹'+prod.orig;
  document.getElementById('modalOff').textContent=prod.disc+' OFF';
  document.getElementById('modalDesc').textContent=prod.desc;

  const badgeEl=document.getElementById('modalBadge');
  if(prod.badge){
    badgeEl.className='modal-img-badge '+(prod.badge==='best'?'badge-best':prod.badge==='new'?'badge-new':'badge-sale');
    badgeEl.textContent={best:'BESTSELLER',new:'NEW',sale:'SALE'}[prod.badge];
    badgeEl.style.display='block';
  } else {badgeEl.style.display='none';}

  const sizeGrid=document.getElementById('sizeGrid');
  sizeGrid.innerHTML=prod.sizes.map(s=>`<button class="size-btn" onclick="selectSize('${s}',this)">${s}</button>`).join('');

  // WA button
  const waMsg=encodeURIComponent(`Hi ${SHOP_NAME}! 🛍️ Main yeh product kharidna chahta hoon:\n\n*${prod.name}*\nPrice: ₹${prod.price}\n\nPlease stock confirm karein.`);
  document.getElementById('modalWABtn').href=`https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  // Add to bag button
  document.getElementById('modalAddBtn').onclick=()=>{
    if(prod.sizes.length>0 && !selectedSize) {
        showToast('⚠️ Please select a size first!');
        return;
    }
    window.addToCart(prod.id, selectedSize);
    closeModal();
  };

  document.getElementById('prodModal').classList.add('open');
  document.body.style.overflow='hidden';
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

/* ===== SIZE GUIDE ===== */
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

/* ===== CART DRAWER ACTIONS ===== */
function openCart(){
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
}
function closeCart(){
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

/* ===== MOBILE MENU & SCROLL ===== */
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

/* ===== INIT LOOP ===== */
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
