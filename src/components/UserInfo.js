export default class UserInfo {
  constructor(userData) {
    this._name = document.querySelector(userData.userNameSelector);
    this._bio = document.querySelector(userData.userBioSelector);
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