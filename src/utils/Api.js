export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([
      this.getInitialCards(),
      this.getUserInfo(),
      // this.userProfilePicture(),
    ]);
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._processResponse)
      .then((data) => {
        // console.log(data);
        return data.reverse();
      });
  }

  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._processResponse);
    // .then((data) => {
    //   return data;
    // });
  }

  postNewCard({ title, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: title,
        link: link,
      }),

      headers: this._headers,
    }).then(this._processResponse);
    // .then((data) => {
    //   return data;
    // });
  }

  ///DELETE CARD
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",

      headers: this._headers,
    }).then(this._processResponse);
    // .then((data) => {
    //   return data;
    // });
  }

  /// profilePicture
  userProfilePicture(url) {
    return fetch(`${this._baseUrl}/cards/likes/id/me`, {
      method: "PATCH",

      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._processResponse);
  }

  addCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._processResponse);
  }
  removeCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._processResponse);
  }

  profileAvatarUpdate(link) {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(this._processResponse)
      .then((data) => {
        return data.avatar;
      });
  }
  setProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._processResponse);
  }
}
