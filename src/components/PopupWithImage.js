import Popup from "./popup.js";
export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._popupElement = document.querySelector(popupSelector);
    this._popupImageTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
    this._popupImage = this._popupElement.querySelector(".modal__image-size");
  }

  open() {
    this._popupImageTitle.textContent = this._name;
    this._popupImage.alt = this._name;
    this._popupImage.src = this._link;
    super.open();
  }
  close() {
    this._popupImageTitle.textContent = "";
    this._popupImage.alt = "";
    this._popupImage.src = "";
    super.close();
  }
  // setEventListeners() {
  //   this._popupElement
  //     .querySelector("#card-close-button")
  //     .addEventListeners("click", this.close);
  // }
}
