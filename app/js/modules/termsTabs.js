const termsBtns = document.querySelectorAll(".terms__btn");
const termsDescription = document.querySelectorAll(".terms__decription");
const termItems = document.querySelectorAll(".terms__item");

export function termsTabs(target) {
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
