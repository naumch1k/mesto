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

  openPopup (data) {
    this._popupImageCaption.textContent = data.name;
    this._popupImage.src = data.link;
    this._popupImage.alt = data.alt;
    super.openPopup();
  }
}