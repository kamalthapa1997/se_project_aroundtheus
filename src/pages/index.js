import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import {
  Selector,
  initialCards,
  profileName,
  profileJob,
  profileEditor,
  config,
  editFormElement,
  addFormElement,
} from "../utils/Consants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

/// ---Form Validation---////
const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

///  Create intances of classes

const render = (data) => {
  const cardEl = new Card(data, "#card-template");
  const cardElement = cardEl.generateCard();

  cardSection.addItems(cardElement);
};

//// -----SECTION
const cardSection = new Section(
  {
    data: initialCards,

    renderer: render,
  },
  Selector.cardSection
);
cardSection.renderItems();

////-- Popup With Form -----////

const newCardPupup = new PopupWithForm({
  popupSelector: "#modal-add-profile",
  handleAddCardSubmit: (inputValues) => {
    render(inputValues);
    addFormValidator.toggleButtonState();
    addFormValidator.resetButton();
    newCardPupup.close();
  },
});
newCardPupup.setEventListeners();

///  intences of userInfo class

const userInfo = new UserInfo(".profile__title", ".profile__subtitle");
const profilePopup = new PopupWithForm({
  popupSelector: "#modal-edit-profile",
  handleAddCardSubmit: (data) => {
    userInfo.setUserInfo(data);
    editFormValidator.toggleButtonState();
    editFormValidator.resetButton();
    profilePopup.close();
  },
});

// function fillProfileForm() {
//   debugger;
//   const userData = userInfo.getUserInfo();
//   profileName.value = userData.name;
//   profileJob.value = userData.title;
// }

// function handleProfileEditSubmit(data) {
//   userInfo.setUserInfo(data);
//   profilePopup.close();
// }

//event listeners

profileEditor.addEventListener("click", () => {
  profilePopup.open();
});
