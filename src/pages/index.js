import "../pages/index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { openPopup, closePopup, handleEscKeyDown } from "../utils/utils.js";

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

//////-----PROFILE-----//////

const profileEditor = document.querySelector(".profile__editor");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const profileAddEditor = document.querySelector(".profile__add-editor");

//////------CARDS---//////
const cardsListElements = document.querySelector(".cards__list");
const modalCardScreenSize = document.querySelector("#card-fullscreen");
const modalCardCloseButton = document.querySelector("#card-close-button");

///////----MODAL-----/////
const profileModal = document.querySelector("#modal-edit-profile");
const editFormElement = profileModal.querySelector(".modal__form");
const modalAddProfile = document.querySelector("#modal-add-profile");
const openedModal = document.querySelector(".modal_opened");
const nameInput = editFormElement.querySelector("#modal-input-title");
const jobInput = editFormElement.querySelector("#modal-input-description");
const saveButton = profileModal.querySelector(".modal__button");
const modalContainerEl = document.querySelector(".modal__container");
const profileCloseEl = modalAddProfile.querySelector(".modal__close-tag");
const porfileModalCloseButton = profileModal.querySelector(".modal__close-tag");
const addFormElement = modalAddProfile.querySelector(".modal__form");
const modalAddForm = document.querySelector("#modal-add-form");

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

//////---EventListener----///
profileEditor.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(profileModal);
});

porfileModalCloseButton.addEventListener("click", function () {
  closePopup(profileModal);
});

profileAddEditor.addEventListener("click", function () {
  openPopup(modalAddProfile);
});

profileCloseEl.addEventListener("click", () => {
  closePopup(modalAddProfile);
});

editFormElement.addEventListener("submit", handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleImageSubmit);

modalCardCloseButton.addEventListener("click", () => {
  closePopup(modalCardScreenSize);
});

/////----EVENT HANDLERS ----/////
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileModal);
}

function handleImageSubmit(evt) {
  evt.preventDefault();
  const name = evt.target.title.value;
  const link = evt.target.link.value;

  renderCard({ name, link }, cardsListElements);
  closePopup(modalAddProfile);
  addFormElement.reset();
  addFormValidator.toggleButtonState();
}

function addModalOutsideClickListener(modalElement) {
  modalElement.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) closePopup(modalElement);
  });
}
addModalOutsideClickListener(profileModal);
addModalOutsideClickListener(modalAddProfile);
addModalOutsideClickListener(modalCardScreenSize);

//////--Rendering Array of Card ---/////
function renderCard(cardData, list) {
  const card = new Card(cardData, "#card-template");
  list.prepend(card.generateCard());
}
initialCards.forEach((cardData) => renderCard(cardData, cardsListElements));
