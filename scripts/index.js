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
console.log(initialCards);

const profileEditor = document.querySelector(".profile__editor");
const modal = document.querySelector(".modal");

profileEditor.addEventListener("click", function () {
  modal.classList.remove("modal_opened");
});

const modalClosetag = modal.querySelector(".modal__close-tag");
modalClosetag.addEventListener("click", function () {
  modal.classList.add("modal_opened");
});

//modal name edit
const profileFormElement = document.querySelector(".modal__Edit-details");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

const nameInput = profileFormElement.querySelector(
  ".modal__edit-profile_title"
);
const jobInput = profileFormElement.querySelector(
  ".modal__edit-profile_description"
);
//const modalDetails = document.querySelector(".modal__Edit-details");
const saveButton = modal.querySelector(".modal__save-button");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  modal.classList.add("modal_opened");
}
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
