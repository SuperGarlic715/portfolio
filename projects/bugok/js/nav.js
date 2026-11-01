$(function () {
  const MOBILE_MAX = 1024;
  const $win = $(window);
  const $header = $('header').first();
  const $gnb = $('#gnb');
  const $toggle = $('#menuToggle');
  const $util = $('.util-wrap');

  // .depth2가 있는 .depth1에 has_sub 클래스 추가
  $('.depth1').each(function () {
    if ($(this).find('.depth2').length > 0) $(this).addClass('has_sub');
  });

  // 초기 상태: 모바일이면 서브메뉴 닫기
  $('.depth1').removeClass('active');
  if (window.innerWidth <= MOBILE_MAX) $('.depth2').hide();

  // PC: .no_sub 이외의 .depth1 > a 클릭 방지
  $('.depth1 > a:not(.no_sub)').on('click', function (e) {
    if (window.innerWidth > MOBILE_MAX) e.preventDefault();
  });

  // 토글 버튼: PC(메가 고정모드) + 모바일(드로어 open)
  $toggle.on('click', function () {
    const isMobile = window.innerWidth <= MOBILE_MAX;

    $(this).toggleClass('active');
    $header.toggleClass('mega-open');         // PC: 2뎁스 고정모드 토글
    if (isMobile) $gnb.toggleClass('open');   // 모바일만 드로어 열기/닫기

    updateHeaderState();
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

  // 바깥 클릭 닫기: 모바일 + 메뉴 열린 상태에서만
  $(document).on('click', function (e) {
    const $target = $(e.target);

    if (window.innerWidth <= MOBILE_MAX && $gnb.hasClass('open')) {
      if (!$target.closest('#gnb').length && !$target.closest('#menuToggle').length) {
        $gnb.removeClass('open');
        $toggle.removeClass('active');
        updateHeaderState();
      }
    }
  });

  // 스크롤 시: PC/모바일 모두 헤더 상태 갱신
  $win.on('scroll', function () {
    updateHeaderState();
  });

  // 창 크기 변경 시 메뉴/서브메뉴 상태 초기화
  $win.on('resize orientationchange', function () {
    const isMobile = window.innerWidth <= MOBILE_MAX;

    if (!isMobile) {
      // PC로 전환 시 모바일 드로어/아코디언 상태 정리
      $gnb.removeClass('open');
      $toggle.removeClass('active');
      $('.depth2').removeAttr('style');
      $('.depth1').removeClass('active');
    } else {
      // 모바일로 전환 시 서브메뉴 닫기
      $('.depth2').hide();
      $('.depth1').removeClass('active');
    }

    updateHeaderState();
  });

  // header / util 상태 갱신
  function updateHeaderState() {
    const isMobile = window.innerWidth <= MOBILE_MAX;
    const scrolled = $win.scrollTop() > 50;
    const menuOpen = $gnb.hasClass('open');
    const megaOpen = $header.hasClass('mega-open');

    // PC: 메가오픈일 때만 scrolled
    // 모바일: 스크롤 또는 드로어오픈 또는 메가오픈이면 scrolled
    const shouldScrolled = isMobile ? (megaOpen || scrolled || menuOpen) : megaOpen;

    $header.toggleClass('scrolled', shouldScrolled);
    $toggle.toggleClass('scrolled', shouldScrolled);
    $util.toggleClass('scrolled', shouldScrolled);
  }

  // 초기 1회 실행
  updateHeaderState();
});
