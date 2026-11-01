$(document).ready(function () {
  //.depth2가 있는 .depth1에 has_sub 클래스 추가
  $('.depth1').each(function () {
    if ($(this).find('.depth2').length > 0) {
      $(this).addClass('has_sub');
    }
  });

  //초기 상태: 모든 메뉴 닫기
  $('.depth1').removeClass('active');
  if (window.innerWidth <= 1024) {
    $('.depth2').hide();
  }

  //스크롤 위치에 따라 header 상태 초기 설정
  const initialScrollTop = $(window).scrollTop();
  if (window.innerWidth > 1024 && initialScrollTop > 50) {
    $('header').addClass('scrolled');
  } else if (window.innerWidth <= 1024 && initialScrollTop > 50) {
    $('header').addClass('scroll-active');
    $('#gnb').addClass('scrolled scroll-active');
  }

  //스크롤 이벤트 - header 상태 변경
  $(window).on('scroll', function () {
    const scrollTop = $(window).scrollTop();

    if (window.innerWidth > 1024) {
      // PC: header 투명 → 컬러 변경
      if (scrollTop > 50) {
        $('header').addClass('scrolled');
      } else {
        $('header').removeClass('scrolled');
      }
    } else {
      // 모바일: 메뉴 열려있으면 스크롤 이벤트 무시
      if ($('#gnb').hasClass('open')) return;

      if (scrollTop > 50) {
        $('header').addClass('scroll-active');
        $('#gnb').addClass('scrolled scroll-active');
      } else {
        $('header').removeClass('scroll-active');
        $('#gnb').removeClass('scrolled');
      }
    }
  });

  //하위 메뉴가 있는 상위 항목은 화면 크기와 관계없이 링크 이동 방지
  $('.depth1 > a:not(.no_sub)').on('click', function (e) {
    e.preventDefault();
  });

  //모바일 메뉴 토글
  $('#menuToggle').click(function () {
    $('#menuToggle').toggleClass('active');
    $('#gnb').toggleClass('open');
  });

  //모바일 아코디언 메뉴
  $('.depth1 > a').on('click', function (e) {
    if (window.innerWidth <= 1024) {
      const $parent = $(this).parent();
      const $submenu = $(this).next('.depth2');

      if ($submenu.length > 0) {
        e.preventDefault();

        if ($parent.hasClass('active')) {
          $parent.removeClass('active');
          $submenu.stop().slideUp(250);
        } else {
          $parent.addClass('active');
          $submenu.stop().slideDown(250);
        }
      }
    }
  });

  //창 크기 변경 시 메뉴 상태 초기화
  $(window).on('resize', function () {
    if (window.innerWidth > 1024) {
      $('#gnb').removeClass('open');
      $('header').removeClass('scroll-active');
      $('#menuToggle').removeClass('active');
      $('.depth2').removeAttr('style');
      $('.depth1').removeClass('active');
    } else {
      $('.depth2').hide();
      $('.depth1').removeClass('active');
    }
  });
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
