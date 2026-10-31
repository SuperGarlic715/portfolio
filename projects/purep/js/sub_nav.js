const navDepths = document.querySelectorAll('.sub_nav .nav_depth');

navDepths.forEach(depth => {
  depth.addEventListener('click', e => {
    const isActive = depth.classList.contains('active');

    // 모든 다른 메뉴 닫기
    navDepths.forEach(d => {
      if (d !== depth) {
        d.classList.remove('active');
        const otherUl = d.querySelector('ul');
        if (otherUl) {
          otherUl.style.maxHeight = '0px';
          otherUl.style.opacity = '0';
          otherUl.style.pointerEvents = 'none';
        }
      }
    });

    const submenu = depth.querySelector('ul');

    if (!isActive) {
      // 열기
      depth.classList.add('active');
      submenu.style.maxHeight = '300px';
      submenu.style.opacity = '1';
      submenu.style.pointerEvents = 'auto';
    } else {
      // 닫기 → 부드럽게 애니메이션 후 제거
      submenu.style.maxHeight = '0px';
      submenu.style.opacity = '0';
      submenu.style.pointerEvents = 'none';

      setTimeout(() => {
        depth.classList.remove('active');
        submenu.removeAttribute('style');
      }, 300); // CSS transition 시간과 일치
    }
  });
});
