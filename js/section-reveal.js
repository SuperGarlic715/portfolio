/* Fade section contents without changing the full-width background transitions. */
(() => {
  if (!window.AOS) return;
  const sections = [...document.querySelectorAll('main > .section_area > .inner')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function updateMotion() {
    sections.forEach(section => {
      if (reducedMotion.matches) {
        section.removeAttribute('data-aos');
        section.classList.remove('aos-init', 'aos-animate');
      } else {
        section.setAttribute('data-aos', 'fade-up');
      }
    });
    AOS.refreshHard();
  }
  sections.forEach(section => {
    if (!reducedMotion.matches) section.setAttribute('data-aos', 'fade-up');
  });
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    offset: 80,
    once: false,
    mirror: true
  });
  reducedMotion.addEventListener('change', updateMotion);
  window.addEventListener('load', () => AOS.refresh());
})();
