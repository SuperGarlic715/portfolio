/* Add future photography entries as { src: 'images/brand/photo.jpg', alt: '설명' }. */
(() => {
  const photographs = [];
  const dialog = document.querySelector('#purep-dialog');
  if (!dialog) return;
  const title = dialog.querySelector('h2');
  const body = dialog.querySelector('.purep-dialog-body');
  const gallery = dialog.querySelector('.purep-gallery');
  const detail = dialog.querySelector('.purep-detail');
  const website = dialog.querySelector('.purep-website');
  const footer = dialog.querySelector('footer');
  const photo = gallery.querySelector('img');
  const status = gallery.querySelector('[role="status"]');
  const controls = gallery.querySelector('.purep-gallery-controls');
  const frame = website.querySelector('iframe');
  const detailImage = detail.querySelector('img');
  let current = 0;
  let opener;
  let previousOverflow;
  let activeView;

  function showPhoto() {
    controls.hidden = photographs.length < 2;
    photo.hidden = true;
    status.textContent = photographs.length ? '이미지를 불러오는 중입니다.' : '이미지 준비중';
    if (!photographs.length) return;
    const item = photographs[current];
    photo.onload = () => { photo.hidden = false; status.textContent = ''; };
    photo.onerror = () => { photo.hidden = true; status.textContent = '이미지 준비중'; };
    photo.alt = item.alt || `PUREP 촬영 이미지 ${current + 1}`;
    photo.src = item.src;
    gallery.querySelector('.purep-gallery-count').textContent = `${current + 1} / ${photographs.length}`;
  }
  function step(direction) {
    if (!photographs.length) return;
    current = (current + direction + photographs.length) % photographs.length;
    showPhoto();
  }
  detailImage.addEventListener('error', () => {
    detailImage.hidden = true;
    detail.querySelector('[role="status"]').textContent = '이미지 준비중';
  });
  detailImage.addEventListener('load', () => {
    detailImage.hidden = false;
    detail.querySelector('[role="status"]').textContent = '';
  });
  document.querySelectorAll('[data-purep-view]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      activeView = button.dataset.purepView;
      gallery.hidden = activeView !== 'photography';
      detail.hidden = activeView !== 'detail';
      website.hidden = activeView !== 'website';
      footer.hidden = activeView !== 'detail';
      title.textContent = `PUREP · ${ { photography: 'Photography', detail: 'Detail Page', website: 'Website' }[activeView] }`;
      if (activeView === 'photography') { current = 0; showPhoto(); }
      if (activeView === 'website') frame.src = frame.dataset.src;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      body.scrollTop = 0;
    });
  });
  gallery.querySelectorAll('[data-gallery-step]').forEach(button => {
    button.addEventListener('click', () => step(Number(button.dataset.galleryStep)));
  });
  dialog.addEventListener('keydown', event => {
    if (activeView !== 'photography') return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  dialog.querySelector('.purep-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    frame.removeAttribute('src');
    photo.onload = photo.onerror = null;
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  });
})();
