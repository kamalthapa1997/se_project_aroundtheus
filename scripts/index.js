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

const profileEditor = document.querySelector(".profile__editor");
const profileModal = document.querySelector("#modal-edit-profile");
const porfileModalCloseButton = profileModal.querySelector(".modal__close-tag");
const profileFormElement = profileModal.querySelector("#modal-form");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const nameInput = profileFormElement.querySelector("#modal-input-title");
const jobInput = profileFormElement.querySelector("#modal-input-description");
const saveButton = profileModal.querySelector(".modal__save-button");
const cardTemplate = document.querySelector("#card-template").content;
const cardsListElements = document.querySelector(".cards__list");
const modalContainerEl = document.querySelector(".modal__container");
const modalAddProfile = document.querySelector("#modal-add-profile");
const profileAddEditor = document.querySelector(".profile__add-editor");
const profileCloseEl = modalAddProfile.querySelector(".modal__close-tag");
const modalAddForm = document.querySelector("#modal-add-form");
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyDown);
}
function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyDown);
}

profileEditor.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(profileModal);
});
porfileModalCloseButton.addEventListener("click", function () {
  closePopup(profileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileModal);
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

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

////////  toggleButtonState

function handleImageSubmit(evt) {
  const { inactiveButtonClass } = config;
  const buttonElement = document.querySelector(".modal__button");

  evt.preventDefault();
  const title = evt.target.title.value;
  const link = evt.target.link.value;
  renderCard({
    name: title,
    link: link,
  });
  closePopup(modalAddProfile);
  modalAddForm.reset();
  /////// THIS ONE //////
  toggleButtonState([evt.target.title, evt.target.link], buttonElement, {
    inactiveButtonClass,
  });
}
modalAddForm.addEventListener("submit", handleImageSubmit);

function addModalOutsideClickListener(modalElement) {
  modalElement.addEventListener("mousedown", (evt) => {
    if (evt.target === evt.currentTarget) closePopup(modalElement);
  });
}
addModalOutsideClickListener(profileModal);
addModalOutsideClickListener(modalAddProfile);
addModalOutsideClickListener(modalCardScreenSize);

const openedModal = document.querySelector(".modal_opened");
console.log(openedModal);
const handleEscKeyDown = function (e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
};
