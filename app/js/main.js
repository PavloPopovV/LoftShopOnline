const wrapper = document.querySelector(".wrapper");

import { headerScroll } from "./modules/headerAnimation.js";
import { checkClassForHeaderOnLoad } from "./modules/headerAnimation.js";
import { clickHandler } from "./handler/clickHandler.js";
import { calcFullPrice } from "./modules/orderCount.js";


//Swiper
function showOrHideSwiper() {
  const sliders = document.querySelectorAll(".swiper");
  const arrows = document.querySelectorAll(".btn-box");

  if (wrapper.clientWidth < 760) {
    sliders.forEach((item) => {
      item.classList.remove("swiper");
      item.firstElementChild.classList.remove("swiper-wrapper");
    });
    arrows.forEach((arrow) => (arrow.style.display = "none"));
    return;
  }

  const swiper = new Swiper(".action__swiper", {
    slidesPerView: 4,
    spaceBetween: 73,
    navigation: {
      nextEl: ".action__arrow--next",
      prevEl: ".action__arrow--prev",
    },

    breakpoints: {
      560: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      960: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

  const swiperNew = new Swiper(".new__swiper", {
    slidesPerView: 4,
    spaceBetween: 73,
    navigation: {
      nextEl: ".new__arrow--next",
      prevEl: ".new__arrow--prev",
    },

    breakpoints: {
      560: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      960: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

  const swiperLike = new Swiper(".like__swiper", {
    slidesPerView: 4,
    spaceBetween: 73,
    navigation: {
      nextEl: ".like__btn--next",
      prevEl: ".like__btn--prev",
    },

    breakpoints: {
      560: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      960: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

document.addEventListener("click", clickHandler);

document.addEventListener("DOMContentLoaded", () => {
  checkClassForHeaderOnLoad();
  showOrHideSwiper();
  calcFullPrice()
});

wrapper.addEventListener("scroll", headerScroll);

