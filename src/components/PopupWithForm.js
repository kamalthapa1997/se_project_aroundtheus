import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleAddCardSubmit }) {
    super({ popupSelector });
    // console.log(popupSelector, this._popupElement);
    this._formElement = this._popupElement.querySelector(".modal__form");
    this._handleAddCardSubmit = handleAddCardSubmit;
    this._inputEls = this._formElement.querySelectorAll(".modal__input");
  }

  _getInputValue() {
    const inputData = {};

    this._inputEls.forEach((input) => {
      inputData[input.name] = input.value;
      // console.log(input.value);
    });
    return inputData;
  }

  open() {
    this._formElement.addEventListener("submit", this._handleSubmit);
    super.open();
  }
  close() {
    super.close();
    this._formElement.reset();
  }
  _handleSubmit = (e) => {
    e.preventDefault();
    this._handleAddCardSubmit(this._getInputValue());
    this._formElement.reset();
    this.close();
  };

  setEventListeners() {
    document
      .querySelector(".profile__add-editor")
      .addEventListener("click", () => {
        this.open();
      });
    document.querySelector("#modal-close-tag").addEventListener("click", () => {
      this.close();
    });
  }
}
