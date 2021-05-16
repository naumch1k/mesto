import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  
  static selectors = {
    popupImage: '.popup__image',
    popupImageCaption: '.popup__image-caption'
  }

  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(PopupWithImage.selectors.popupImage);
    this._popupImageCaption = this._popup.querySelector(PopupWithImage.selectors.popupImageCaption);
  }

  openPopup (name, link, alt) {
    this._popupImageCaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = alt;
    super.openPopup();
  }
}