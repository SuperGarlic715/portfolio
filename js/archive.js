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
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cards.slice(previous, shown).forEach((card, index) => {
          card.animate([
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], {
            duration: 450,
            delay: index * 65,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'backwards'
          });
        });
      }
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

/* Image previews for projects without public links. */
(() => {
  const dialog = document.querySelector('#archive-preview');
  if (!dialog) return;
  const image = dialog.querySelector('.archive-preview-image');
  const message = dialog.querySelector('.archive-preview-message');
  let opener;
  let overflow;
  document.querySelectorAll('[data-archive-preview]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      const title = button.dataset.previewTitle;
      const src = button.dataset.archivePreview;
      dialog.querySelector('h2').textContent = title;
      image.hidden = true;
      image.removeAttribute('src');
      image.alt = `${title} 상세 작업물`;
      message.textContent = src ? '이미지를 불러오는 중입니다.' : '작업물 이미지를 준비 중입니다. 이미지가 등록되면 이곳에서 확인할 수 있습니다.';
      if (src) {
        image.onload = () => { image.hidden = false; message.textContent = ''; };
        image.onerror = () => { image.hidden = true; message.textContent = '이미지를 불러오지 못했습니다. 창을 닫고 다시 시도해 주세요.'; };
        image.src = src;
      }
      overflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.querySelector('.archive-preview-body').scrollTop = 0;
      dialog.showModal();
    });
  });
  dialog.querySelector('.archive-preview-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    image.onload = image.onerror = null;
    document.body.style.overflow = overflow;
    opener?.focus({ preventScroll: true });
  });
})();
