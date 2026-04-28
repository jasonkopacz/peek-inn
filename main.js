'use strict';

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile burger ── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── Menu tabs ── */
document.querySelectorAll('.menu__tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu__tab').forEach(t => t.classList.remove('menu__tab--active'));
    document.querySelectorAll('.menu__panel').forEach(p => p.classList.remove('menu__panel--active'));
    tab.classList.add('menu__tab--active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('menu__panel--active');
  });
});

/* ── Scroll reveal ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.dog-card, .bite-row, .beer-card, .bottle-row, .cocktail-card, .event-card, .about__feature, .hours__card, .hours__map'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* ── Open / closed badge ── */
function updateBadge() {
  const badge = document.getElementById('open-badge');
  if (!badge) return;
  const now  = new Date();
  const day  = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;

  let open = false;
  if (day >= 1 && day <= 4) {        // Mon–Thu: 15–26 (2am next day)
    open = hour >= 15 || hour < 2;
  } else if (day === 5 || day === 6) { // Fri–Sat: 12–28 (4am next day)
    open = hour >= 12 || hour < 4;
  } else {                             // Sun: 12–26 (2am next day)
    open = hour >= 12 || hour < 2;
  }

  badge.textContent = open ? 'Open now' : 'Closed now';
  badge.classList.toggle('closed', !open);
}
updateBadge();

/* ── Hero parallax ── */
const heroBg = document.querySelector('.hero__bg');
if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight * 1.5) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    }
  }, { passive: true });
}
