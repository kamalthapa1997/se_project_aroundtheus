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
  profilePictureUpdate,
} from "../utils/Consants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

/////-----API
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "4fff85c9-91a1-4cf6-b04e-2066158cf62c ",
    "Content-Type": "application/json",
  },
});

/// ---Form Validation---////
const editFormValidator = new FormValidator(config, editFormElement);
const addFormValidator = new FormValidator(config, addFormElement);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

///  Create intances of classes

const render = (data) => {
  const cardEl = new Card(
    {
      data,
      handleCardClick: ({ name, link }) => {
        imagePopup.open({ name, link });
      },

      handleCardDlt: () => {
        const id = cardEl.getId();
        // console.log(id);
        api.deleteCard(id);
      },
    },
    "#card-template",
    cardLikeUpdate,
    userId
  );
  const cardElement = cardEl.generateCard();
  return cardElement;
};

////////////--------------popupWithImage

const imagePopup = new PopupWithImage({ popupSelector: "#card-fullscreen" });
imagePopup.setEventListeners();

//// ----- intances of SECTION class

let userId;

api.getAppInfo().then(([cards, userInfo]) => {
  userId = userInfo._id;
  console.log(userId);

  const cardSection = new Section(
    {
      data: cards,

      renderer: renderCard,
    },
    Selector.cardSection
  );
  cardSection.renderItems();
  function renderCard(data) {
    const cardImage = render(data);
    // console.log(cardImage);

    cardSection.addItems(cardImage);
  }
});

////----- Popup With Form -----////

const newCardPupup = new PopupWithForm({
  popupSelector: "#modal-add-profile",
  handleSubmit: (inputValues) => {
    api.postCard(inputValues);
    render(inputValues);
    newCardPupup.close();
  },
});
newCardPupup.setEventListeners();

///------  intences of userInfo class

const userInfo = new UserInfo(".profile__title", ".profile__subtitle");
const profilePopup = new PopupWithForm({
  popupSelector: "#modal-edit-profile",
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    console.log(data);
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
///////
const profilePupop = new PopupWithForm({
  popupSelector: "#profile-picture",
  handleSubmit: (inputValues) => {
    // api.postCard(inputValues);
    render(inputValues);
  },
});
profilePupop.setEventListeners();

profilePictureUpdate.addEventListener("click", () => {
  profilePupop.open();
});

function cardLikeUpdate(card) {
  if (this._likes > 0) {
    api.removeCardLike(card._id).then((data) => {
      card.setLikeInfo(data.likes);
    });
  } else {
    api.addCardLike(card._id).then((data) => {
      card.setLikeInfo(data.likes);
    });
  }
}
