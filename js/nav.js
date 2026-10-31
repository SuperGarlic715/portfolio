/* =========================================================
   nav.js : 헤더 메뉴
   - 768px 이하 메뉴 열기/닫기 (Esc, 바깥 클릭, 메뉴 클릭 시 닫힘)
   - 스크롤 위치에 맞춰 현재 섹션 메뉴 표시
   - 스크롤 시 헤더 구분선, 맨 위로 버튼
   ========================================================= */
(function () {
  const MOBILE_MAX = 768;
  const header = document.getElementById('header');
  const toggle = document.getElementById('menuToggle');
  const gnb = document.getElementById('gnb');
  const topBtn = document.querySelector('.top_btn');
  const links = [...gnb.querySelectorAll('.depth1 a')];

  // ---------- 모바일 메뉴 ----------
  function setMenu(open) {
    gnb.classList.toggle('open', open);
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr_only').textContent = open ? '메뉴 닫기' : '메뉴 열기';
  }

  toggle.addEventListener('click', () => setMenu(!gnb.classList.contains('open')));

  gnb.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gnb.classList.contains('open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (gnb.classList.contains('open') && !header.contains(e.target)) setMenu(false);
  });

  // PC 너비로 바뀌면 열린 상태 초기화
  let lastMobile = window.innerWidth <= MOBILE_MAX;
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth <= MOBILE_MAX;
    if (isMobile !== lastMobile) {
      setMenu(false);
      lastMobile = isMobile;
    }
  });

  // ---------- 스크롤 상태 ----------
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    topBtn.classList.toggle('show', y > window.innerHeight * 0.8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
    document.querySelector('.logo').focus({ preventScroll: true });
  });

  // ---------- 현재 섹션 메뉴 표시 ----------
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        links.forEach((a) => {
          const on = a.getAttribute('href') === id;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((s) => io.observe(s));
    // 첫 화면으로 돌아오면 표시 해제
    const hero = document.getElementById('top');
    if (hero) io.observe(hero);
  }
})();
