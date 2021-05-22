export default class Api {
  constructor(options) { //baseUrl, token, groupId
    this._baseUrl = options.baseUrl;
    this._token = options.headers.authorization;
    //this._group.Id = options.groupId;
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
  }
}
