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

//// function popup

function openPopup(popup) {
  popup.classList.add("modal_opened");
}
function closePopup(popup) {
  popup.classList.remove("modal_opened");
}
//////function popop
profileEditor.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(profileModal);
});
modalCloseTag.addEventListener("click", function () {
  closePopup(profileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileModal);
  // profileModal.classList.remove("modal_opened");
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate
    .querySelector(".cards__content")
    .cloneNode(true);
  const cardsImage = cardElement.querySelector(".cards__image");
  const cardsImageTitle = cardElement.querySelector(".cards__image-title");
  const likeButton = cardElement.querySelector(".cards__button");

  /*
    **Might be better**
    It’s better to find **constants** only 1 time at the top of the file not to waste resources on searching them again and again when you call a method (function)

  */
  const imageSizeEl = document.querySelector(".modal__image-size");
  const imageTitleEl = document.querySelector(".modal__image-title");
  const deleteButton = cardElement.querySelector(".cards__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardsImage.addEventListener("click", () => {
    modalScreen.classList.add("modal_opened");
    imageSizeEl.src = data.link;
    imageSizeEl.alt = data.name;
    imageTitleEl.textContent = data.name;
  });

  cardsImageTitle.textContent = data.name;
  cardsImage.src = data.link;
  cardsImage.alt = data.name;

  return cardElement;
}
const modalScreen = document.querySelector("#card-fullscreen");
const modalClose = document.querySelector("#card-close");
modalClose.addEventListener("click", () => {
  closePopup(modalScreen);
});

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
  modalAddProfile.classList.add("modal_opened");
});

profileCloseEl.addEventListener("click", () => {
  modalAddProfile.classList.remove("modal_opened");
});

function handleImageSubmit(evt) {
  evt.preventDefault();
  const title = evt.target.title.value;
  const link = evt.target.link.value;
  renderCard({
    name: title,
    link: link,
  });
  closePopup(modalAddProfile);
  modalAddForm.reset();
}
modalAddForm.addEventListener("submit", handleImageSubmit);
