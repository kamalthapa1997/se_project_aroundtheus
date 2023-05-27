import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupImageTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
    this._popupImage = this._popupElement.querySelector(".modal__image-size");
  }

  open({ name, link }) {
    this._popupImageTitle.textContent = name;
    this._popupImage.alt = name;
    this._popupImage.src = link;
    console.log(link);
    super.open();
  }
}
