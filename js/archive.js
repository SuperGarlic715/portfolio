/* Reveal the project archive in batches of six. All cards remain available without JS. */
(() => {
  const cards = [...document.querySelectorAll('.archive-item')];
  const button = document.querySelector('.archive-more');
  const progress = document.querySelector('.archive-progress');
  if (!button || !cards.length) return;
  let shown = 0;
  function reveal() {
    const previous = shown;
    shown = Math.min(shown + 6, cards.length);
    cards.forEach((card, index) => { card.hidden = index >= shown; });
    button.hidden = shown === cards.length;
    progress.textContent = `전체 ${cards.length}개 중 ${shown}개 프로젝트`;
    if (previous) {
      const first = cards[previous];
      first.setAttribute('tabindex', '-1');
      first.focus({ preventScroll: true });
      window.AOS?.refresh();
      window.ScrollTrigger?.refresh();
    }
  }
  button.addEventListener('click', reveal);
  reveal();
})();
