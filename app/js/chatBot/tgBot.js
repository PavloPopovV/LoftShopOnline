import { renderEmptyBasket } from "../modules/cart.js";
import { popupTextShow } from "../modules/popup.js";
import { popupMsg } from "../ui_messages/messages.js";

function makeTgMessageForm(form) {
  let message = ``;

  switch (form.getAttribute("name")) {
    case "orderForm":
      message += `<b>Форма ЗАМОВЛЕННЯ:</b>\n`;
      break;
    case "communicationForm":
      message += `<b>Форма для КОНТАКТУ:</b>\n`;
      break;
    case "promForm":
      message += `<b>Форма для ПІДПИСКИ на новинки:</b>\n`;
      break;
  }

  [...form.elements].forEach((el) => {
    if (el.className.trim().includes("input")) {
      message += `<b>   ${el.placeholder}: ${el.value}</b>\n`;
    }
    if (el.className.trim().includes("textarea")) {
      message += `<b>   ${el.placeholder}: ${el.value}</b>\n`;
    }
    if (el.name === "postType" && el.checked) {
      message += `<b>   Спосіб доставки: ${el.nextElementSibling.textContent.trim()}</b>\n`;
    }
    if (el.name === "paymentType" && el.checked) {
      message += `<b>   Спосіб оплати: ${el.nextElementSibling.textContent.trim()}</b>\n`;
    }
    if (el.name === "details") {
      message += `<b>   Уточнити деталі перед оформленням: ${
        el.checked ? "Так" : "Ні"
      }</b>\n`;
    }
  });
  return message;
}

function makeTgMessageOrder() {
  const basket = JSON.parse(localStorage.getItem("basket"));
  const amount = document
    .querySelectorAll(".order-form__amount span")[1]
    .textContent.trim();
  let message = basket.reduce((acc, item, index) => {
    acc += `<b>Товар : ${index + 1} </b>  \n`;
    acc += `<b>   Назва товару : ${item.name} </b> \n`;
    acc += `<b>   Артикул товару : ${item.art} </b>\n`;
    acc += `<b>   Колір : ${item.color} </b> \n`;
    acc += `<b>   Матеріал : ${item.material} </b> \n`;
    acc += `<b>   Розмір : ${item.size} </b> \n`;
    acc += `<b>   Кількість : ${item.count} </b> \n`;
    acc += `<b>   Ціна за шт. : ${
      item.price.slice(0, item.price.length - 3) + "грн"
    } </b> \n`;
    acc += `<b>   Ціна за всі: ${item.price * item.count + "грн"} </b> \n`;
    acc += `<b>   Посилання : ${item.url} </b> \n`;
    acc += `\n`;
    return acc;
  }, ``);

  message += `<b>   Обрані товари: ${basket.length}</b>  \n`;
  message += `<b>   Загальна ціна замовлення: ${amount + "грн"}</b> \n`;

  return message;
}

function currentPopupMsg(form) {
  let msg = {};

  switch (form.getAttribute("name")) {
    case "orderForm":
      msg = form.details.checked
        ? popupMsg.orderPopupText
        : popupMsg.orderSecondPopupText;
      break;
    case "communicationForm":
      msg = popupMsg.contactPopupText;
      break;
    case "promForm":
      msg = popupMsg.promotionPopupText;
      break;
  }

  return msg;
}

export async function formSend(form) {
  
  
  const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  let message =
    form.getAttribute("name") === "orderForm"
      ? makeTgMessageForm(form) + "\n" + makeTgMessageOrder()
      : makeTgMessageForm(form);

  const popupMsg = currentPopupMsg(form);

  const response = await fetch(URI_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "html",
    }),
  });
  const result = await response.json();

  if (result.ok) {
    showMsg(true, popupMsg);
  } else {
    showMsg(false, popupMsg);
  }
}

function showMsg(isSuccess, popupMsg) {
  if (isSuccess) {
    popupTextShow(popupMsg.titleText, popupMsg.text);
    document.forms.orderForm && renderEmptyBasket();
  } else {
    alert("Щось пішло не так, спробуйте пізніше!!!");
  }
}
