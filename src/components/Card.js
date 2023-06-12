export default class Card {
  constructor({
    data,
    handleCardClick,
    handleCardDlt,
    cardSelector,
    cardLikeUpdate,
    userId,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDlt = handleCardDlt;
    this._id = data._id;
    this._likes = data.likes;
    this._cardLikeUpdate = cardLikeUpdate;
    this._userId = userId;
  }
  getId() {
    return this._id;
  }
  isLiked() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }
  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    return cardElement;
  }
  _renderLikes() {
    this._element.querySelector(".cards__like-count").textContent =
      this._likes.length;

    this._element
      .querySelector(".cards__button")
      .classList.toggle("cards__like-button", this.isLiked());
  }

  setEventListeners() {
    this._cardsButtonForLike.addEventListener("click", () => {
      this._cardLikeUpdate();
    });

    this._element
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleCardDlt();
      });

    this._cardsImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._likeAmount = this._element.querySelector(".cards__like-count");
  }

  handleDeleteIcon() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardsButtonForLike = this._element.querySelector(".cards__button");
    this._cardsImage = this._element.querySelector(".cards__image");
    this.cardsImageTitle = this._element.querySelector(".cards__image-title");

    this._cardsImage.src = this._link;
    this.cardsImageTitle.textContent = this._name;
    this._cardsImage.alt = this._name;

    this._renderLikes();

    return this._element;
  }
}
