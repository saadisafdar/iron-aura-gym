/* ═══════════════════════════════════════════════════════════
   SCROLL RESTORATION
   ═══════════════════════════════════════════════════════════ */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/* ═══════════════════════════════════════════════════════════
   SCHEDULE DATA
   ═══════════════════════════════════════════════════════════ */
const SCHEDULE = {
  mon: [
    { time: '06:00 AM - 07:00 AM', name: 'Heavy Iron Lifting', coach: 'Marcus Vance', intensity: 'High', spots: '3 Spots Left' },
    { time: '09:00 AM - 10:00 AM', name: 'Mobility & Recovery', coach: 'Viktor Reed', intensity: 'All Levels', spots: 'Open' },
    { time: '12:00 PM - 01:00 PM', name: 'Combat Conditioning', coach: 'David Miller', intensity: 'Advanced', spots: '2 Spots Left' },
    { time: '05:30 PM - 06:30 PM', name: 'Metabolic HIIT', coach: 'Alex Mercer', intensity: 'High', spots: '4 Spots Left' },
  ],
  tue: [
    { time: '07:00 AM - 08:00 AM', name: 'Metabolic HIIT', coach: 'Alex Mercer', intensity: 'High', spots: '5 Spots Left' },
    { time: '10:00 AM - 11:00 AM', name: 'Powerlifting Fundamentals', coach: 'Marcus Vance', intensity: 'All Levels', spots: 'Open' },
    { time: '05:00 PM - 06:00 PM', name: 'Boxing & Striking', coach: 'David Miller', intensity: 'High', spots: '2 Spots Left' },
    { time: '07:00 PM - 08:00 PM', name: 'Mobility & Recovery', coach: 'Viktor Reed', intensity: 'All Levels', spots: 'Open' },
  ],
  wed: [
    { time: '06:00 AM - 07:00 AM', name: 'Heavy Iron Lifting', coach: 'Marcus Vance', intensity: 'High', spots: '4 Spots Left' },
    { time: '09:00 AM - 10:00 AM', name: 'Joint Mobility', coach: 'Viktor Reed', intensity: 'All Levels', spots: 'Open' },
    { time: '12:00 PM - 01:00 PM', name: 'Metabolic HIIT', coach: 'Alex Mercer', intensity: 'High', spots: 'Open' },
    { time: '06:00 PM - 07:00 PM', name: 'Boxing & Striking', coach: 'David Miller', intensity: 'High', spots: '1 Spot Left' },
  ],
  thu: [
    { time: '07:00 AM - 08:00 AM', name: 'Heavy Iron Lifting', coach: 'Marcus Vance', intensity: 'High', spots: '3 Spots Left' },
    { time: '10:00 AM - 11:00 AM', name: 'Athletic Movement', coach: 'Alex Mercer', intensity: 'Medium', spots: 'Open' },
    { time: '05:30 PM - 06:30 PM', name: 'Joint Mobility', coach: 'Viktor Reed', intensity: 'All Levels', spots: 'Open' },
    { time: '07:00 PM - 08:00 PM', name: 'Combat Conditioning', coach: 'David Miller', intensity: 'Advanced', spots: '2 Spots Left' },
  ],
  fri: [
    { time: '06:00 AM - 07:00 AM', name: 'Heavy Iron Lifting', coach: 'Marcus Vance', intensity: 'High', spots: '2 Spots Left' },
    { time: '09:00 AM - 10:00 AM', name: 'Mobility & Recovery', coach: 'Viktor Reed', intensity: 'All Levels', spots: 'Open' },
    { time: '12:00 PM - 01:00 PM', name: 'Combat Conditioning', coach: 'David Miller', intensity: 'High', spots: 'Filling Fast' },
    { time: '05:00 PM - 06:00 PM', name: 'Powerlifting Fundamentals', coach: 'Marcus Vance', intensity: 'All Levels', spots: 'Open' },
  ],
  sat: [
    { time: '08:00 AM - 09:00 AM', name: 'Weekend Heavy Strength', coach: 'Marcus Vance', intensity: 'High', spots: 'Open' },
    { time: '09:30 AM - 10:30 AM', name: 'Athletic Movement', coach: 'Alex Mercer', intensity: 'Medium', spots: '4 Spots Left' },
    { time: '11:00 AM - 12:00 PM', name: 'Full Body Mobility', coach: 'Viktor Reed', intensity: 'All Levels', spots: 'Open' },
    { time: '12:30 PM - 01:30 PM', name: 'Boxing & Striking', coach: 'David Miller', intensity: 'High', spots: '3 Spots Left' },
  ],
  sun: [
    { time: '09:00 AM - 10:00 AM', name: 'Mobility & Recovery', coach: 'Viktor Reed', intensity: 'All Levels', spots: 'Open' },
    { time: '10:00 AM - 11:30 AM', name: 'Open Gym & Recovery', coach: 'Alex Mercer', intensity: 'All Levels', spots: 'Open' },
    { time: '12:00 PM - 01:00 PM', name: 'Combat Conditioning', coach: 'David Miller', intensity: 'Advanced', spots: '2 Spots Left' },
    { time: '02:00 PM - 03:00 PM', name: 'Heavy Iron Lifting', coach: 'Marcus Vance', intensity: 'High', spots: '5 Spots Left' },
  ],
};

/* ═══════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderSchedule('mon');
  initTabs();
  initScrollReveal();
  restoreBillingState();
  updateStatus();
  setInterval(updateStatus, 60000);
});

/* ═══════════════════════════════════════════════════════════
   HERO SCROLL-TRIGGERED REVEAL
   ═══════════════════════════════════════════════════════════ */
function updateScrollState() {
  if (window.scrollY > 20) {
    document.body.classList.add('is-scrolled');
  } else {
    document.body.classList.remove('is-scrolled');
  }
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  document.body.classList.remove('is-scrolled');
});

window.addEventListener('scroll', updateScrollState, { passive: true });
window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    document.body.classList.add('is-scrolled');
  } else if (window.scrollY <= 10 && e.deltaY < 0) {
    document.body.classList.remove('is-scrolled');
  }
}, { passive: true });

/* ═══════════════════════════════════════════════════════════
   SCHEDULE TABS
   ═══════════════════════════════════════════════════════════ */
function initTabs() {
  document.querySelectorAll('.sched-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sched-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.schedule-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const day = tab.dataset.day;
      const panel = document.getElementById('panel-' + day);
      if (panel) {
        renderSchedule(day);
        panel.classList.add('active');
      }
    });
  });
}

function renderSchedule(day) {
  const classes = SCHEDULE[day];
  const panel = document.getElementById('panel-' + day);
  if (!panel || !classes) return;

  panel.innerHTML = '<div class="sched-list">' + classes.map(c => `
    <div class="class-card">
      <div class="class-time">${c.time}</div>
      <div class="class-name">${c.name}</div>
      <div class="class-coach">${c.coach}</div>
      <div class="class-meta">
        <span class="class-intensity">${c.intensity}</span>
        <span class="class-status status-${spotsClass(c.spots)}">${c.spots}</span>
      </div>
    </div>
  `).join('') + '</div>';
}

function spotsClass(spots) {
  if (/spots? left/i.test(spots)) return 'limited';
  if (/filling/i.test(spots)) return 'full';
  return 'open';
}

/* ═══════════════════════════════════════════════════════════
   BILLING TOGGLE
   ═══════════════════════════════════════════════════════════ */
let isAnnual = false;
const BILLING_STORAGE_KEY = 'ironAuraBillingMode';

function setBillingState(annual) {
  isAnnual = annual;
  const toggle = document.getElementById('billingToggle');
  const lblMo = document.getElementById('lblMonthly');
  const lblAn = document.getElementById('lblAnnual');
  const pill = document.getElementById('savePill');

  if (toggle) toggle.classList.toggle('on', isAnnual);
  if (lblMo) lblMo.classList.toggle('active', !isAnnual);
  if (lblAn) lblAn.classList.toggle('active', isAnnual);
  if (pill) pill.classList.toggle('show', isAnnual);

  document.querySelectorAll('.price-value').forEach(el => {
    const current = parseInt(el.textContent, 10) || parseInt(el.dataset.mo, 10);
    const to = isAnnual ? parseInt(el.dataset.an, 10) : parseInt(el.dataset.mo, 10);
    animatePrice(el, current, to, 300);
  });

  localStorage.setItem(BILLING_STORAGE_KEY, isAnnual ? 'annual' : 'monthly');
}

function restoreBillingState() {
  const saved = localStorage.getItem(BILLING_STORAGE_KEY);
  setBillingState(saved === 'annual');
}

function toggleBilling() {
  setBillingState(!isAnnual);
}

function animatePrice(el, from, to, dur) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
   ═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   DRAWER (MODAL)
   ═══════════════════════════════════════════════════════════ */
let lastFocusedElement = null;

function openDrawer(planName = '7-DAY PASS') {
  const overlay = document.getElementById('drawerOverlay');
  const drawer = document.getElementById('drawer');
  const form = document.getElementById('drawerForm');
  const success = document.getElementById('drawerSuccess');
  const planValue = document.getElementById('drawerPlanName');
  const planButtonValue = document.getElementById('drawerPlanButtonName');

  lastFocusedElement = document.activeElement;
  const selectedPlan = String(planName || '7-DAY PASS').toUpperCase();

  if (planValue) planValue.textContent = selectedPlan;
  if (planButtonValue) planButtonValue.textContent = selectedPlan;

  if (overlay) overlay.classList.add('open');
  if (overlay) overlay.setAttribute('aria-hidden', 'false');
  if (drawer) drawer.setAttribute('aria-hidden', 'false');
  if (form) form.style.display = '';
  if (success) success.classList.remove('show');
  document.body.style.overflow = 'hidden';

  const input = document.getElementById('d-name');
  setTimeout(() => input?.focus(), 250);
}

function closeDrawer() {
  const overlay = document.getElementById('drawerOverlay');
  const drawer = document.getElementById('drawer');

  if (overlay) overlay.classList.remove('open');
  if (overlay) overlay.setAttribute('aria-hidden', 'true');
  if (drawer) drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function handleClaim(e) {
  e.preventDefault();
  const form = e.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  document.getElementById('drawerForm').style.display = 'none';
  document.getElementById('drawerSuccess').classList.add('show');
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'drawerOverlay') closeDrawer();
});
document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('drawerOverlay');

  if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
    closeDrawer();
  }

  if (e.key === 'Tab' && overlay && overlay.classList.contains('open')) {
    const drawer = document.getElementById('drawer');
    const focusable = drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* ═══════════════════════════════════════════════════════════
   MOBILE NAV
   ═══════════════════════════════════════════════════════════ */
function toggleMobile() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const isActive = mobileMenu.classList.toggle('active');
  hamburger.classList.toggle('active', isActive);
  hamburger.setAttribute('aria-expanded', String(isActive));
}
function closeMobile() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}

/* ═══════════════════════════════════════════════════════════
   STUDIO STATUS
   ═══════════════════════════════════════════════════════════ */
function updateStatus() {
  const now = new Date();
  const h = now.getHours();
  const d = now.getDay();
  const period = document.getElementById('statusPeriod');
  const dot = document.querySelector('.status-live-dot');
  const text = document.querySelector('.status-live-text');
  if (!period) return;

  const closed = d === 0 && h < 7;
  const peak = (h >= 17 && h <= 19) || (h >= 7 && h <= 9);

  if (closed) {
    text.textContent = 'STUDIO CLOSED';
    text.style.color = '#f87171';
    period.textContent = '';
    dot.style.background = '#f87171';
    dot.style.animation = 'none';
  } else {
    text.textContent = 'STUDIO OPEN';
    text.style.color = '#4ade80';
    period.textContent = peak ? 'PEAK CAPACITY' : 'OFF-PEAK';
    dot.style.background = '#22c55e';
    dot.style.animation = '';
  }
}

/* ═══════════════════════════════════════════════════════════
   HERO VIDEO FORCE-PLAY
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('hero-video');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch((err) => {
      console.warn('Autoplay error:', err);
      const startVideo = () => {
        video.play();
        window.removeEventListener('click', startVideo);
        window.removeEventListener('touchstart', startVideo);
        window.removeEventListener('scroll', startVideo);
      };
      window.addEventListener('click', startVideo);
      window.addEventListener('touchstart', startVideo);
      window.addEventListener('scroll', startVideo);
    });
  }
});
