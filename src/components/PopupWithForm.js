import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }, renderLoadingText) {
    super({ popupSelector });

    this._formElement = this._popupElement.querySelector(".modal__form");
    this._renderLoadingText = renderLoadingText;
    this._handleSubmit = handleSubmit;
    this._inputEls = this._formElement.querySelectorAll(".modal__input");
    this._submitBtn = this._formElement.querySelector(".modal__button");
    this._submitBtnText = this._submitBtn.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtnText = this._renderLoadingText;
    } else {
      this._submitBtnText = this._submitBtnText;
    }
  }

  _getInputValue() {
    const inputData = {};

    this._inputEls.forEach((input) => {
      inputData[input.name] = input.value;
    });

    return inputData;
  }

  close() {
    this._formElement.reset();
    super.close();
  }
  _handleFormSubmit = (e) => {
    e.preventDefault();
    this._handleSubmit(this._getInputValue());

    // this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleFormSubmit);
  }
}
