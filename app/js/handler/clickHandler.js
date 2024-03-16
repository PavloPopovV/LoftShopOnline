//messages
import { patterns } from "../patterns/patterns.js";
import { messages, popupMsg } from "../ui_messages/messages.js";

//functions
import { inputValidation, formValidation, checkForm } from "../modules/formValidation.js";
import { changeSliderPhoto } from "../modules/changeSliderPhoto.js";
import { popupTextShow } from "../modules/popup.js";
import { termsTabs } from "../modules/termsTabs.js";
import { calcFullPrice, orderCountField, sumCardPrice } from "../modules/orderCount.js";
import { addProductToBasket, deleteOrder, makeOrdersList } from "../modules/cart.js";
import { basketCount } from "../modules/headerAnimation.js";

const wrapper = document.querySelector(".wrapper");
const popup = document.querySelector(".popup");
const contactsForm = document.forms.comunicationForm;
const promotionForm = document.forms.promForm;
const promotionInput = document.querySelector(".promotion-form__input");
const mobileMenu = document.querySelector(".mobile");


export function clickHandler(e) {
  const target = e.target;
  
  if (target.classList.contains("header__burger")) {
    mobileMenu.classList.add("active");
  }

  if (target.classList.contains("mobile__btn")) {
    mobileMenu.classList.remove("active");
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
    orderCountField(target);
    sumCardPrice(target)
    calcFullPrice()
  }

  if (target.classList.contains("popup__close")) {
    wrapper.classList.remove("lock");
    popup.classList.remove("show");
  }

  if (target.classList.contains("basket-js")) {
    popupTextShow(popupMsg.basketPopupText.titleText, popupMsg.basketPopupText.text);
  }

  if (target.classList.contains("promotion-form__btn")) {
    e.preventDefault();
    inputValidation(promotionInput, patterns.emailPattern, messages.errorMail);
    checkForm(promotionForm, popupMsg.promotionPopupText);
  }

  if (target.classList.contains("comunication__btn")) {
    e.preventDefault();
    formValidation(contactsForm);
    checkForm(contactsForm, popupMsg.contactPopupText);
  }

  if (target.classList.contains("order-form__submit")) {
    e.preventDefault();
    popupTextShow(popupMsg.orderPopupText.titleText, popupMsg.orderPopupText.text);
  }

  if (target.classList.contains("terms__btn")) {
    termsTabs(target);

  }

  if(target.classList.contains('product__submit-btn')) {
    addProductToBasket()
  } 

  if(target.classList.contains('order__delete')) {
    deleteOrder(target)
    makeOrdersList()
    basketCount()
    calcFullPrice()
  }
}