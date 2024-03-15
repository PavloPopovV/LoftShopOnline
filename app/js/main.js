const wrapper = document.querySelector(".wrapper");
const header = document.querySelector(".header");
const headerCount = document.querySelector(".basket-count-js");
const bigGroup = document.querySelector(".product__big-group");
const popup = document.querySelector(".popup");
const termsBtns = document.querySelectorAll(".terms__btn");
const termsDescription = document.querySelectorAll(".terms__decription");
const termItems = document.querySelectorAll(".terms__item");
const contactsForm = document.forms.comunicationForm;
const promotionForm = document.forms.promForm;
const promotionInput = document.querySelector(".promotion-form__input");
const mobileMenu = document.querySelector(".mobile");

const patterns = {
  addressPattern: /[а-яА-ЯЁё0-9\s.,\-]{2,}/,
  textPattern: /[а-яА-ЯЁё]{2,}/,
  namePattern: /^[а-яА-ЯҐґЄєІіЇї' -]{2,}$/,
  phonePattern: /^0\d{9}$/,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
};

const messages = {
  errorRequired: "Це поле обов'язкове. Не може бути порожнім",
  errorText: "Не менше двох символів, лише кирилиця",
  errorName: "Від двох символів, лише кирилиця, без пробілів",
  errorPhone: "Починайте з нуля, введіть 10 символів",
  errorMail: "Не менше 6 символів, знак @ та домен пошти",
  errorAdress: "Не менше двох символів",
  correct: "Все правильно, заповнюйте далі!",
};

const promotionPopupText = {
  titleText: "Дякуємо за вашу зацікавленість",
  text: "Ми будемо повідомляти вас про нові товари, акції та інші цікаві події.",
};

const basketPopupText = {
  titleText: "Товар доданий до кошика",
  text: "Продовжуйте шопінг або перегляньте ваш кошик.",
};

const orderPopupText = {
  titleText: "Дякуємо за ваше замовлення",
  text: "Ми отримали ваш запит і незабаром зв'яжемося з вами для підтвердження деталей замовлення.",
};

const contactPopupText = {
  titleText: "Дякуємо за ваше повідомлення",
  text: "Ми отримали ваш запит і незабаром зв'яжемося  для вирішення вашого питання.",
};

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
+function popupTextShow(titleText, text) {
  wrapper.classList.add("lock");
  popup.querySelector("h3").innerHTML = titleText;
  popup.querySelector("p").innerHTML = text;
  popup.classList.add("show");
};

function inputValidation(input, pattern, error) {
  const isValid =
    input.value.trim() !== "" && input.value.trim().match(pattern);

  if (isValid) {
    input.classList.remove("error");
    input.nextElementSibling.classList.remove("show");
  } else {
    input.nextElementSibling.innerHTML = error;
    input.nextElementSibling.classList.add("show");
    input.classList.add("error");
    input.value = "";
  }
}

function contactFormValidation() {
  for (const input of contactsForm.elements) {
    switch (input.name) {
      case "name":
        inputValidation(input, patterns.namePattern, messages.errorName);
        break;
      case "phone":
        inputValidation(input, patterns.phonePattern, messages.errorPhone);
        break;
    }
  }
}

function checkForm(form, popup) {
  let hasError = false;
  for (const input of form.elements) {
    if (input.tagName === "INPUT" && input.classList.contains("error")) {
      hasError = true;
    }
  }
  if (!hasError) {
    popupTextShow(popup.titleText, popup.text);
    form.reset();
  }
}

document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("header__burger")) {
    mobileMenu.classList.add("active");
  }
  if (target.classList.contains("mobile__btn")) {
    mobileMenu.classList.toggle("active");
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

  if (target.classList.contains("popup__close")) {
    wrapper.classList.remove("lock");
    popup.classList.remove("show");
  }

  if (target.classList.contains("basket-js")) {
    popupTextShow(basketPopupText.titleText, basketPopupText.text);
  }

  if (target.classList.contains("promotion-form__btn")) {
    e.preventDefault();
    inputValidation(promotionInput, patterns.emailPattern, messages.errorMail);
    checkForm(promotionForm, promotionPopupText);
  }

  if (target.classList.contains("comunication__btn")) {
    e.preventDefault();
    contactFormValidation();
    checkForm(contactsForm, contactPopupText);
  }

  if (target.classList.contains("terms__btn")) {
    termsTabs(target);
    target.classList.add("active");
    target.nextElementSibling.classList.add("show");
    target.parentElement.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  showOrHideSwiper();
  checkClassForHeaderOnLoad();
});

wrapper.addEventListener("scroll", function () {
  headerScroll();
});

function termsTabs(target) {
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
