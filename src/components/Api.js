export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserId()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        // console.log(data);
        return data;
      });
  }

  getUserId() {
    return fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        // console.log(data);
        return data;
      });
  }

  postCard({ title, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: title,
        link: link,
      }),

      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        this.getInitialCards();
        // console.log(data);
        return data;
      });
  }

  ///DELETE CARD
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",

      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return data;
      });
  }

  /// profilePicture
  userProfilePicture(url) {
    return fetch(`${this._baseUrl}/cards/likes/id/me`, {
      method: "PATCH",

      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return data;
      });
  }

  addCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        console.log(data.likes);
        return data;
      });
  }
  removeCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",

      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return data;
      });
  }
}
