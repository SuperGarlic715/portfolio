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
    if (open) header.classList.remove('header-hidden');
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

  // ---------- 히어로 아래로 스크롤 ----------
  const scrollDown = document.querySelector('.hero .scroll');
  if (scrollDown) {
    scrollDown.addEventListener('click', (e) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      const target = document.querySelector(scrollDown.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
      history.replaceState(null, '', scrollDown.getAttribute('href'));
    });
  }

  // ---------- 스크롤 상태 ----------
  let previousScrollY = Math.max(0, window.scrollY);
  function onScroll() {
    const y = Math.max(0, window.scrollY);
    const delta = y - previousScrollY;
    if (y <= header.offsetHeight || gnb.classList.contains('open')) {
      header.classList.remove('header-hidden');
    } else if (Math.abs(delta) >= 2) {
      header.classList.toggle('header-hidden', delta > 0);
    }
    if (Math.abs(delta) >= 2 || y === 0) previousScrollY = y;
    header.classList.toggle('scrolled', y > 8);
    topBtn.classList.toggle('show', y > 50);
  }
  let scrollFramePending = false;
  window.addEventListener('scroll', () => {
    if (scrollFramePending) return;
    scrollFramePending = true;
    requestAnimationFrame(() => {
      onScroll();
      scrollFramePending = false;
    });
  }, { passive: true });
  onScroll();
  header.addEventListener('focusin', () => header.classList.remove('header-hidden'));
  window.addEventListener('pageshow', () => {
    previousScrollY = Math.max(0, window.scrollY);
    header.classList.remove('header-hidden');
    onScroll();
  });

  topBtn.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' });
    document.querySelector('.logo').focus({ preventScroll: true });
  });

  // ---------- 현재 섹션 메뉴 표시 ----------
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  // The featured case study continues the WORK section.
  const featuredProject = document.getElementById('purep-feature');
  if (featuredProject) sections.push(featuredProject);

  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id === 'purep-feature' ? '#work' : '#' + entry.target.id;
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
