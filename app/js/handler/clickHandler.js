//messages
import { popupMsg } from "../ui_messages/messages.js";

//functions
import { checkForm } from "../modules/formValidation.js";
import { changeSliderPhoto } from "../modules/changeSliderPhoto.js";
import { popupTextShow } from "../modules/popup.js";
import { changeSize, termsTabs } from "../modules/tabs.js";
import { calcFullPrice, orderCountField, sumCardPrice } from "../modules/orderCount.js";
import { addProductToBasket, deleteOrder, renderEmptyBasketOrMakeOrdersList } from "../modules/cart.js";
import { basketCount } from "../modules/headerManipulation.js";

const wrapper = document.querySelector(".wrapper");
const popup = document.querySelector(".popup");

const contactsForm = document.forms.communicationForm;
const promotionForm = document.forms.promForm;
const orderForm = document.forms.orderForm;

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
    checkForm(promotionForm);
  }

  if (target.classList.contains("communication-form__btn")) {
    e.preventDefault();
    checkForm(contactsForm);
  }

  if (target.classList.contains("terms__btn")) {
    termsTabs(target);

  }

  if(target.classList.contains('product__submit-btn')) {
    addProductToBasket()
  } 

  if(target.classList.contains('order__delete')) {
    deleteOrder(target)
    renderEmptyBasketOrMakeOrdersList()
    basketCount()
    calcFullPrice()
  }

  if(target.classList.contains('order-form__submit')) {
    e.preventDefault();
    checkForm(orderForm);
  }

  if(target.classList.contains('product__size-btn')) {
    changeSize(target)
  }
}