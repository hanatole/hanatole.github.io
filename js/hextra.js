/* Hextra Theme JS */

/* ── THEME (defaults to dark) ──────────────────────────────── */
const root = document.documentElement;

function getTheme() {
  const stored = localStorage.getItem('hextra-theme');
  if (stored) return stored;
  return 'dark'; // Hextra defaults dark
}

function setTheme(t) {
  root.setAttribute('data-theme', t);
  localStorage.setItem('hextra-theme', t);
}

setTheme(getTheme());

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

/* ── MOBILE NAV ──────────────────────────────────────────────── */
const burger  = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
    mobileNav.setAttribute('aria-hidden', !open);
  });
  mobileNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileNav.classList.remove('is-open'))
  );
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !mobileNav.contains(e.target))
      mobileNav.classList.remove('is-open');
  });
}

/* ── NAV BORDER ON SCROLL ────────────────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 10
      ? 'var(--border-hover)'
      : 'var(--border)';
  }, { passive: true });
}

/* ── SCROLL FADE-IN ──────────────────────────────────────────── */
const fadeTargets = document.querySelectorAll(
  '.skill-card, .project-card, .post-card, .cert-card, .cert-stat'
);
if ('IntersectionObserver' in window && fadeTargets.length) {
  fadeTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = `opacity .4s ease ${i * 0.05}s, transform .4s ease ${i * 0.05}s`;
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  fadeTargets.forEach(el => io.observe(el));
}

/* ── CODE COPY BUTTONS ───────────────────────────────────────── */
document.querySelectorAll('.prose pre').forEach(pre => {
  const btn = document.createElement('button');
  btn.textContent = 'Copy';
  Object.assign(btn.style, {
    position: 'absolute', top: '10px', right: '10px',
    background: 'rgba(56,189,248,.1)', color: '#94a3b8',
    border: '1px solid rgba(56,189,248,.2)', borderRadius: '4px',
    padding: '3px 10px', fontSize: '.72rem', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'all .15s ease',
  });
  pre.style.position = 'relative';
  pre.appendChild(btn);
  btn.addEventListener('click', async () => {
    const code = pre.querySelector('code')?.textContent ?? pre.textContent;
    try {
      await navigator.clipboard.writeText(code.trim());
      btn.textContent = 'Copied!';
      btn.style.color = '#38bdf8';
      btn.style.borderColor = 'rgba(56,189,248,.5)';
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.style.color = '#94a3b8';
        btn.style.borderColor = 'rgba(56,189,248,.2)';
      }, 2000);
    } catch { btn.textContent = 'Error'; }
  });
});
