import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import {
  Selector,
  initialCards,
  profileName,
  profileJob,
  profileInfoEditor,
  config,
  editFormElement,
  addFormElement,
  profileAddImageEditor,
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
  const cardEl = new Card(data, "#card-template", handleCardClick);
  const cardElement = cardEl.generateCard();

  cardSection.addItems(cardElement);
};

////////////--------------popupWithImage

const handleCardClick = ({ name, link }) => {
  const imagePopup = new PopupWithImage({ popupSelector: "#card-fullscreen" });
  imagePopup.setEventListeners();
  imagePopup.open({ name, link });
};

//// ----- intances of SECTION class
const cardSection = new Section(
  {
    data: initialCards,

    renderer: render,
  },
  Selector.cardSection
);
cardSection.renderItems();

////----- Popup With Form -----////

const newCardPupup = new PopupWithForm({
  popupSelector: "#modal-add-profile",
  handleAddCardSubmit: (inputValues) => {
    render(inputValues);
    newCardPupup.close();
  },
});
newCardPupup.setEventListeners();

///------  intences of userInfo class

const userInfo = new UserInfo(".profile__title", ".profile__subtitle");
const profilePopup = new PopupWithForm({
  popupSelector: "#modal-edit-profile",
  handleAddCardSubmit: (data) => {
    userInfo.setUserInfo(data);
    profilePopup.close();
  },
});
profilePopup.setEventListeners();

///////---------event listeners

profileInfoEditor.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileName.value = userData.name;
  profileJob.value = userData.title;
  editFormValidator.toggleButtonState();
  profilePopup.open();
});
profileAddImageEditor.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPupup.open();
});
