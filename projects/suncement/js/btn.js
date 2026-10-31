$(function () {
  const $btn = $('.top_btn');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $btn.css({ opacity: 1, visibility: 'visible' });
    }
    else {
      $btn.css({ opacity: 0, visibility: 'hidden' });
    }
  });

  $btn.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
    return false;
  });
});