function getArt(target) {
  return target
    .closest(".order")
    .querySelector(".order__art span")
    .textContent.trim();
}

function getBasketArr() {
  return JSON.parse(localStorage.getItem("basket"))
}

function updateBasket(value, target) {
  const orderArt = getArt(target)
  let basket = getBasketArr();

  return basket.map((item) => {
    if (item.art === orderArt) {
      item.count = value;
    }
    return item;
  });
}

export function orderCountField(target) {
  const input = target.closest(".order__count").querySelector(".order__input");
  let value = input.value;
  if (target.className.includes("plus")) {
    input.value = ++value;
  }
  if (target.className.includes("minus") && +value - 1 > 0) {
    input.value = --value;
  }
  localStorage.setItem(
    "basket",
    JSON.stringify(updateBasket(input.value, target))
  );
}

export function sumCardPrice(target) {
  let basket = getBasketArr();
  const orderArt = getArt(target);
  const input = target.closest(".order__count").querySelector(".order__input");
  const priceField = target
    .closest(".order")
    .querySelector(".order__price span");
  const price = basket.find((item) => item.art === orderArt).price;
  priceField.innerHTML = price * input.value + ".00";
}

export function calcFullPrice() {
  const priceFields = document.querySelectorAll(".order__price span");
  const amountPrice = document.querySelectorAll(".order-form__amount span");
  if (amountPrice.length === 0) return false;
  let res = [...priceFields].reduce((acc, item) => {
    return (acc += +item.textContent);
  }, 0);
  amountPrice[1].innerHTML = res.toLocaleString("en-US");
}
