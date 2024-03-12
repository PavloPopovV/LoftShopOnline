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
  header.classList.toggle("sticky", scrollTop >= 50);
  header.classList.toggle("animation", scrollTop >= 200);
  headerCount.classList.toggle("color", scrollTop >= 200);
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
  const arrows = document.querySelectorAll(".carousel__arrow");

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
      nextEl: ".carousel__arrow--next",
      prevEl: ".carousel__arrow--prev",
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
});

document.addEventListener("DOMContentLoaded", () => {
  showOrHideSwiper();
  checkClassForHeaderOnLoad();
  changeFiltersOnLoad();
});

wrapper.addEventListener("scroll", function () {
  headerScroll();
});
