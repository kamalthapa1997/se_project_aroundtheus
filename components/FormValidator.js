class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    this._errorMessageEl = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputElement.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }
  _hideInputElement(inputElement) {
    this._errorMessageEl = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputElement(inputElement);
    }
  }

  _hasInvalidInput() {
    return !this._inputList.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
      return;
    }
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _setEventListener() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
    this.toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}

export default FormValidator;
