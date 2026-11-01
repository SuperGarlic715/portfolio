/* Darken the visual background progressively while entering the next section. */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  const hero = document.querySelector('.hero');
  const shade = hero?.querySelector('.hero-shade');
  if (!shade) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(shade, { opacity: 0 }, {
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        invalidateOnRefresh: true
      }
    });
  });
})();
