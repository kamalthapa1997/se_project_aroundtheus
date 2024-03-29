import Popup from "./Popup.js";
export default class PopupConfirmation extends Popup {
  constructor(popupSelector, loadingText) {
    super(popupSelector);
    this._loadingText = loadingText;
    this._formElement = this._popupElement.querySelector(".modal__form");
    this._deleteBtn = this._popupElement.querySelector("#modal-delete-button");
    this._modalProfileSaveBtn =
      this._popupElement.querySelector(".modal__button");
    this._modalProfileSaveBtnText = this._modalProfileSaveBtn.textContent;
  }

  setConfirmHandler = (handle) => {
    this._handler = handle;
  };
  renderLoading(isLoading) {
    if (isLoading) {
      this._modalProfileSaveBtn.textContent = this._loadingText;
    } else {
      this._modalProfileSaveBtn.textContent = this._modalProfileSaveBtnText;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      this._handler();
    });
  }
}
