$(document).ready(function () {
  // Visual Slide (Slick)
  const $slider = $(".slider");
  const $progress = $(".visual_progress > li");

  // 초기화 시 첫 진행바 활성화
  $slider.on("init", function () {
    $progress.eq(0).addClass("active");
  });

  // Slick 초기화
  $slider.slick({
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1600,
    cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
    arrows: false,
    fade: true,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false
  });

  // 슬라이드 변경 시 진행바 동기화
  $slider.on("beforeChange", function (event, slick, current, next) {
    $progress.removeClass("active");
    $progress.eq(next).addClass("active");
  });

  // 진행바 클릭 시 슬라이드 이동
  $progress.on("click", function () {
    const index = $(this).index();
    if (!$(this).hasClass("active")) {
      $slider.slick("slickGoTo", index);
    }
  });

  // 리사이즈 시 slick 재정렬
  $(window).on("resize", function () {
    $slider.slick("setPosition");
  });
});