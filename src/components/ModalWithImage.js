import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalImage = this._modal.querySelector('.modal__image');
    this._modalImageCaption = this._modal.querySelector('.modal__image-caption');
  }

  openModal (name, link, alt) {
    this._modalImageCaption.textContent = name;
    this._modalImage.src = link;
    this._modalImage.alt = alt;
    super.openModal();
  }
}