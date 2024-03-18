const wrapper = document.querySelector(".wrapper");
const header = document.querySelector(".header");
const headerCount = document.querySelector(".basket-count-js");

export function basketCount() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  headerCount.innerHTML = basket.length;
}

export function changeHeaderTextColorWhite(className) {
  const productPageHeader = document.querySelectorAll(className);
  [...productPageHeader].forEach((btn) => btn.classList.add("inner-header"));
}

export function headerScroll() {
  const scrollTop = wrapper.scrollTop;
  header.classList.toggle("sticky", scrollTop >= 10);
  header.classList.toggle("animation", scrollTop >= 400);
}

export function checkClassForHeaderOnLoad() {
  if (document.querySelector(".inner-page") !== null) {
    changeHeaderTextColorWhite(".header__btn");
    changeHeaderTextColorWhite(".header__logo");
    changeHeaderTextColorWhite(".header__media-btn");
    changeHeaderTextColorWhite(".header__burger");
  }
}
