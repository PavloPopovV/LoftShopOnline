const wrapper = document.querySelector(".wrapper");

import {
  headerScroll,
  basketCount,
  checkClassForHeaderOnLoad,
} from "./modules/headerManipulation.js";
import { clickHandler } from "./handler/clickHandler.js";
import { calcFullPrice } from "./modules/orderCount.js";
import { renderEmptyBasketOrMakeOrdersList } from "./modules/cart.js";

//Swiper

function searchArrow(slider) {
  let arrowP, arrowN;

  if(slider.className.includes('action')){
    arrowP = document.querySelector('.action__arrow--prev')
    arrowN = document.querySelector('.action__arrow--next')
  }
  if(slider.className.includes('new')){
    arrowP = document.querySelector('.new__arrow--prev')
    arrowN = document.querySelector('.new__arrow--next')
  }
  if(slider.className.includes('like')){
    arrowP = document.querySelector('.like__btn--prev')
    arrowN = document.querySelector('.like__btn--next')
  }
  return [arrowP, arrowN]
}

function showOrHideSwiper() {
  const sliders = document.querySelectorAll(".swiper");
  const arrows = document.querySelectorAll(".btn-box");
  const wrapper = document.querySelector(".wrapper");

  if (wrapper.clientWidth < 760) {
    sliders.forEach((item) => {
      item.classList.remove("swiper");
      item.firstElementChild.classList.remove("swiper-wrapper");
    });
    arrows.forEach((arrow) => (arrow.style.display = "none"));
    return;
  }

  const breakpoints = {
    560: { slidesPerView: 3, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 20 },
    960: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  };

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".swiper-slide");
    if (slides.length >= 4) {
      const arrows = searchArrow(slider)
      

      const swiper = new Swiper(slider, {
        slidesPerView: 4,
        spaceBetween: 73,
        navigation: {
          nextEl: arrows[0],
          prevEl: arrows[1],
        },
        breakpoints: breakpoints,
      });
    } else {
      slider.classList.remove('swiper')
      slider.previousElementSibling.style.display = 'none'
      slider.nextElementSibling.style.display = 'none'
      slider.style.display = 'flex';
      slider.style.alignItems = 'flex-start';
    }
  });
}

document.addEventListener("click", clickHandler);
wrapper.addEventListener("scroll", headerScroll);

document.addEventListener("DOMContentLoaded", () => {
  basketCount();
  checkClassForHeaderOnLoad();
  showOrHideSwiper();

  if (document.querySelector(".orders")) {
    renderEmptyBasketOrMakeOrdersList();
    calcFullPrice();
  }
});
