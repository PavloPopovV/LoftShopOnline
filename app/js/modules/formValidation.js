import { popupTextShow } from "./popup.js";
import { patterns } from "../patterns/patterns.js";
import { messages } from "../ui_messages/messages.js";



export function inputValidation(input, pattern, error) {
  const isValid =
    input.value.trim() !== "" && input.value.trim().match(pattern);

  if (isValid) {
    input.classList.remove("error");
    input.nextElementSibling.classList.remove("show");
  } else {
    input.nextElementSibling.innerHTML = error;
    input.nextElementSibling.classList.add("show");
    input.classList.add("error");
    input.value = "";
  }
}

export function formValidation(form) {
  for (const input of form.elements) {
    switch (input.name) {
      case "name":
        inputValidation(input, patterns.namePattern, messages.errorName);
        break;
      case "phone":
        inputValidation(input, patterns.phonePattern, messages.errorPhone);
        break;
    }
  }
}

export function checkForm(form, popup) {
  let hasError = false;
  for (const input of form.elements) {
    if (input.tagName === "INPUT" && input.classList.contains("error")) {
      hasError = true;
    }
  }
  if (!hasError) {
    popupTextShow(popup.titleText, popup.text);
    form.reset();
  }
}