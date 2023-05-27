export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._cardsButtonForLike.addEventListener(
      "click",
      this._handleLikeIcon.bind(this)
    );

    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", this._handleDeleteIcon.bind(this));

    this._cardsImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon() {
    this._cardsButtonForLike.classList.toggle("cards__like-button");
  }

  _handleDeleteIcon() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardsButtonForLike = this._element.querySelector(".cards__button");
    this._cardsImage = this._element.querySelector(".cards__image");
    this.cardsImageTitle = this._element.querySelector(".cards__image-title");

    this._cardsImage.src = this._link;
    this.cardsImageTitle.textContent = this._name;
    this._cardsImage.alt = this._name;

    this._setEventListeners();
    return this._element;
  }
}
