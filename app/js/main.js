const wrapper = document.querySelector(".wrapper");
const header = document.querySelector(".header");
const headerCount = document.querySelector(".basket-count-js");
const bigGroup = document.querySelector(".product__big-group");
const popup = document.querySelector(".popup");
const termsBtns = document.querySelectorAll(".terms__btn");
const termsDescription = document.querySelectorAll(".terms__decription");
const termItems = document.querySelectorAll(".terms__item");

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
  if (target.classList.contains("popup__close")) {
    wrapper.classList.remove("lock");
    popup.classList.remove("show");
  }
  if (target.classList.contains("basket-js")) {
    wrapper.classList.add("lock");
    popup.querySelector("h3").innerHTML = "Товар доданий до кошика";
    popup.querySelector("p").innerHTML =
      "Продовжуйте шопінг або перегляньте ваш кошик";
    popup.classList.add("show");
  }
  if (target.classList.contains("promotion-form__btn")) {
    wrapper.classList.add("lock");
    popup.querySelector("h3").innerHTML = "Дякуємо за вашу зацікавленість";
    popup.querySelector("p").innerHTML =
      "Ми будемо повідомляти вас про нові товари, акції та інші цікаві події.";
    popup.classList.add("show");
  }

  if (target.classList.contains("terms__btn")) {
    termsTabs(target)
    target.classList.add("active");
    target.nextElementSibling.classList.add("show");
    target.parentElement.classList.add('active')
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showOrHideSwiper();
  checkClassForHeaderOnLoad();
});

wrapper.addEventListener("scroll", function () {
  headerScroll();
});


function termsTabs(target){
  if (!target.classList.contains("active")) {
    termsBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    termsDescription.forEach((content) => {
      content.classList.remove("show");
    });
    termItems.forEach((item) => {
      item.classList.remove("active");
    });
  }
}




