$(function () {
  const $decade = $('.hs_decade');
  const $thumb = $('.hs_thumb_pic');
  const $title = $('.hs_desc_title');

  $(window).on('load scroll', function () {
    const ws = $(window).scrollTop();

    $decade.each(function (i) {
      const top = $(this).offset().top - 200;

      if (ws > top) {
        const key = $(this).data('key');
        const title = $(this).data('title');

        $thumb.removeClass('is-active')
              .filter('[data-key="' + key + '"]')
              .addClass('is-active');

        if (title) $title.text(title);
      }
    });
  });
});
