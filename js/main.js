/* =========================================================
   main.js
   1) 히어로 이름의 실제 렌더링 크기를 측정 칩에 표시
   2) 이메일 주소 복사
   3) 디자인 시안 이미지가 없으면 자리 안내 표시
   4) 아직 주소가 없는 링크(data-todo-link) 클릭 시 안내
   5) 제출 전 확인용 : 남은 .todo 개수를 콘솔에 출력
   ========================================================= */
(function () {
  const toastEl = document.querySelector('.toast');
  let toastTimer = null;

  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  // ---------- 1) 실측 칩 ----------
  const frame = document.querySelector('[data-measure]');
  if (frame) {
    const name = frame.querySelector('.hero_name');
    const outW = frame.querySelector('[data-w]');
    const outH = frame.querySelector('[data-h]');

    const measure = () => {
      const r = name.getBoundingClientRect();
      outW.textContent = Math.round(r.width);
      outH.textContent = Math.round(r.height);
    };

    measure();
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(name);
    else window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  }

  // ---------- 2) 이메일 복사 ----------
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        toast('이메일 주소를 복사했습니다.');
      } catch (err) {
        // 클립보드 권한이 없을 때 : 주소를 직접 선택할 수 있게 안내
        toast('복사하지 못했습니다. 주소를 길게 눌러 복사해 주세요.');
      }
    });
  });

  // ---------- 3) 시안 이미지 자리 ----------
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const figure = img.closest('figure');
    const file = img.getAttribute('src');
    const markEmpty = () => {
      figure.classList.add('is_empty');
      figure.setAttribute('data-empty', file + ' 파일을 넣으면 여기에 보입니다');
    };
    if (img.complete && img.naturalWidth === 0) markEmpty();
    img.addEventListener('error', markEmpty);
  });

  // ---------- 4) 주소가 아직 없는 링크 ----------
  document.querySelectorAll('[data-todo-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (a.getAttribute('href') === '#') {
        e.preventDefault();
        toast('링크 주소를 아직 넣지 않았습니다.');
      }
    });
  });

  // ---------- 미리보기용 단일 파일에서는 projects/, files/ 폴더가 없으므로 안내 ----------
  if (document.body.hasAttribute('data-preview')) {
    document.querySelectorAll('[data-demo], a[href^="files/"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        toast('미리보기에서는 열리지 않습니다. 배포하면 실제 파일로 연결됩니다.');
      });
    });
  }

  // ---------- 5) 제출 전 확인 ----------
  const todos = document.querySelectorAll('.todo, [data-todo-link][href="#"]');
  if (todos.length) {
    console.warn('[포트폴리오] 채워야 할 자리가 ' + todos.length + '곳 남아 있습니다.', todos);
  }
})();
