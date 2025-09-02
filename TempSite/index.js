/* Smooth anchor scroll for on-page links */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id=a.getAttribute('href');
    const el=document.querySelector(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

/* Nav micro-shift on scroll */
const nav = document.querySelector('.nav');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (!nav) return;
  if (y > 60 && y > lastY) {
    nav.style.transform = 'translateY(-10px)';
    nav.style.transition = 'transform .2s ease';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastY = y;
});

/* Scroll progress bar */
const bar = document.getElementById('scrollbar');
function setScrollBar(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  if (bar) bar.style.width = `${Math.max(0, Math.min(1, scrolled)) * 100}%`;
}
setScrollBar();
window.addEventListener('scroll', setScrollBar);
window.addEventListener('resize', setScrollBar);

/* Reveal-on-scroll */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .section-title, .about img, .lead').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* Copy email to clipboard + toast */
const emailLink = document.getElementById('emailLink');
const copyBtn   = document.getElementById('copyEmail');
const toast     = document.getElementById('toast');

function showToast(msg){
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

if (copyBtn && emailLink){
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailLink.textContent.trim());
      showToast('Email copied!');
    } catch {
      showToast('Could not copy. Long-press to copy.');
    }
  });
}
