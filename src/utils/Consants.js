export const initialCards = [
  {
    title: "Bouddha Nath",
    link: "https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG5lcGFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Patan Durbar Square",
    link: "https://images.unsplash.com/photo-1550642249-6e5605421172?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmVwYWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Namche Valley",
    link: "https://images.unsplash.com/photo-1511215579272-6192432f83bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHw4NjgwOTE5fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const Selector = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
};

export const profileModal = document.querySelector("#modal-edit-profile");
export const editFormElement = profileModal.querySelector(".modal__form");
export const profileName = editFormElement.querySelector("#modal-input-title");
export const profileJob = editFormElement.querySelector(
  "#modal-input-description"
);
export const profileInfoEditor = document.querySelector(".profile__editor");
export const modalCardCloseButton =
  document.querySelector("#card-close-button");

export const modalAddProfile = document.querySelector("#modal-add-profile");
export const addFormElement = modalAddProfile.querySelector(".modal__form");
export const profileAddImageEditor = document.querySelector(
  ".profile__add-editor"
);

export const profilePictureUpdate = document.querySelector(".profile__image");
export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
