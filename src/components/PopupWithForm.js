import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super({ popupSelector });
    // console.log(popupSelector);
    this._formElement = this._popupElement.querySelector(".modal__form");
    // console.log(this._formElement);

    this._handleSubmit = handleSubmit;
    this._inputEls = this._formElement.querySelectorAll(".modal__input");
  }

  _getInputValue() {
    const inputData = {};

    this._inputEls.forEach((input) => {
      inputData[input.name] = input.value;
    });
    console.log(inputData);
    return inputData;
    //console.log(inputData);
  }

  close() {
    this._formElement.reset();
    super.close();
  }
  _handleEscUp = (e) => {
    e.preventDefault();
    this._handleSubmit(this._getInputValue());

    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", this._handleEscUp);
  }
}
