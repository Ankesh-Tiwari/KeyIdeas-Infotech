
(function () {
  'use strict';

  /* ── ALL CARD CONTENT ──────────────────────────────────────────── */
  const CARDS = [
    { id: 'transform',   bg: 'bg-light',  html: `<span class="kw">Transform</span>` },
    { id: 'convert',     bg: 'bg-medium', html: `<span class="kw">Convert</span>` },
    { id: 'attract',     bg: 'bg-dark',   html: `<span class="kw">Attract</span>` },
    { id: 'growth',      bg: 'bg-medium', html: `<span class="kw">Growth</span>` },
    { id: 'strategy',    bg: 'bg-medium', html: `<span class="kw">Strategy</span>` },
    { id: 'innovate',    bg: 'bg-light',  html: `<span class="kw">Innovate</span>` },
    { id: 'inspire',     bg: 'bg-pale',   html: `<span class="kw on-pale">Inspire</span>` },
    { id: 'deliver',     bg: 'bg-dark',   html: `<span class="kw">Deliver</span>` },
    {
      id: 'cr-aspnet', bg: 'bg-dark',
      html: `
        <div class="cr-brand"><span class="cr-crowd">Crowd</span><span class="cr-reviews">Reviews</span></div>
        <div class="cr-sub">Buyers Guide Based On Your Reviews</div>
        <div class="aw-title">#1</div>
        <div class="aw-desc">ASP.NET<br>Development Company</div>
      `
    },
    {
      id: 'cr-ecommerce', bg: 'bg-dark',
      html: `
        <div class="cr-brand"><span class="cr-crowd">Crowd</span><span class="cr-reviews">Reviews</span></div>
        <div class="cr-sub">Buyers Guide Based On Your Reviews</div>
        <div class="aw-title">Top 3</div>
        <div class="aw-desc">E-Commerce<br>Development Company</div>
      `
    },
    {
      id: 'cr-webdev', bg: 'bg-dark',
      html: `
        <div class="cr-brand"><span class="cr-crowd">Crowd</span><span class="cr-reviews">Reviews</span></div>
        <div class="cr-sub">Buyers Guide Based On Your Reviews</div>
        <div class="aw-title">Top 10</div>
        <div class="aw-desc">Web Development<br>Company</div>
      `
    },
    {
      id: 'microsoft', bg: 'bg-pale',
      html: `
        <div class="ms-wrap">
          <div class="ms-row">
            <div class="ms-squares">
              <span class="ms-r"></span><span class="ms-g"></span>
              <span class="ms-b"></span><span class="ms-y"></span>
            </div>
            <div class="ms-name">Microsoft<br>Solutions Partner</div>
          </div>
          <div class="ms-cloud">Microsoft Cloud</div>
        </div>
      `
    },
    {
      id: 'clutch-1000', bg: 'bg-medium',
      html: `
        <div class="cl-brand">Clutch</div>
        <div class="cl-stars">★★★★★</div>
        <div class="aw-title">TOP 1000</div>
        <div class="aw-desc">B2B Companies 2018</div>
      `
    },
    {
      id: 'clutch-b2b', bg: 'bg-dark',
      html: `
        <div class="cl-brand">Clutch</div>
        <div class="cl-stars">★★★★★</div>
        <div class="aw-title">Top B2B</div>
        <div class="aw-desc">Providers in the Indian<br>Emerging Tech Market 2021</div>
      `
    },
    {
      id: 'clutch-top12', bg: 'bg-dark',
      html: `
        <div class="cl-brand">Clutch</div>
        <div class="cl-stars">★★★★★</div>
        <div class="aw-title">Top 12</div>
        <div class="aw-desc">out of 400 top Mobile<br>App Developers India, 2020</div>
      `
    },
    {
      id: 'goodfirms', bg: 'bg-dark',
      html: `
        <div class="gf-box">
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <rect x="2"  y="2"  width="9" height="9" rx="1.5" fill="#3B1080"/>
            <rect x="13" y="2"  width="9" height="9" rx="1.5" fill="#3B1080"/>
            <rect x="2"  y="13" width="9" height="9" rx="1.5" fill="#3B1080"/>
            <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#3B1080"/>
          </svg>
        </div>
        <div class="aw-title">Top Shopify</div>
        <div class="aw-desc">Development<br>Companies in 2019</div>
      `
    },
  ];


  const COLS = 4;
  const ROWS = 3;
  const GAP  = 0; // no gap — blocks touch each other

  const SLOT_DEFS = [
    // row 0
    { col: 0, row: 0 },
    { col: 1, row: 0 },
    { col: 2, row: 0 },
    { col: 3, row: 0 },
    // row 1
    { col: 1, row: 1 },
    { col: 2, row: 1 },
    { col: 3, row: 1 },
    // row 2
    { col: 2, row: 2 },
    { col: 3, row: 2 },
  ];

  /* ── Compute pixel rect for a slot based on current arena size ── */
  function getSlotRect(slotDef) {
    const arena = document.getElementById('kiArena');
    const W = arena.offsetWidth;
    const H = arena.offsetHeight;
    const colW = (W - GAP * (COLS - 1)) / COLS;
    const rowH = (H - GAP * (ROWS - 1)) / ROWS;
    return {
      left:   slotDef.col * (colW + GAP),
      top:    slotDef.row * (rowH + GAP),
      width:  colW,
      height: rowH,
    };
  }

  const arena = document.getElementById('kiArena');
  const cardEls = {}; // id → DOM element

  CARDS.forEach(function (card) {
    const el = document.createElement('div');
    el.className = 'ki-card ' + card.bg;
    el.id = 'kc-' + card.id;
    el.innerHTML = card.html;
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '1';
    arena.appendChild(el);
    cardEls[card.id] = el;
  });

  
  let slotCards = [
    'cr-aspnet',     // slot 0
    'transform',     // slot 1
    'cr-ecommerce',  // slot 2
    'strategy',      // slot 3
    'cr-webdev',     // slot 4
    'attract',       // slot 5
    'microsoft',     // slot 6
    'clutch-1000',   // slot 7
    'growth',        // slot 8
  ];

  // Cards not on screen
  let bench = CARDS
    .map(c => c.id)
    .filter(id => !slotCards.includes(id));

 

  // Which slot index is the LEFT-MOST in each row
  const ROW_FIRST = [0, 4, 7]; // slot 0 = row0 left, slot 4 = row1 left, slot 7 = row2 left
  const ROW_LAST  = [3, 6, 8]; // rightmost slot per row (bleeds off screen)
  const TOP_SLOTS = [0, 1, 2, 3];   // row 0 — flush to top
  const BOT_SLOTS = [7, 8];         // row 2 — flush to bottom

  function getRadius(slotIndex) {
    const isTop    = TOP_SLOTS.includes(slotIndex);
    const isBot    = BOT_SLOTS.includes(slotIndex);
    const isLeft   = ROW_FIRST.includes(slotIndex);

    // Each corner: topLeft, topRight, bottomRight, bottomLeft
    const tl = isTop ? 0 : 14;
    const tr = isTop ? 0 : 14;
    const br = isBot ? 0 : (isLeft ? 0 : 14);  // left card bottom-right stays 0 too (inner edge)
    const bl = isBot ? 0 : (isLeft ? 14 : 14); // LEFT card gets the staircase curve here

    
    const finalTl = isLeft && !isTop ? 0 : tl;

    return `${finalTl}px ${tr}px ${br}px ${bl}px`;
  }

  function placeCard(cardId, slotIndex, animate) {
    const el = cardEls[cardId];
    if (!el) return;
    const rect = getSlotRect(SLOT_DEFS[slotIndex]);

    if (!animate) {
      el.style.transition = 'none';
    } else {
      el.style.transition =
        'top 0.65s cubic-bezier(.4,0,.2,1),' +
        'left 0.65s cubic-bezier(.4,0,.2,1),' +
        'opacity 0.4s ease';
    }

    el.style.left         = rect.left   + 'px';
    el.style.top          = rect.top    + 'px';
    el.style.width        = rect.width  + 'px';
    el.style.height       = rect.height + 'px';
    el.style.borderRadius = getRadius(slotIndex);
    el.style.opacity      = '1';
    el.style.pointerEvents = 'auto';
    el.style.zIndex       = String(slotIndex + 1);
  }

  function hideCard(cardId) {
    const el = cardEls[cardId];
    if (!el) return;
    el.style.transition = 'opacity 0.35s ease';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
  }

  /* ── Initial placement (no animation) ── */
  function initialPlace() {
    slotCards.forEach(function (cardId, slotIdx) {
      placeCard(cardId, slotIdx, false);
      // Force reflow then restore transition
      const el = cardEls[cardId];
      void el.offsetWidth;
      // Entrance stagger
      el.style.transition = 'opacity 0.5s ease';
      el.style.opacity = '0';
      setTimeout(function () {
        el.style.opacity = '1';
      }, slotIdx * 80 + 100);
    });
  }

  initialPlace();

 
  function doShuffle() {
    const numSlots = SLOT_DEFS.length; // 9

    // ── Option A: bring in a bench card, remove one visible card
    if (bench.length > 0 && Math.random() < 0.4) {
      // Pick a random slot to replace
      const targetSlot = Math.floor(Math.random() * numSlots);
      const outgoingId = slotCards[targetSlot];
      const incomingIdx = Math.floor(Math.random() * bench.length);
      const incomingId  = bench[incomingIdx];

      // Hide outgoing
      hideCard(outgoingId);

      // Place incoming at the target slot (slide in from slight offset)
      const el = cardEls[incomingId];
      const rect = getSlotRect(SLOT_DEFS[targetSlot]);
      el.style.transition = 'none';
      el.style.left   = rect.left + 'px';
      el.style.top    = (rect.top + 30) + 'px';
      el.style.width  = rect.width  + 'px';
      el.style.height = rect.height + 'px';
      el.style.opacity = '0';
      el.style.pointerEvents = 'auto';
      void el.offsetWidth;

      el.style.transition = 'top 0.6s cubic-bezier(.22,1,.36,1), opacity 0.5s ease';
      el.style.top    = rect.top + 'px';
      el.style.opacity = '1';

      // Update data
      bench[incomingIdx] = outgoingId;
      slotCards[targetSlot] = incomingId;
      return;
    }

    // ── Option B: pick 2–3 slots and rotate their cards
    const count = Math.random() < 0.5 ? 2 : 3;
    // Shuffle indices, pick first `count`
    const indices = Array.from({ length: numSlots }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    // Rotate: shift cards one position in the chosen slots
    const ids = indices.map(i => slotCards[i]);
    // Rotate array: last goes to front
    ids.unshift(ids.pop());

    indices.forEach(function (slotIdx, i) {
      slotCards[slotIdx] = ids[i];
      placeCard(ids[i], slotIdx, true);
    });
  }

  setInterval(doShuffle, 2600);

  window.addEventListener('resize', function () {
    slotCards.forEach(function (cardId, slotIdx) {
      placeCard(cardId, slotIdx, false);
      void cardEls[cardId].offsetWidth;
      cardEls[cardId].style.transition =
        'top 0.65s cubic-bezier(.4,0,.2,1),' +
        'left 0.65s cubic-bezier(.4,0,.2,1),' +
        'opacity 0.4s ease';
    });
  });



})();





(function () {
    'use strict';

    function isMobile() {
        return window.innerWidth <= 768;
    }

    var items = document.querySelectorAll('.sidebar-list .sidebar-item');

    if (!items.length) return;

    items.forEach(function (item) {
        var header = item.querySelector('.sidebar-item-header');
        if (!header) return;

        header.addEventListener('click', function (e) {

            /* ── Desktop: do nothing, let existing panel JS work ── */
            if (!isMobile()) return;

            /* Prevent link clicks inside header from triggering toggle */
            if (e.target.tagName === 'A') return;

            var isOpen = item.classList.contains('open');

            /* Close all items */
            items.forEach(function (other) {
                other.classList.remove('open', 'active');
            });

            /* If it was closed, open it now */
            if (!isOpen) {
                item.classList.add('open', 'active');
            }
        });
    });

    /* Re-evaluate on resize (e.g. rotating device) */
    window.addEventListener('resize', function () {
        if (!isMobile()) {
            /* On desktop resize: clear all open states so desktop is clean */
            items.forEach(function (item) {
                item.classList.remove('open');
            });
        }
    });

})();




(function () {

    function initShowMore() {

        if (!window.matchMedia('(max-width: 768px)').matches) return;

        var grid = document.querySelector('.categrious-grid');
        var showMoreCard = document.getElementById('showMoreCard');
        if (!grid || !showMoreCard) return;

        var allCards = Array.from(grid.querySelectorAll('.categrious-card'));
        var SHOW_COUNT = 7;

        // Hide cards after Finance on load
        allCards.forEach(function (card, i) {
            if (i >= SHOW_COUNT) card.classList.add('hidden-mobile');
        });

        // Move mobile-standout-banner outside grid after .categrious-section
        var mobileBanner = document.querySelector('.mobile-standout-banner');
        var catSection   = document.querySelector('.categrious-section');
        if (mobileBanner && catSection && catSection.parentNode) {
            catSection.parentNode.insertBefore(mobileBanner, catSection.nextSibling);
        }

        var isExpanded = false;

        showMoreCard.addEventListener('click', function () {
            isExpanded = !isExpanded;

            var label = showMoreCard.querySelector('.show-more-label');
           

            if (isExpanded) {

                // 1. First reveal all hidden cards
                allCards.forEach(function (card) {
                    card.classList.remove('hidden-mobile');
                });

                // 2. After revealing, move show-more card to the very end
                //    setTimeout ensures DOM has updated before we append
                setTimeout(function () {
                    grid.appendChild(showMoreCard);
                }, 0);

                label.textContent = 'Show less';
                

            } else {

                // 1. Hide cards after Finance
                allCards.forEach(function (card, i) {
                    if (i >= SHOW_COUNT) card.classList.add('hidden-mobile');
                });

                // 2. Move show-more card back next to Finance
                setTimeout(function () {
                    var refCard = allCards[SHOW_COUNT];
                    grid.insertBefore(showMoreCard, refCard);
                }, 0);

                label.textContent = 'Show more';
               

                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initShowMore);
    } else {
        initShowMore();
    }

})();


