function removeActiveClass(classNameEl, classNameRemove = "show") {
  const elements = document.querySelectorAll(classNameEl);
  elements.forEach((item) => {
    item.classList.remove(classNameRemove);
  });
}

export function termsTabs(target) {
  const el = document.querySelector(
    `.terms__info-description[id='${target.id}']`
  );
  if (target.classList.contains("active")) return;
  removeActiveClass(".terms__info-description");
  removeActiveClass(".terms__decription");
  removeActiveClass(".terms__btn", "active");
  target.classList.add("active");
  el.classList.add("show");
  target.nextElementSibling.classList.add("show");
}

export function changeSize(target) {
  if (target.classList.contains("active")) return;
  const el = document.querySelector(
    `.product__price-item[id='${target.dataset.id}']`
  );
  removeActiveClass(".product__size-btn", "active");
  removeActiveClass(".product__price-item", "active");
  target.classList.add("active");
  el.classList.add('active')
}
