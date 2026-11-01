$(function () {
  const MOBILE_MAX = 1024;
  const $win = $(window);
  const $header = $('header').first();
  const $gnb = $('#gnb');

  // .depth2가 있는 .depth1에 has_sub 클래스 추가
  $('.depth1').each(function () {
    if ($(this).find('.depth2').length > 0) {
      $(this).addClass('has_sub');
    }
  });

  // 초기 상태: 모든 메뉴 닫기
  $('.depth1').removeClass('active');
  if (window.innerWidth <= MOBILE_MAX) {
    $('.depth2').hide();
  }

  // PC: .no_sub 이외의 .depth1 > a 클릭 방지
  $('.depth1 > a:not(.no_sub)').on('click', function (e) {
    if (window.innerWidth > MOBILE_MAX) {
      e.preventDefault();
    }
  });

  // 모바일 메뉴 토글 (#menuToggle만 사용하도록 통일)
  $('#menuToggle').on('click', function () {
    $(this).toggleClass('active');
    $gnb.toggleClass('open');
    updateHeaderState(); // 메뉴 열림/닫힘 직후 헤더 상태 반영
  });

  // 모바일 아코디언 메뉴
  $('.depth1 > a').on('click', function (e) {
    if (window.innerWidth <= MOBILE_MAX) {
      const $parent = $(this).parent();
      const $submenu = $(this).next('.depth2');

      if ($submenu.length > 0) {
        e.preventDefault();

        if ($parent.hasClass('active')) {
          $parent.removeClass('active');
          $submenu.stop().slideUp(250, updateHeaderState);
        } else {
          $parent.addClass('active');
          $submenu.stop().slideDown(250, updateHeaderState);
        }
      }
    }
  });

  $(document).on('click', function (e) {
    const $target = $(e.target);

    // 모바일 상태 + 메뉴 열림 상태에서만 체크
    if (window.innerWidth <= MOBILE_MAX && $gnb.hasClass('open')) {
      // 클릭한 요소가 메뉴 영역이나 토글 버튼 내부가 아닐 경우 닫기
      if (!$target.closest('#gnb').length && !$target.closest('#menuToggle').length) {
        $gnb.removeClass('open');
        $('#menuToggle').removeClass('active');
        updateHeaderState();
      }
    }
  });

  // 스크롤 시 (모바일 전용) 헤더 상태 갱신
  $win.on('scroll', function () {
    if (window.innerWidth > MOBILE_MAX) return;
    updateHeaderState();
  });

  // 창 크기 변경 시 메뉴/서브메뉴 상태 초기화
  $win.on('resize orientationchange', function () {
    if (window.innerWidth > MOBILE_MAX) {
      $gnb.removeClass('open');
      $('#menuToggle').removeClass('active');
      $('.depth2').removeAttr('style');
      $('.depth1').removeClass('active');
    } else {
      $('.depth2').hide();
      $('.depth1').removeClass('active');
    }
    updateHeaderState(); // 뷰포트 전환 시 상태 재반영
  });

  // header 상태 갱신
  function updateHeaderState() {
    const isMobile = window.innerWidth <= MOBILE_MAX;
    const scrolled = $win.scrollTop() > 50;
    const menuOpen = $gnb.hasClass('open');

    // 모바일에서: 스크롤되었거나 메뉴가 열려 있으면 흰 배경/로고 변경
    $header.toggleClass('scrolled', isMobile && (scrolled || menuOpen));
    
    $('#menuToggle').toggleClass('scrolled', isMobile && (scrolled || menuOpen));
  }

  // 초기 1회 실행
  updateHeaderState();
});


// Keep every desktop submenu and its background as tall as the longest list.
$(function () {
  const menu = document.querySelector('header .main_menu');
  if (!menu) return;
  const header = menu.closest('header');
  let frame;
  function updateMenuHeight() {
    if (window.innerWidth <= 1024) return;
    let height = 260;
    menu.querySelectorAll('.depth2').forEach(function (list) {
      const previousStyle = list.getAttribute('style');
      list.style.setProperty('display', 'block', 'important');
      list.style.setProperty('height', 'auto', 'important');
      list.style.setProperty('visibility', 'hidden', 'important');
      height = Math.max(height, Math.ceil(list.getBoundingClientRect().height));
      if (previousStyle === null) list.removeAttribute('style');
      else list.setAttribute('style', previousStyle);
    });
    header.style.setProperty('--mega-menu-height', height + 'px');
  }
  function scheduleUpdate() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(updateMenuHeight);
  }
  menu.addEventListener('pointerenter', updateMenuHeight);
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  new MutationObserver(scheduleUpdate).observe(menu, {childList: true, subtree: true, characterData: true});
  if (document.fonts) document.fonts.ready.then(scheduleUpdate);
  updateMenuHeight();
});
