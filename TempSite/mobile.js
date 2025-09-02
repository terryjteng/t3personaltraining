// Sticky CTA: show after user scrolls a bit
const stickyCTA = document.querySelector('.sticky-cta');
function toggleStickyCTA(){
  if (!stickyCTA) return;
  const y = window.scrollY || document.documentElement.scrollTop;
  if (y > 260) stickyCTA.classList.add('show'); else stickyCTA.classList.remove('show');
}
toggleStickyCTA();
window.addEventListener('scroll', toggleStickyCTA);
window.addEventListener('resize', toggleStickyCTA);
