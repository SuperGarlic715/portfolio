/* Keep the WORK spacer clear, then fade it to white as PUREP approaches. */
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
        start: () => feature.getBoundingClientRect().top + window.scrollY - window.innerHeight - parseFloat(getComputedStyle(work).paddingBottom) * 0.55,
        end: () => feature.getBoundingClientRect().top + window.scrollY - window.innerHeight,
        scrub: 0.8,
        invalidateOnRefresh: true
      }
    });
  });
})();
