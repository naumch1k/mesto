import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  
  static selectors = {
    popupImage: '.modal__image',
    popupImageCaption: '.modal__image-caption'
  }

  constructor(modalSelector) {
    super(modalSelector);
    this._modalImage = this._modal.querySelector(PopupWithImage.selectors.popupImage);
    this._modalImageCaption = this._modal.querySelector(PopupWithImage.selectors.popupImageCaption);
  }

  openModal (name, link, alt) {
    this._modalImageCaption.textContent = name;
    this._modalImage.src = link;
    this._modalImage.alt = alt;
    super.openModal();
  }
}