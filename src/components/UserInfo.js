export default class UserInfo {
  constructor(
    nameSelector,
    titleSelector,
    avatarSelector,
    profileAvatarSelector
  ) {
    this._name = document.querySelector(nameSelector);
    this._title = document.querySelector(titleSelector);
    this._profileImage = document.querySelector(avatarSelector);
    this._profileAvatarDiv = document.querySelector(profileAvatarSelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._title.textContent,
      avatar: this._profileImage.src,
    };
  }
  // getAvatar() {
  //   return this._profileImage.src;
  // }

  updateProfileImage(link) {
    this._profileImage.src = link;
    // console.log(this._profileImage.src);
  }

  setUserInfo(name, about, avatar) {
    this._name.textContent = name;
    this._title.textContent = about;
    this._profileImage.src = avatar;
  }
}
