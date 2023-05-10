//import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Bouddha Nath",
    link: "https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG5lcGFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Patan Durbar Square",
    link: "https://images.unsplash.com/photo-1550642249-6e5605421172?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmVwYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Namche Valley",
    link: "https://images.unsplash.com/photo-1511215579272-6192432f83bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw4NjgwOTE5fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
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

/////------  FORM-VALIDATION ------//////
const profileModal = document.querySelector("#modal-edit-profile");
const modalAddProfile = document.querySelector("#modal-add-profile");

const editFormElement = profileModal.querySelector(".modal__form");

const addFormElement = modalAddProfile.querySelector(".modal__form");

////

const profileEditor = document.querySelector(".profile__editor");
const porfileModalCloseButton = profileModal.querySelector(".modal__close-tag");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = editFormElement.querySelector("#modal-input-title");
const jobInput = editFormElement.querySelector("#modal-input-description");
const saveButton = profileModal.querySelector(".modal__button");
const cardTemplate = document.querySelector("#card-template").content;
const cardsListElements = document.querySelector(".cards__list");
const modalContainerEl = document.querySelector(".modal__container");
const profileAddEditor = document.querySelector(".profile__add-editor");
const profileCloseEl = modalAddProfile.querySelector(".modal__close-tag");

/////------  FORM-VALIDATION ------//////
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

///--FUNCTIONS ---///

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyDown);
}
function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyDown);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileModal);
}

//////

profileEditor.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(profileModal);
});
porfileModalCloseButton.addEventListener("click", function () {
  closePopup(profileModal);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate
    .querySelector(".cards__content")
    .cloneNode(true);
  const cardsImage = cardElement.querySelector(".cards__image");
  const cardsImageTitle = cardElement.querySelector(".cards__image-title");
  const likeButton = cardElement.querySelector(".cards__button");
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
    openPopup(modalCardScreenSize);
    imageSizeEl.src = data.link;
    imageSizeEl.alt = data.name;
    imageTitleEl.textContent = data.name;
  });

  cardsImageTitle.textContent = data.name;
  cardsImage.src = data.link;
  cardsImage.alt = data.name;

  return cardElement;
}

const modalCardScreenSize = document.querySelector("#card-fullscreen");
const modalCardCloseButton = document.querySelector("#card-close-button");

modalCardCloseButton.addEventListener("click", () => {
  closePopup(modalCardScreenSize);
});

function renderCard(data) {
  const cardElement = getCardElement(data);
  cardsListElements.prepend(cardElement);
}

initialCards.reverse().forEach(renderCard);

profileAddEditor.addEventListener("click", function () {
  openPopup(modalAddProfile);
});

profileCloseEl.addEventListener("click", () => {
  closePopup(modalAddProfile);
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
  addFormElement.reset();
  toggleButtonState(
    Array.from(addFormElement.querySelectorAll(config.inputSelector)),
    addFormElement.querySelector(config.submitButtonSelector),
    config
  );
}
addFormElement.addEventListener("submit", handleImageSubmit);

function addModalOutsideClickListener(modalElement) {
  modalElement.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) closePopup(modalElement);
  });
}
addModalOutsideClickListener(profileModal);
addModalOutsideClickListener(modalAddProfile);
addModalOutsideClickListener(modalCardScreenSize);

const openedModal = document.querySelector(".modal_opened");

const handleEscKeyDown = function (e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
};
