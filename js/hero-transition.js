/* Darken the visual background progressively while entering the next section. */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  const hero = document.querySelector('.hero');
  const shade = hero?.querySelector('.hero-shade');
  const about = document.querySelector('#about');
  if (!shade || !about) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        invalidateOnRefresh: true
      }
    });
    timeline.fromTo(shade, { opacity: 0 }, { opacity: 1 }, 0)
      .fromTo([hero, about], { '--about-transition-bg': '#ffffff' }, {
        '--about-transition-bg': '#0F151B'
      }, 0)
      .fromTo(about, { '--ink': '#16202A', '--muted': '#5A6774', '--line': '#D8DFE6' }, {
        '--ink': '#E7ECF1', '--muted': '#98A6B3', '--line': '#2B3743'
      }, 0);
  });
})();
