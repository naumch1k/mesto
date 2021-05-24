import {
  ESCAPE_KEY
} from '../utils/constants.js';

export default class Popup {

  static selectors = {
    popupCloseButton: ".popup__close-btn",
    popupClass: "popup",
    popupOpened: "popup_opened"
  }

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add(Popup.selectors.popupOpened);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }

  closePopup() {
    this._popup.classList.remove(Popup.selectors.popupOpened);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._handleOverlayClose);
  }

  _handleEscClose(evt) {
    if (evt.key === ESCAPE_KEY) {
      this.closePopup();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains(Popup.selectors.popupClass)) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup.querySelector(Popup.selectors.popupCloseButton).addEventListener('click', () => this.closePopup());
  }
}
