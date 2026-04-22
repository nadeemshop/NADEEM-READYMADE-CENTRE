/**
 * NADEEM DRESS | Carousel Component Logic
 * Contains: Carousel track construction, filtering, drag/swipe, and auto-slide logic.
 */

let carIndex=0;
let carAuto;
let filteredProds = [];

function buildCard(prod){
  const badgeMap={best:'badge-best',new:'badge-new',sale:'badge-sale'};
  const badgeLabel={best:'BESTSELLER',new:'NEW',sale:'SALE'};
  return `
  <div class="prod-card" onclick="window.openModal(${prod.id})">
    <div class="prod-img">
      ${prod.badge?`<div class="prod-badge ${badgeMap[prod.badge]}">${badgeLabel[prod.badge]}</div>`:''}
      <img src="${prod.img}" alt="${prod.name}" loading="lazy">
      <div class="prod-img-overlay">
        <button class="quick-add" onclick="window.addToCart(${prod.id},null);event.stopPropagation()">+ Add to Bag</button>
        <button class="quick-view-btn" onclick="window.openModal(${prod.id});event.stopPropagation()">Quick View</button>
      </div>
      <button class="wishlist-btn" onclick="this.classList.toggle('liked');event.stopPropagation()" title="Wishlist">
        <i class="far fa-heart"></i>
      </button>
    </div>
    <div class="prod-info">
      <div class="prod-name">${prod.name}</div>
      <div class="stars">${'★'.repeat(4)}☆</div>
      <div class="prod-prices">
        <span class="prod-price">₹${prod.price}</span>
        <span class="prod-orig">₹${prod.orig}</span>
        <span class="prod-off">${prod.disc} OFF</span>
      </div>
    </div>
  </div>`;
}

function getSlideW(){
  const w=window.innerWidth;
  if(w>=1200)return 4;if(w>=900)return 3;if(w>=600)return 2;return 1;
}

window.buildCarousel = function(filter='all'){
  if(!window.products) return;
  filteredProds = filter==='all' ? [...window.products]
    : filter==='bestseller' ? window.products.filter(p=>p.badge==='best')
    : window.products.filter(p=>p.cat===filter);
    
  const track = document.getElementById('carTrack');
  if(track) {
      track.innerHTML=filteredProds.map(buildCard).join('');
      carIndex=0;
      window.moveCarousel(0,true);
  }
}

window.moveCarousel = function(delta,instant=false){
  const perView=getSlideW();
  const max=Math.max(0,filteredProds.length-perView);
  carIndex=Math.min(max,Math.max(0,carIndex+delta));
  const offset=-(carIndex*234);
  const track=document.getElementById('carTrack');
  if(track) {
      track.style.transition=instant?'none':'transform .55s cubic-bezier(.4,0,.2,1)';
      track.style.transform=`translateX(${offset}px)`;
  }
}

window.startCarAuto = function(){
  clearInterval(carAuto);
  carAuto=setInterval(()=>{
    const perView=getSlideW();
    const max=filteredProds.length-perView;
    if(carIndex>=max)carIndex=-1;
    window.moveCarousel(1);
  },3200);
}

let dragStart=null, dragX=0;
function initDrag(){
  const track=document.getElementById('carTrack');
  if(!track) return;
  track.addEventListener('mousedown',e=>{dragStart=e.clientX;dragX=carIndex*234});
  window.addEventListener('mousemove',e=>{
    if(dragStart===null)return;
    track.style.transition='none';
    track.style.transform=`translateX(${-(dragX+(dragStart-e.clientX))}px)`;
  });
  window.addEventListener('mouseup',e=>{
    if(dragStart===null)return;
    const diff=dragStart-e.clientX;dragStart=null;
    if(Math.abs(diff)>50)window.moveCarousel(diff>0?1:-1);else window.moveCarousel(0);
  });
  track.addEventListener('touchstart',e=>{dragStart=e.touches[0].clientX;dragX=carIndex*234},{passive:true});
  window.addEventListener('touchmove',e=>{
    if(dragStart===null)return;
    const diff=dragStart-e.touches[0].clientX;
    track.style.transition='none';
    track.style.transform=`translateX(${-(dragX+diff)}px)`;
  },{passive:true});
  window.addEventListener('touchend',e=>{
    if(dragStart===null)return;
    const diff=dragStart-e.changedTouches[0].clientX;dragStart=null;
    if(Math.abs(diff)>50)window.moveCarousel(diff>0?1:-1);else window.moveCarousel(0);
  });
}

/* ===== CHIP FILTERS ===== */
function initChips(){
  const filterChips = document.getElementById('filterChips');
  if(!filterChips) return;
  filterChips.addEventListener('click',e=>{
    const chip=e.target.closest('.chip');
    if(!chip)return;
    document.querySelectorAll('#filterChips .chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    window.buildCarousel(chip.dataset.filter);
    window.startCarAuto();
  });
}

/* ===== SEARCH ===== */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if(searchInput) {
      searchInput.addEventListener('input',function(){
        const q=this.value.toLowerCase();
        const cards=document.querySelectorAll('#carTrack .prod-card');
        cards.forEach((card,i)=>{
          const name=filteredProds[i]?.name.toLowerCase()||'';
          card.style.opacity=name.includes(q)||q===''?'1':'0.2';
        });
      });
  }
}

// INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
    // Sharing products from main scope if needed
    filteredProds = [...window.products];
    window.buildCarousel();
    initChips();
    initDrag();
    initSearch();
    window.startCarAuto();

    const wrap=document.getElementById('carTrack')?.closest('.carousel-wrap');
    if(wrap) {
        wrap.addEventListener('mouseenter',()=>clearInterval(carAuto));
        wrap.addEventListener('mouseleave',window.startCarAuto);
    }

    const carNext = document.getElementById('carNext');
    if(carNext) carNext.addEventListener('click',()=>{window.moveCarousel(1);window.startCarAuto()});
    
    const carPrev = document.getElementById('carPrev');
    if(carPrev) carPrev.addEventListener('click',()=>{window.moveCarousel(-1);window.startCarAuto()});
});

window.addEventListener('resize',()=>window.moveCarousel(0,true));
