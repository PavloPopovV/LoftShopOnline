const termsBtns = document.querySelectorAll(".terms__btn");
const termsDescription = document.querySelectorAll(".terms__decription");
const termsDescPc = document.querySelectorAll(".terms__info-description");

function removeActiveClass(elements, className = "show"){
  elements.forEach((item) => {
    item.classList.remove(className);
  });
}

export function termsTabs(target) {
  termsDescPc.forEach((item) => {
    if (target.id === item.id && !item.classList.contains("show")) {
      removeActiveClass(termsDescPc)
      removeActiveClass(termsDescription)
      removeActiveClass(termsBtns, "active")
      target.classList.add("active");
      item.classList.add("show");
    }
  });
  target.nextElementSibling.classList.add("show");
}