import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import {
  Selector,
  profileName,
  profileJob,
  profileInfoEditor,
  config,
  editFormElement,
  addFormElement,
  profileAddImageEditor,
  profilePictureUpdate,
  profileAddFormEl,
} from "../utils/Consants.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../utils/Api.js";
import PopupConfirmation from "../components/PopupConfirmation.js";
let cardSection;
let userId;
let userInfo;
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
const profileAddAvatar = new FormValidator(config, profileAddFormEl);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
profileAddAvatar.enableValidation();

const cardDltModel = new PopupConfirmation(
  { popupSelector: "#card-delete" },
  "Deleting..."
);

cardDltModel.setEventListeners();

const renderCard = (data) => {
  const cardEl = new Card({
    data,
    handleCardClick: ({ name, link }) => {
      imagePopup.open({ name, link });
    },

    handleCardDlt: () => {
      cardDltModel.open();

      cardDltModel.setConfirmHandler(() => {
        cardDltModel.renderLoading(true);
        const cardId = cardEl.getId();
        api
          .deleteCard(cardId)
          .then(() => {
            cardEl.handleDeleteIcon();

            cardDltModel.close();
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            cardDltModel.renderLoading(false);
          });
      });
    },
    userId: userId,
    cardLikeUpdate: () => {
      const id = cardEl.getId();
      if (cardEl.isLiked()) {
        api
          .removeCardLike(id)
          .then((data) => {
            cardEl.setLikes(data.likes);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        api
          .addCardLike(id)
          .then((data) => {
            cardEl.setLikes(data.likes);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    cardSelector: "#card-template",
  });
  const cardElement = cardEl.generateCard();
  cardEl.setLikes(data.likes);
  return cardElement;
};

////////////--------------popupWithImage

const imagePopup = new PopupWithImage({ popupSelector: "#card-fullscreen" });
imagePopup.setEventListeners();

//// ----- intances of SECTION class

function render(data) {
  const cardImage = renderCard(data);
  cardSection.addItems(cardImage);
}

api.getAppInfo().then(([cards, getUserInfo]) => {
  userId = getUserInfo._id;

  userInfo = new UserInfo(
    ".profile__title",
    ".profile__subtitle",
    ".profile__image",
    ".profile__avatar-box"
  );
  userInfo.setProfileImage(getUserInfo.avatar);
  userInfo.setUserInfo(getUserInfo.name, getUserInfo.about);

  cardSection = new Section(
    {
      data: cards,
      renderer: render,
    },
    Selector.cardSection
  );
  cardSection.renderItems();
});

////----- Popup With Form -----////

const newCardPupup = new PopupWithForm(
  {
    popupSelector: "#modal-add-profile",
    handleSubmit: (inputValues) => {
      newCardPupup.renderLoading(true);
      api
        .postNewCard(inputValues)
        .then((data) => {
          render(data);
          newCardPupup.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          newCardPupup.renderLoading(false);
        });
    },
  },
  "Saving..."
);
newCardPupup.setEventListeners();

///------  intences of userInfo class

const profilePopup = new PopupWithForm(
  {
    popupSelector: "#modal-edit-profile",
    handleSubmit: (data) => {
      profilePopup.renderLoading(true);
      api
        .setProfileInfo(data.name, data.about)
        .then((info) => {
          userInfo.setUserInfo(info.name, info.about, info.avatar);

          profilePopup.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          profilePopup.renderLoading(false);
        });
    },
  },
  "Saving..."
);
profilePopup.setEventListeners();

///////---------event listeners

profileInfoEditor.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileName.value = userData.name;
  profileJob.value = userData.about;

  editFormValidator.toggleButtonState();
  profilePopup.open();
});
profileAddImageEditor.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPupup.open();
});
////- PROFILE POPUP  -////
const profilePupop = new PopupWithForm(
  {
    popupSelector: "#modal-profile-picture",
    handleSubmit: (inputValues) => {
      profilePupop.renderLoading(true);

      api
        .profileAvatarUpdate(inputValues.link)
        .then(() => {
          userInfo.setProfileImage(inputValues.link);
          profilePupop.close();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          profilePopup.renderLoading(false);
        });
    },
  },
  "Saving..."
);
profilePupop.setEventListeners();
profilePictureUpdate.addEventListener("click", () => {
  profilePupop.open();
  profileAddAvatar.toggleButtonState();
});
