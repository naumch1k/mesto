export default class UserInfo {
  constructor({ userNameSelector, userBioSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._bio = document.querySelector(userBioSelector);
  }

  getUserInfo () {
    const userInfo = {
      name: this._name.textContent,
      bio: this._bio.textContent
    };
    return userInfo;
  }

  setUserInfo ({name, bio}) {
    this._name.textContent = name;
    this._bio.textContent = bio;
  }
}