// import { openPopup, closePopup, handleEscKeyDown } from "../utils/utils.js";

export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOutsideClickListener =
      this._handleOutsideClickListener.bind(this);
  }
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    const popupCloseTag = this._popupElement.querySelector(
      "#modal-close-button"
    );

    popupCloseTag.addEventListener("click", this._handleOutsideClickListener);

    this._popupElement.addEventListener(
      "mousedown",
      this._handleOutsideClickListener
    );
  }
  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleOutsideClickListener
    );
    this._popupElement.classList.remove("modal_opened");
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOutsideClickListener(evt) {
    const popupCloseTag = this._popupElement.querySelector(
      "#modal-close-button"
    );

    if (
      evt.target.classList.contains("modal") ||
      evt.target === popupCloseTag ||
      evt.target.classList.contains("modal__opened")
    ) {
      this.close();
    }
  }
}
