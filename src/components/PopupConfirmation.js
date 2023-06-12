import Popup from "./Popup.js";
export default class PopupConfirmation extends Popup {
  constructor(popupSelector, renderLoadingText) {
    super(popupSelector);
    this._renderLoadingText = renderLoadingText;
    this._formElement = this._popupElement.querySelector(".modal__form");
    this._deleteBtn = this._popupElement.querySelector("#modal-delete-button");
    this._modalProfileSaveBtn =
      this._popupElement.querySelector(".modal__button");
  }

  setConfirmHandler = (handle) => {
    this._handler = handle;
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      this._handler();
    });
  };
  renderLoading(isLoading) {
    if (isLoading) {
      this._modalProfileSaveBtn = this._renderLoadingText;
    } else {
      this._modalProfileSaveBtn = this._modalProfileSaveBtn;
    }
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
