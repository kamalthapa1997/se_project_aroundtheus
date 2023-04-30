const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorMessageEl = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(errorClass);
};

const hideInputElement = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorMessageEl = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputElement(formElement, inputElement, options);
  }
};

const hasInvalidInput = (inputList) => {
  return !inputList.every((inputElement) => inputElement.validity.valid);
};

const toggleButtonState = (inputElements, buttonElement, options) => {
  const { inactiveButtonClass } = options;
  if (hasInvalidInput(inputElements)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
    return;
  }
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};

const setEventListener = (formElement, options) => {
  const { inputSelector, submitButtonSelector } = options;
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputElements, buttonElement, options);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, buttonElement, options);
    });
  });
};

const enableValidation = (options) => {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, options);
  });
};

enableValidation(config);
