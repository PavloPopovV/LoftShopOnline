const wrapper = document.querySelector(".wrapper");
const header = document.querySelector(".header");
const headerCount = document.querySelector(".basket-count-js");

function changeHeaderTextColorWhite(className) {
  const productPageHeader = document.querySelectorAll(className);
  [...productPageHeader].forEach((btn) => btn.classList.add("inner-header"));
}

if (document.querySelector(".inner-page") !== null) {
  changeHeaderTextColorWhite(".header__btn");
  changeHeaderTextColorWhite(".header__logo");
  changeHeaderTextColorWhite(".header__media-btn");
  changeHeaderTextColorWhite(".header__burger");
}

wrapper.addEventListener("scroll", function () {
  const scrollTop = wrapper.scrollTop;
  header.classList.toggle("sticky", scrollTop >= 50);
  header.classList.toggle("animation", scrollTop >= 200);
  headerCount.classList.toggle("color", scrollTop >= 200);
});

document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("header__burger")) {
    document.querySelector(".mobile").classList.add("active");
  }
  if (target.classList.contains("mobile__close")) {
    document.querySelector(".mobile").classList.remove("active");
  }
});
