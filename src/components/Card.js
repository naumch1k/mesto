export default class Card {

  static selectors = {
    template: "#element-template",
    element: ".element",
    elementImage: ".element__image",
    elementTitle: ".element__title",
    deleteButton: ".element__delete-btn",
    deleteButtonHiddenClass: "element__delete-btn_hidden",
    likeButton: ".element__like-btn",
    likeCount: ".element__like-count",
    likeButtonActive: "element__like-btn_active"
  }

  constructor(data, cardSelector, { currentUser, handleCardClick, handleDeleteButtonClick, handleLike, deleteLike }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._id = data._id;
    this._likeCounter = data.likes;
    this._owner = data.owner._id;
    this._currentUser = currentUser;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLike = handleLike;
    this._deleteLike = deleteLike;
  }

  _getTemplate() {
    const newElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector(Card.selectors.element)
    .cloneNode(true);

    return newElement;
  }

  _setLikeCount() {
    this._element.querySelector(Card.selectors.likeCount).textContent = this._likeCounter.length;
  }

  _getLikesNumber(data) {
    return String(data.likes.length)
  }
  
  like(data) {
    this._element.querySelector(Card.selectors.likeButton).classList.add(Card.selectors.likeButtonActive);
    this._element.querySelector(Card.selectors.likeCount).textContent = this._getLikesNumber(data);
  }

  deleteLike(data) {
    this._element.querySelector(Card.selectors.likeButton).classList.remove(Card.selectors.likeButtonActive);
    this._element.querySelector(Card.selectors.likeCount).textContent = this._getLikesNumber(data);
  }

  _ifLikedByCurrentUser() {
    this._data.likes.forEach((likeOwner) => {
      if (likeOwner._id === this._currentUser) {
        this._element.querySelector(Card.selectors.likeButton).classList.add(Card.selectors.likeButtonActive);
      }
    })
  }

  _setEventListeners() {
    this._element.querySelector(Card.selectors.deleteButton).addEventListener('click', () => this._handleDeleteButtonClick());

    this._element.querySelector(Card.selectors.likeButton).addEventListener('click', () => {
      if (this._element.querySelector(Card.selectors.likeButton).classList.contains(Card.selectors.likeButtonActive)) {
        this._deleteLike();
      } else {
        this._handleLike();
      }
    });

    this._element.querySelector(Card.selectors.elementImage).addEventListener('click', () => this._handleCardClick(this._data));
  }

  getId() {
    return this._id;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(Card.selectors.elementImage);

    this._setLikeCount();
    this._ifLikedByCurrentUser();
    this._setEventListeners();
  
    this._image.src = this._link;
    this._element.querySelector(Card.selectors.elementTitle).textContent = this._name;
    this._image.alt = this._alt;

    if (this._owner === this._currentUser) {
      this._element.querySelector(Card.selectors.deleteButton).classList.remove(Card.selectors.deleteButtonHiddenClass)
    }
  
    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
