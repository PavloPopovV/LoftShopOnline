
import { patterns } from "../patterns/patterns.js";
import { messages } from "../ui_messages/messages.js";
import { formSend } from "../chatBot/tgBot.js";

function inputValidation(input, pattern, error) {
  const isValid =
    input.value.trim() !== "" && input.value.trim().match(pattern);
  const group = input.closest("div");
  const msg = group.querySelector("span");

  if (isValid) {
    group.classList.remove("error");
  } else {
    msg.innerHTML = error;
    group.classList.add("error");
    group.value = "";
  }
}

function formValidation(form) {
  for (const input of form.elements) {
    switch (input.name) {
      case "name":
        inputValidation(input, patterns.namePattern, messages.errorName);
        break;
      case "phone":
        inputValidation(input, patterns.phonePattern, messages.errorPhone);
        break;
      case "email":
        inputValidation(input, patterns.emailPattern, messages.errorMail);
        break;
      case "city":
        inputValidation(input, patterns.namePattern, messages.errorName);
        break;
      case "office":
        inputValidation(input, patterns.emptyPattern, messages.errorEmpty);
        break;
    }
  }
}

export function checkForm(form) {
  formValidation(form)
  const groups = document.querySelectorAll("[class*=form__group]");
  let hasError = [...groups].every(
    (group) => !group.classList.contains("error")
  );

  if (hasError) {
    formSend(form)
    form.reset();
  }
}

