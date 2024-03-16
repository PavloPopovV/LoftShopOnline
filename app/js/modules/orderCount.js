export function orderCountField(target) {
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

export function sumCardPrice(target) {
  const input = target.closest(".order__count").querySelector(".order__input")
  const priceField = target.closest(".order").querySelector('.order__price span')
  const price = 2390;
  priceField.innerHTML = (price * input.value) + ".00"
}

export function calcFullPrice() {
  const priceFields = document.querySelectorAll('.order__price span')
  const amountPrice = document.querySelectorAll('.order-form__amount span')
  if(amountPrice.length === 0) return false;
  let res = [...priceFields].reduce((acc, item) => {
    return acc += +item.textContent
  }, 0)
  amountPrice[1].innerHTML = res.toLocaleString('en-US')
}
