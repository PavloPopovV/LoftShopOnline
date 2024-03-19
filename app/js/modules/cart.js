import { basketCount } from "./headerManipulation.js";

const orderForm = document.forms.orderForm;

function makeOrderObj() {
  if (!document.querySelector(".product")) return;
  const url = window.location.href,
    name = document.querySelector(".product__name").textContent.trim(),
    img = document.querySelector(".product__big-img").src,
    art = document.querySelector(".product__art").textContent,
    price = document
      .querySelector(".product__price-item.active .js-price")
      .textContent.trim(),
    color = document.querySelector(
      ".product__colors-btn.active span"
    ).textContent,
    size = document
      .querySelector(".product__size-btn.active")
      .textContent.trim(),
    material = document.querySelector(".product__material").textContent.trim();

  const productObj = {
    art: art.slice(5),
    name,
    img,
    url,
    price,
    color,
    size,
    material,
    count: 1,
  };
  console.log(productObj);
  return productObj;
}

export function addProductToBasket() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const product = makeOrderObj();
  let originality = basket.some((item) => {
    if (item.art === product.art && item.size === product.size) {
      return true;
    }
  });

  console.log(!originality);

  if (!originality || basket.length == 0) {
    basket.push(product);
    localStorage.setItem("basket", JSON.stringify(basket));
    basketCount();
  }
}

export function deleteOrder(target) {
  const order = target.closest(".order");
  const orderArt = order.querySelector(".order__art span").textContent.trim();
  const orderSize = order.querySelector(".order__text span").textContent.trim();
  const basket = JSON.parse(localStorage.getItem("basket")) || [];

  const filteredBasket = basket.filter((item) => {
    if (item.art === orderArt && item.size === orderSize) {
      return false;
    } else {
      return true;
    }
  });
  
  if (filteredBasket.length === 0) {
    localStorage.removeItem("basket");
  } else {
    localStorage.setItem("basket", JSON.stringify(filteredBasket));
  }
}

function renderOrder(obj, parent) {
  parent.insertAdjacentHTML(
    "beforeend",
    `
    <li class="orders__item">
      <article class="order">
        <div class="order__left">
          <a class="order__img" href="${obj.url}">
            <img src="${obj.img}" alt="Картинка товару у кошику">
          </a>
          <div class="order__info">
            <h2 class="order__name">${obj.name}</h2>
            <span class="order__text">Розмір : <span>${obj.size}</span></span>
            <span class="order__text">Матеріал : <span>${
              obj.material
            }</span></span>
            <span class="order__art">арт: <span>${obj.art}</span></span>
          </div>
        </div>
        <div class="order__right">
          <div class="order__count">
            <button class="order__count-btn order__count-btn--minus" type="button">-</button>
            <div class="order__group">
              <label class="sr-only" for="number">Поле для відображення кількості товарі</label>
              <input class="order__input" type="number" name="number" id="number" value="${
                obj.count
              }">
            </div>
            <button class="order__count-btn order__count-btn--plus" type="button">+</button>
          </div>

          <span class="order__price">₴ <span>${
            +obj.price * +obj.count + ".00"
          }</span></span>

          <button class="order__delete" type="button"></button>
        </div>
      </article>
    </li>
  `
  );
}

export function makeOrdersList() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const ordersList = document.querySelector(".orders__list");
  const goodsCount = document.querySelector(".order-form__goods span");
  if (!ordersList) return;
  ordersList.innerHTML = "";
  basket.forEach((obj) => renderOrder(obj, ordersList));
  goodsCount.innerHTML = ordersList.children.length;
}

export function renderEmptyBasket() {
  const ordersTitle = document.querySelector(".orders__title");
  const ordersBox = document.querySelector(".orders__container");
  const form = document.querySelector(".order-form");
  const orderList = document.querySelector(".orders__list");

  let text = document.createElement("p");
  text.classList.add("orders__empty");
  ordersTitle.textContent = "Корзина порожня";
  text.innerHTML = `Запрошуємо вас відвідати наш <a href='catalog.html' >каталог</a> товарів =). `;
  ordersBox.appendChild(text);
  orderList.innerHTML = "";
  form.style.display = "none";
  localStorage.removeItem("basket");
  basketCount();
}

export function renderEmptyBasketOrMakeOrdersList() {
  const basket = JSON.parse(localStorage.getItem("basket"));
  if (basket) {
    makeOrdersList();
  } else {
    renderEmptyBasket();
  }
}

function changeDelivery() {
  const deliveryRadio = orderForm.postType;
  let checkedRadioId = [...deliveryRadio].find((radio) => radio.checked).id;
  if (checkedRadioId === "postTypeUkr") {
    orderForm.office.placeholder = "Поштовий індекс";
    return;
  }
  orderForm.office.placeholder = " Адресса / Поштове відділення";
}

orderForm ? orderForm.addEventListener("change", changeDelivery) : "";
