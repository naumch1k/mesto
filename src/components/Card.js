import {popupSelectors} from '../utils/constants.js';
const imagePopup = document.querySelector(popupSelectors.imagePopupSelector);

export default class Card {

  static selectors = {
    template: "#element-template",
    element: ".element",
    elementImage: ".element__image",
    elementTitle: ".element__title",
    deleteButton: ".element__delete-btn",
    likeButton: ".element__like-btn",
    likeCount: ".element__like-count",
    likeButtonActive: "element__like-btn_active"
  }

  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._likeCounter = data.likes;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const newElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector(Card.selectors.element)
    .cloneNode(true);

    return newElement;
  }

  _handleLike() {
    this._element.querySelector(Card.selectors.likeButton).classList.toggle(Card.selectors.likeButtonActive);
  }

  _setLikeCount() {
    this._element.querySelector(Card.selectors.likeCount).textContent = this._likeCounter.length;
  }

  _handleCardClick(name, link) {
    imagePopup.openPopup(name, link, alt);
  }

  _setEventListeners() {
    this._element.querySelector(Card.selectors.deleteButton).addEventListener('click', () => this._element.remove());
    this._element.querySelector(Card.selectors.likeButton).addEventListener('click', () => this._handleLike());
    this._element.querySelector(Card.selectors.elementImage).addEventListener('click', () => this._handleCardClick(this._name, this._link, this._alt));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(Card.selectors.elementImage);
    console.log(this._element);
    this._setLikeCount();


    this._setEventListeners();
  
    this._image.src = this._link;
    this._element.querySelector(Card.selectors.elementTitle).textContent = this._name;
    this._image.alt = this._alt;
  
    return this._element;
  }
}
