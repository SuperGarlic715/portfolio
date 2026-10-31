(function () {
  if (typeof Swiper === "undefined") return;

  const thumbs = new Swiper(".prdThumbs", {
    direction: "vertical",
    slidesPerView: 4,
    spaceBetween: 20,
    freeMode: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
    breakpoints: {
      0: { direction: "horizontal", slidesPerView: "auto", spaceBetween: 12 },
      1025: { direction: "vertical", slidesPerView: 4, spaceBetween: 20 }
    }
  });

  new Swiper(".prdMain", {
    speed: 400,
    thumbs: { swiper: thumbs }
  });
})();
