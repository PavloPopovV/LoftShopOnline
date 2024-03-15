
const wrapper = document.querySelector(".wrapper");
const popup = document.querySelector(".popup");

export function popupTextShow(titleText, text) {
  wrapper.classList.add("lock");
  popup.querySelector("h3").innerHTML = titleText;
  popup.querySelector("p").innerHTML = text;
  popup.classList.add("show");
};
