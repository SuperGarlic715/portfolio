/* Restore scroll-linked colors after tab suspension, bfcache and layout changes. */
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  let frame = 0;
  let refreshPending = false;
  function transitions() {
    return ScrollTrigger.getAll().filter(trigger =>
      trigger.trigger?.matches('.hero, #purep-feature') && trigger.animation
    );
  }
  function synchronize(refresh = false) {
    refreshPending ||= refresh;
    if (document.hidden || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      gsap.ticker.wake();
      if (refreshPending) {
        // Read the current scroll position before measuring after a suspended tab.
        ScrollTrigger.update();
        ScrollTrigger.refresh();
        refreshPending = false;
        ScrollTrigger.update();
        transitions().forEach(trigger => {
          const progress = trigger.progress;
          trigger.getTween()?.pause();
          trigger.animation.totalProgress(progress);
        });
      } else {
        ScrollTrigger.update();
        // A quick return to either end must not leave an old scrub value visible.
        transitions().forEach(trigger => {
          if (trigger.progress === 0 || trigger.progress === 1) {
            trigger.getTween()?.pause();
            trigger.animation.totalProgress(trigger.progress);
          }
        });
      }
    });
  }
  window.addEventListener('scroll', () => synchronize(), { passive: true });
  window.addEventListener('pageshow', () => synchronize(true));
  window.addEventListener('focus', () => synchronize(true));
  window.addEventListener('resize', () => synchronize(true));
  window.addEventListener('load', () => synchronize(true));
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) synchronize(true);
  });
  document.fonts?.ready.then(() => synchronize(true));
  synchronize(true);
})();
