export default class UserInfo {
  constructor(userData) {
    this._name = document.querySelector(userData.userNameSelector);
    this._about = document.querySelector(userData.userBioSelector);
    this._avatar = document.querySelector(userData.userAvatarSelector);
    this._userId = 0;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo ({name, about, _id}) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._userId = _id;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}