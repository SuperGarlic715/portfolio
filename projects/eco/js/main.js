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
    autoplaySpeed: 4000,
    speed: 500,
    arrows: false,
    fade: true,
    infinite: true,
    pauseOnFocus: false,
    pauseOnHover: false,
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

  $(window).on("resize", function () {
    $slider.slick("setPosition");
  });

  // Product Slide (Slick)
  const $productDots = $('.product_progress li');

  $('.slick-wrap').slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000
  });
  
  // 슬라이드 전환 직전에 바 먼저 업데이트
  $('.slick-wrap').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $productDots.removeClass('active');
    $productDots.eq(nextSlide).addClass('active');
  });

  $('.slick-wrap').on('afterChange', function (event, slick, currentSlide) {
    $productDots.removeClass('active');
    $productDots.eq(currentSlide).addClass('active');
  });

  // 도트 클릭 시 이동
  $productDots.on('click', function () {
    const index = $(this).index();
    $('.slick-wrap').slick('slickGoTo', index);
  });

  //첫번째 도트에 초기 active 상태 표시
  $productDots.eq(0).addClass('active');
});