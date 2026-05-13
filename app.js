/* ============================================================
   THE DISPATCH — RENDER + INTERACTIONS
   ============================================================ */

const TYPE_LABELS = {
  new:       { label: 'NEW',       cls: 't-new' },
  improved:  { label: 'IMPROVED',  cls: 't-improved' },
  fixed:     { label: 'FIXED',     cls: 't-fixed' },
  coming:    { label: 'COMING',    cls: 't-coming' },
  milestone: { label: 'MILESTONE', cls: 't-milestone' }
};

const SIZE_TO_CLASS = {
  sm:   'size-sm',
  md:   'size-md',
  lg:   'size-lg',
  wide: 'size-wide',
  tall: 'size-tall'
};

/* ---------- Card render ---------- */
function renderCard(card) {
  const type = TYPE_LABELS[card.type] || TYPE_LABELS.new;
  const sizeClass = SIZE_TO_CLASS[card.size] || 'size-md';
  const milestoneClass = card.type === 'milestone' ? ' is-milestone' : '';
  const placeholderClass = card.isPlaceholder ? ' is-placeholder' : '';

  const el = document.createElement('article');
  el.className = `card ${sizeClass}${milestoneClass}${placeholderClass}`;

  el.innerHTML = `
    <div class="card-head">
      <span class="card-type ${type.cls}">${type.label}</span>
      ${card.icon ? `<span class="card-icon" aria-hidden="true">${card.icon}</span>` : ''}
    </div>
    <div>
      <h3 class="card-title">${card.title}</h3>
      ${card.description ? `<p class="card-desc">${card.description}</p>` : ''}
    </div>
  `;

  /* Subtle cursor-tracked glow */
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', mx + '%');
    el.style.setProperty('--my', my + '%');
  });

  return el;
}

/* ---------- Edition render ---------- */
function renderEdition(edition, index, total) {
  const number = String(total - index).padStart(2, '0');

  const sec = document.createElement('section');
  sec.className = 'edition';
  sec.id = edition.id;
  sec.dataset.number = number;

  sec.innerHTML = `
    <div class="edition-head">
      <div class="edition-number">№${number}</div>
      <div class="edition-meta-row">
        <div class="edition-tags">
          ${edition.isLatest ? '<span class="edition-tag live"><span class="live-dot" style="width:6px;height:6px;background:currentColor;box-shadow:0 0 0 3px rgba(184,255,92,0.18);"></span>&nbsp;LIVE</span>' : ''}
          <span class="edition-tag">${edition.volume}</span>
          <span class="edition-tag">${edition.month} · ${edition.week}</span>
        </div>
        <h2 class="edition-headline">${edition.headline}</h2>
        <span class="edition-dates">${edition.dateRange}</span>
      </div>
    </div>
    ${edition.summary ? `<p class="edition-summary">${edition.summary}</p>` : ''}
  `;

  const bento = document.createElement('div');
  bento.className = 'bento';
  edition.updates.forEach((u) => bento.appendChild(renderCard(u)));
  sec.appendChild(bento);

  return sec;
}

/* ---------- Archive render ---------- */
function renderArchive(editions) {
  const list = document.getElementById('archiveList');
  list.innerHTML = '';
  editions.forEach((ed, i) => {
    const number = String(editions.length - i).padStart(2, '0');
    const li = document.createElement('li');
    li.className = 'archive-item';
    li.innerHTML = `
      <div class="archive-item-num">№${number}${ed.isLatest ? ' · LIVE' : ''}</div>
      <div class="archive-item-title">${stripEm(ed.headline)}</div>
      <div class="archive-item-date">${ed.dateRange}</div>
    `;
    li.addEventListener('click', () => {
      closeArchive();
      const target = document.getElementById(ed.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + ed.id);
    });
    list.appendChild(li);
  });
}

function stripEm(html) {
  return html.replace(/<\/?em>/g, '');
}

/* ---------- Hero meta ---------- */
function fillHeroMeta(editions) {
  const total = editions.length;
  const totalUpdates = editions.reduce((sum, e) => sum + e.updates.length, 0);
  const latest = editions[0];

  document.getElementById('editionCount').textContent = String(total).padStart(2, '0');
  document.getElementById('totalUpdates').textContent = String(totalUpdates).padStart(2, '0');
  document.getElementById('latestEditionLabel').textContent = `${latest.month} · ${latest.week}`;
  document.getElementById('navEditionLabel').textContent =
    `Edition ${String(total).padStart(2, '0')} · ${latest.month} ${latest.week}`;
}

/* ---------- Scroll reveal ---------- */
function setupReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('.edition').forEach((el) => obs.observe(el));
}

/* ---------- Archive open/close ---------- */
function openArchive() {
  document.getElementById('archivePanel').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeArchive() {
  document.getElementById('archivePanel').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ---------- Nav show/hide on scroll ---------- */
function setupNavBehavior() {
  const nav = document.getElementById('navPill');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 100) {
      nav.style.opacity = '0';
      nav.style.transform = 'translateX(-50%) translateY(-20px)';
    } else {
      nav.style.opacity = '1';
      nav.style.transform = 'translateX(-50%) translateY(0)';
    }
    lastY = y;
  }, { passive: true });
}

/* ---------- Parallax orbs ---------- */
function setupParallax() {
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth - 0.5);
    const cy = (e.clientY / window.innerHeight - 0.5);
    orbs.forEach((o, i) => {
      const depth = (i + 1) * 14;
      o.style.translate = `${cx * depth}px ${cy * depth}px`;
    });
  }, { passive: true });
}

/* ---------- Boot ---------- */
function boot() {
  const stream = document.getElementById('editionsStream');
  EDITIONS.forEach((ed, i) => {
    stream.appendChild(renderEdition(ed, i, EDITIONS.length));
  });

  fillHeroMeta(EDITIONS);
  renderArchive(EDITIONS);
  setupReveal();
  setupNavBehavior();
  setupParallax();

  document.getElementById('archiveBtn').addEventListener('click', openArchive);
  document.getElementById('archiveClose').addEventListener('click', closeArchive);
  document.getElementById('archiveShade').addEventListener('click', closeArchive);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeArchive();
  });

  /* Deep link support */
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
