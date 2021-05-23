export default class UserInfo {
  constructor(userData) {
    this._name = document.querySelector(userData.userNameSelector);
    this._about = document.querySelector(userData.userBioSelector);
    this._avatar = document.querySelector(userData.userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo({ name, about} ) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  getUserId() {
    return {
      user: this._element.textContent
    }
  }
}