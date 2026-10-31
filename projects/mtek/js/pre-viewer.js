$(function () {
  $(".prd_viewer").each(function () {
    const $viewer = $(this);
    const $tabs = $viewer.find(".prd_tabs li");
    const $img = $viewer.find(".main_img");

    $tabs.click(function () {
      const newSrc = $(this).data("img");
      if ($img.attr("src") === newSrc) return;

      $tabs.removeClass("active").css("color", "#003365");
      $(this).addClass("active").css("color", "#fff");

      $img.addClass("fade");
      setTimeout(() => {
        $img.attr("src", newSrc);
        $img.removeClass("fade");
      }, 200);
    });
  });
});
