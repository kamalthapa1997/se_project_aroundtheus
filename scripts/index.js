const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditor = document.querySelector(".profile__editor");
const profileModal = document.querySelector(".modal");
const modalCloseTag = profileModal.querySelector(".modal__close-tag");
const profileFormElement = profileModal.querySelector(".modal__form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = profileFormElement.querySelector("#modal-input-title");
const jobInput = profileFormElement.querySelector("#modal-input-description");
const saveButton = profileModal.querySelector(".modal__save-button");
const cardTemplate = document.querySelector("#card-template").content;
const cardsListElements = document.querySelector(".cards__list");

profileEditor.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileModal.classList.add("modal__opened");
});
modalCloseTag.addEventListener("click", function () {
  profileModal.classList.remove("modal__opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  profileModal.classList.remove("modal__opened");
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate
    .querySelector(".cards__content")
    .cloneNode(true);
  const cardsImage = cardElement.querySelector(".cards__image");
  const cardsImageTitle = cardElement.querySelector(".cards__image-title");
  cardsImageTitle.textContent = data.name;
  cardsImage.src = data.link;
  cardsImage.alt = data.name;
  return cardElement;
}
function renderCard(data) {
  const cardElement = getCardElement(data);
  cardsListElements.prepend(cardElement);
}
for (let i = initialCards.length - 1; i >= 0; i--) {
  renderCard(initialCards[i]);
}
