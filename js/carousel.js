/**
 * NADEEM DRESS | Carousel Component — FIXED VERSION
 * Fixes: Card width, image loading, multiple cards showing
 */

let carIndex = 0;
let carAuto;
let filteredProds = [];

function buildCard(prod) {
  const badgeMap = {best:'badge-best', new:'badge-new', sale:'badge-sale'};
  const badgeLabel = {best:'BESTSELLER', new:'NEW', sale:'SALE'};
  const isWishlisted = (window.wishlist || []).includes(prod.id);

  /* FIX: Use placeholder if image might fail */
  const imgSrc = prod.img || 'https://placehold.co/300x360/13131f/D4AF37?text=Photo';

  return `
  <div class="prod-card" onclick="window.openModal(${prod.id})">
    <div class="prod-img">
      ${prod.badge ? `<div class="prod-badge ${badgeMap[prod.badge]}">${badgeLabel[prod.badge]}</div>` : ''}
      <img src="${imgSrc}" alt="${prod.name}" loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/300x360/13131f/D4AF37?text=Photo'">
      <div class="prod-img-overlay">
        <button class="quick-add" onclick="window.addToCart(${prod.id},null);event.stopPropagation()">+ Bag Mein Dalo</button>
        <button class="quick-view-btn" onclick="window.openModal(${prod.id});event.stopPropagation()">Quick View</button>
      </div>
      <button class="wishlist-btn ${isWishlisted ? 'liked' : ''}" 
        onclick="handleWishlist(${prod.id},this);event.stopPropagation()" title="Wishlist">
        <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
      </button>
    </div>
    <div class="prod-info">
      <div class="prod-name">${prod.name}</div>
      <div class="stars">★★★★☆</div>
      <div class="prod-prices">
        <span class="prod-price">₹${prod.price.toLocaleString('en-IN')}</span>
        ${prod.orig ? `<span class="prod-orig">₹${prod.orig.toLocaleString('en-IN')}</span>` : ''}
        ${prod.disc ? `<span class="prod-off">${prod.disc} OFF</span>` : ''}
      </div>
    </div>
  </div>`;
}

/* FIX: Wishlist button handler */
window.handleWishlist = function(id, btn) {
  if (!window.wishlist) window.wishlist = [];
  if (window.wishlist.includes(id)) {
    window.wishlist = window.wishlist.filter(x => x !== id);
    btn.classList.remove('liked');
    btn.querySelector('i').className = 'far fa-heart';
  } else {
    window.wishlist.push(id);
    btn.classList.add('liked');
    btn.querySelector('i').className = 'fas fa-heart';
    window.showToast('❤️ Wishlist mein add ho gaya!');
  }
  localStorage.setItem('nd_wishlist', JSON.stringify(window.wishlist));
}

/* FIX: Proper card width calculation */
function getCardWidth() {
  const w = window.innerWidth;
  if (w >= 1200) return 230;
  if (w >= 900) return 210;
  if (w >= 600) return 195;
  /* Mobile: show ~1.5 cards so user knows it's scrollable */
  return Math.min(200, Math.floor((w - 40) * 0.82));
}

function getVisibleCount() {
  const w = window.innerWidth;
  if (w >= 1200) return 4;
  if (w >= 900) return 3;
  if (w >= 600) return 2;
  return 1;
}

window.buildCarousel = function(filter = 'all') {
  if (!window.products) return;

  filteredProds = filter === 'all' ? [...window.products]
    : filter === 'bestseller' ? window.products.filter(p => p.badge === 'best')
    : window.products.filter(p => p.cat === filter);

  if (filteredProds.length === 0) {
    filteredProds = [...window.products];
  }

  window.wishlist = JSON.parse(localStorage.getItem('nd_wishlist') || '[]');

  const track = document.getElementById('carTrack');
  if (!track) return;

  track.innerHTML = filteredProds.map(buildCard).join('');
  carIndex = 0;

  /* FIX: Apply widths AFTER inserting HTML */
  applyCardWidths();

  /* FIX: Reset transform instantly */
  track.style.transition = 'none';
  track.style.transform = 'translateX(0)';
}

function applyCardWidths() {
  const cardW = getCardWidth();
  const cards = document.querySelectorAll('#carTrack .prod-card');
  cards.forEach(card => {
    card.style.minWidth = cardW + 'px';
    card.style.width = cardW + 'px';
    card.style.flex = `0 0 ${cardW}px`;
  });
  return cardW;
}

window.moveCarousel = function(delta, instant = false) {
  const perView = getVisibleCount();
  const max = Math.max(0, filteredProds.length - perView);
  carIndex = Math.min(max, Math.max(0, carIndex + delta));

  const cardW = getCardWidth();
  const gap = 22;
  const offset = -(carIndex * (cardW + gap));

  const track = document.getElementById('carTrack');
  if (track) {
    track.style.transition = instant ? 'none' : 'transform .55s cubic-bezier(.4,0,.2,1)';
    track.style.transform = `translateX(${offset}px)`;
  }
}

window.startCarAuto = function() {
  clearInterval(carAuto);
  carAuto = setInterval(() => {
    const perView = getVisibleCount();
    const max = filteredProds.length - perView;
    if (carIndex >= max) carIndex = -1;
    window.moveCarousel(1);
  }, 3200);
}

/* ===== DRAG / SWIPE ===== */
let dragStart = null, dragX = 0, isDragging = false;

function initDrag() {
  const track = document.getElementById('carTrack');
  if (!track) return;

  track.addEventListener('mousedown', e => {
    dragStart = e.clientX;
    const cardW = getCardWidth();
    dragX = carIndex * (cardW + 22);
    isDragging = false;
  });

  window.addEventListener('mousemove', e => {
    if (dragStart === null) return;
    isDragging = true;
    const diff = dragStart - e.clientX;
    track.style.transition = 'none';
    track.style.transform = `translateX(${-(dragX + diff)}px)`;
  });

  window.addEventListener('mouseup', e => {
    if (dragStart === null) return;
    const diff = dragStart - e.clientX;
    dragStart = null;
    if (Math.abs(diff) > 50) window.moveCarousel(diff > 0 ? 1 : -1);
    else window.moveCarousel(0);
    setTimeout(() => { isDragging = false; }, 50);
  });

  track.addEventListener('click', e => {
    if (isDragging) { e.stopPropagation(); e.preventDefault(); }
  }, true);

  track.addEventListener('touchstart', e => {
    dragStart = e.touches[0].clientX;
    const cardW = getCardWidth();
    dragX = carIndex * (cardW + 22);
  }, {passive: true});

  window.addEventListener('touchmove', e => {
    if (dragStart === null) return;
    const diff = dragStart - e.touches[0].clientX;
    track.style.transition = 'none';
    track.style.transform = `translateX(${-(dragX + diff)}px)`;
  }, {passive: true});

  window.addEventListener('touchend', e => {
    if (dragStart === null) return;
    const diff = dragStart - e.changedTouches[0].clientX;
    dragStart = null;
    if (Math.abs(diff) > 40) window.moveCarousel(diff > 0 ? 1 : -1);
    else window.moveCarousel(0);
  });
}

/* ===== CHIP FILTERS ===== */
function initChips() {
  const filterChips = document.getElementById('filterChips');
  if (!filterChips) return;
  filterChips.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    document.querySelectorAll('#filterChips .chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    window.buildCarousel(chip.dataset.filter);
    window.startCarAuto();
  });
}

/* ===== SEARCH ===== */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  searchInput.addEventListener('input', function() {
    const q = this.value.toLowerCase().trim();
    if (!q) {
      const activeChip = document.querySelector('#filterChips .chip.active');
      const filter = activeChip ? activeChip.dataset.filter : 'all';
      window.buildCarousel(filter);
      return;
    }
    const searchResults = window.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      (p.desc && p.desc.toLowerCase().includes(q))
    );
    filteredProds = searchResults;
    window.wishlist = JSON.parse(localStorage.getItem('nd_wishlist') || '[]');
    const track = document.getElementById('carTrack');
    if (track) {
      track.innerHTML = searchResults.length > 0
        ? searchResults.map(buildCard).join('')
        : `<div style="padding:2rem;color:var(--muted);font-size:.88rem">Koi product nahi mila "${q}" ke liye</div>`;
      if (searchResults.length > 0) applyCardWidths();
      carIndex = 0;
      window.moveCarousel(0, true);
    }
  });
}

/* ===== INIT ===== */
window.addEventListener('DOMContentLoaded', () => {
  window.wishlist = JSON.parse(localStorage.getItem('nd_wishlist') || '[]');
  filteredProds = [...window.products];

  /* FIX: Build carousel then wait 1 frame before applying widths */
  window.buildCarousel();

  /* FIX: Re-apply widths after images start loading */
  requestAnimationFrame(() => {
    applyCardWidths();
    window.moveCarousel(0, true);
  });

  initChips();
  initDrag();
  initSearch();
  window.startCarAuto();

  const wrap = document.getElementById('carTrack')?.closest('.carousel-wrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', () => clearInterval(carAuto));
    wrap.addEventListener('mouseleave', window.startCarAuto);
  }

  const carNext = document.getElementById('carNext');
  if (carNext) carNext.addEventListener('click', () => { window.moveCarousel(1); window.startCarAuto(); });

  const carPrev = document.getElementById('carPrev');
  if (carPrev) carPrev.addEventListener('click', () => { window.moveCarousel(-1); window.startCarAuto(); });
});

/* FIX: Resize pe recalculate */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    applyCardWidths();
    window.moveCarousel(0, true);
  }, 150);
});
