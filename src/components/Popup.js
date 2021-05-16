export default class Popup {

  static selectors = {
    popupCloseButton: ".modal__close-btn",
    popupClass: "modal",
    popupOpened: "modal_opened"
  }

  constructor(popupSelector) {
    this._modal = document.querySelector(popupSelector);
  }

  openModal () {
    this._modal.classList.add(Popup.selectors.popupOpened);
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._modal.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }

  closeModal () {
    this._modal.classList.remove(Popup.selectors.popupOpened);
    document.removeEventListener('keydown', this._handleEscClose);
    this._modal.removeEventListener('click', this._handleOverlayClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains(Popup.selectors.popupClass)) {
      this.closeModal();
    }
  }

  setEventListeners() {
    this._modal.querySelector(Popup.selectors.popupCloseButton).addEventListener('click', () => this.closeModal());
  }
}
