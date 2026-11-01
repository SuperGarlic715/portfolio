let eventSwiper;

function initEventSwiper() {
  if (eventSwiper) eventSwiper.destroy(true, true);

  eventSwiper = new Swiper('.event-swiper', {
    loop: true,
    speed: 600,
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: false,
    grabCursor: true,
    navigation: { nextEl: '.event_next', prevEl: '.event_prev' },
    breakpoints: {
      0: {slidesPerView: 1, spaceBetween: 14},
      768: {slidesPerView: 2, spaceBetween: 18},
      1240:{slidesPerView: 2, spaceBetween: 20},
    }
  });
}

initEventSwiper();
