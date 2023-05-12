import { openPopup, closePopup, handleEscKeyDown } from "../utils/utils.js";

const modalCardScreenSize = document.querySelector("#card-fullscreen");
const imageSizeEl = document.querySelector(".modal__image-size");
const imageTitleEl = document.querySelector(".modal__image-title");

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__button")
      .addEventListener("click", this._handleLikeIcon.bind(this));

    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", this._handleDeleteIcon.bind(this));

    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => this._handlePreViewIcon());
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".cards__button")
      .classList.toggle("cards__like-button");
  }

  _handleDeleteIcon() {
    this._element.remove();
  }

  _handlePreViewIcon() {
    openPopup(modalCardScreenSize);
    imageSizeEl.src = this._link;
    imageSizeEl.alt = this._name;
    imageTitleEl.textContent = this._name;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".cards__image").src = this._link;
    this._element.querySelector(".cards__image-title").textContent = this._name;
    this._setEventListeners();
    // console.log(this._name);
    return this._element;
  }
}
