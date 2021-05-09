export default class Modal {

  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
  }

  openModal () {
    this._modal.classList.add("modal_opened");
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._modal.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }

  closeModal () {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener('keydown', this._handleEscClose);
    this._modal.removeEventListener('click', this._handleOverlayClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('modal') || evt.target.classList.contains('modal__close-btn')) {
      this.closeModal();
    }
  }

  setEventListeners() {
    this._modal.querySelector('.modal__close-btn').addEventListener('click', () => this.closeModal());
  }
}
