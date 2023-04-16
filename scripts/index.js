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
const profileModal = document.querySelector("#modal-edit-profile");
const modalCloseTag = profileModal.querySelector(".modal__close-tag");
const profileFormElement = profileModal.querySelector("#modal-form");
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

  const likeButton = cardElement.querySelector(".cards__button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button");
  });

  const deleteButton = cardElement.querySelector(".cards__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardsImageTitle.textContent = data.name;
  cardsImage.src = data.link;
  cardsImage.alt = data.name;

  return cardElement;
}
function renderCard(data) {
  const cardElement = getCardElement(data);
  cardsListElements.prepend(cardElement);
}

initialCards.reverse().forEach(renderCard);

const modalAddProfile = document.querySelector("#modal-add-profile");
const profileAddEditor = document.querySelector(".profile__add-editor");
const profileCloseEl = modalAddProfile.querySelector(".modal__close-tag");
const modalAddForm = document.querySelector("#modal-add-form");

profileAddEditor.addEventListener("click", function () {
  modalAddProfile.classList.add("modal__opened");
});

profileCloseEl.addEventListener("click", () => {
  modalAddProfile.classList.remove("modal__opened");
});

modalAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = e.target.title.value;
  const link = e.target.link.value;
  renderCard({
    name: title,
    link: link,
  });
  modalAddProfile.classList.remove("modal__opened");
});
