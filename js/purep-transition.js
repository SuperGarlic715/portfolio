/* Blend WORK into the white featured project without moving its content. */
(() => {
  const work = document.querySelector('#work');
  const feature = document.querySelector('#purep-feature');
  if (!work || !feature || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo(work, { '--purep-blend': 0 }, {
      '--purep-blend': 1,
      ease: 'none',
      scrollTrigger: {
        trigger: feature,
        start: 'top bottom+=240',
        end: 'top 65%',
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });
  });
})();
