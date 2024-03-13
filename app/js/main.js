const wrapper = document.querySelector(".wrapper");
const header = document.querySelector(".header");
const headerCount = document.querySelector(".basket-count-js");
const bigGroup = document.querySelector(".product__big-group");

function changeSliderPhoto(item) {
  if (item.tagName === "VIDEO") {
    bigGroup.innerHTML = `<video class="product__big-img" src="${item.src}" controls></video>`;
  } else {
    bigGroup.innerHTML = `<img class="product__big-img" src="${item.src}" loading="lazy">`;
  }
}

function changeHeaderTextColorWhite(className) {
  const productPageHeader = document.querySelectorAll(className);
  [...productPageHeader].forEach((btn) => btn.classList.add("inner-header"));
}

function headerScroll() {
  const scrollTop = wrapper.scrollTop;
  header.classList.toggle("sticky", scrollTop >= 20);
  header.classList.toggle("animation", scrollTop >= 400);
}

function checkClassForHeaderOnLoad() {
  if (document.querySelector(".inner-page") !== null) {
    changeHeaderTextColorWhite(".header__btn");
    changeHeaderTextColorWhite(".header__logo");
    changeHeaderTextColorWhite(".header__media-btn");
    changeHeaderTextColorWhite(".header__burger");
  }
}

function showOrHideSwiper() {
  const url = document.location.pathname;
  console.log(url);
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
}

function orderCount(target) {
  const input = target.closest(".order__count").querySelector(".order__input");
  let value = input.value;

  if (target.className.includes("plus")) {
    input.value = ++value;
    return;
  }
  if (target.className.includes("minus") && +value - 1 > 0) {
    input.value = --value;
    return;
  }
}

document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("header__burger")) {
    document.querySelector(".mobile").classList.add("active");
  }
  if (target.classList.contains("mobile__close")) {
    document.querySelector(".mobile").classList.remove("active");
  }
  if (target.classList.contains("product__description-btn")) {
    target.classList.toggle("active");
    document
      .querySelector(".product__description-text")
      .classList.toggle("active");
    document.querySelector(".product__description").classList.toggle("active");
  }
  if (target.classList.contains("product__small")) {
    changeSliderPhoto(target);
  }
  if (target.classList.contains("js-add__subcategories")) {
    target.classList.toggle("active");
    target.nextElementSibling.classList.toggle("show");
  }
  if (
    target.classList.contains("filters__close") ||
    target.classList.contains("catalog__open")
  ) {
    document.querySelector(".filters").classList.toggle("show");
  }
  if (target.classList.contains("catalog__input")) {
    document.querySelector(".search-popup").classList.toggle("show");
  }
  if (target.classList.contains("order__count-btn")) {
    orderCount(target);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showOrHideSwiper();
  checkClassForHeaderOnLoad();
});

wrapper.addEventListener("scroll", function () {
  headerScroll();
});
