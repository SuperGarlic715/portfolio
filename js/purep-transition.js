/* Transition both sections together so the spacer never becomes a separate panel. */
(() => {
  const work = document.querySelector('#work');
  const feature = document.querySelector('#purep-feature');
  if (!work || !feature || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add({
    motion: '(prefers-reduced-motion: no-preference)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)'
  }, context => {
    if (!context.conditions.motion) return;
    const body = getComputedStyle(document.body);
    const source = {
      background: body.backgroundColor,
      ink: body.getPropertyValue('--ink').trim(),
      muted: body.getPropertyValue('--muted').trim(),
      line: body.getPropertyValue('--line').trim(),
      surface: body.getPropertyValue('--surface').trim(),
      paper: body.getPropertyValue('--paper').trim()
    };
    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: feature,
        start: () => feature.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4 - Math.max(parseFloat(getComputedStyle(work).paddingBottom) * 0.55, window.innerHeight * 0.9),
        end: () => feature.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4,
        scrub: 1.6,
        invalidateOnRefresh: true
      }
    });
    timeline.fromTo([work, feature], { '--work-feature-bg': source.background }, {
      '--work-feature-bg': '#f7f7f5'
    }, 0).fromTo(work, {
      '--ink': source.ink, '--muted': source.muted, '--line': source.line,
      '--surface': source.surface, '--paper': source.paper
    }, {
      '--ink': '#232323', '--muted': '#232323', '--line': '#d8dfe6',
      '--surface': '#ffffff', '--paper': '#f7f7f5'
    }, 0);
  });
})();
