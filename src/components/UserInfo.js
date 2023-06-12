export default class UserInfo {
  constructor(nameSelector, titleSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._title = document.querySelector(titleSelector);
    this._profileImage = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._title.textContent,
    };
  }

  setProfileImage(link) {
    this._profileImage.src = link;
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._title.textContent = about;
  }
}
