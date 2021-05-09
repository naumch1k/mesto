import Modal from './Modal.js';

const imageModal = document.querySelector('.modal_type_image');
const imageModalImage = imageModal.querySelector('.modal__image');
const imageModalCaption = imageModal.querySelector('.modal__image-caption');

export class Card {

  static selectors = {
    template: "#element-template",
    elements: ".elements__list",
    element: ".element",
    elementImage: ".element__image",
    elementTitle: ".element__title",
    deleteButton: ".element__delete-btn",
    likeButton: ".element__like-btn",
    likeButtonActive: "element__like-btn_active"
  }

  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate () {
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

  _handleCardClick(name, link) {
    imageModal.openModal(name, link, alt);
  }

  _setEventListeners() {
    this._element.querySelector(Card.selectors.deleteButton).addEventListener('click', () => this._element.remove());
    this._element.querySelector(Card.selectors.likeButton).addEventListener('click', () => this._handleLike());
    this._element.querySelector(Card.selectors.elementImage).addEventListener('click', () => this._handleCardClick(this._name, this._link, this._alt));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(Card.selectors.elementImage);

    this._setEventListeners();
  
    this._image.src = this._link;
    this._element.querySelector(Card.selectors.elementTitle).textContent = this._name;
    this._image.alt = this._alt;
  
    return this._element;
  }
}

