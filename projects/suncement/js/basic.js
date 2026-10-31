$(function(){
  var BP=1024, lastIsMobile=null, rszTimer=null;

  function clearInline(sel){
    // jQuery 객체를 반환하면 체이닝 가능
    return $(sel).removeAttr('style');
  }

  function resetDesktop(){
    $('#gnb').removeClass('open scrolled scroll-active');
    $('#menuToggle').removeClass('active');
    $('html, body').removeClass('nav-open');
    $('.depth1').removeClass('active');
    clearInline('.depth2');                // 체이닝 없음
    $('.header').removeClass('scroll-active scrolled');
  }

  function resetMobile(){
    $('#gnb').removeClass('open scrolled scroll-active');
    $('#menuToggle').removeClass('active');
    $('html, body').removeClass('nav-open');
    $('.depth1').removeClass('active');
    clearInline('.depth2').hide();         // 체이닝 OK
    $('.header').removeClass('scrolled');
  }

  var isMobile=$(window).width()<=BP;
  isMobile?resetMobile():resetDesktop();
  lastIsMobile=isMobile;

  $(window).on('resize orientationchange',function(){
    clearTimeout(rszTimer);
    rszTimer=setTimeout(function(){
      var m=$(window).width()<=BP;
      if(m!==lastIsMobile){
        m?resetMobile():resetDesktop();
        lastIsMobile=m;
      }
    },120);
  });
});
