import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
  constructor(modalSelector, submitHandler) {
    super(modalSelector);
    this._submitHandler = submitHandler;

    this._form = this._modal.querySelector(".form");
    this._inputList = Array.from(this._form.querySelectorAll(".form__item"));
  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }

  closeModal() {
    super.closeModal();
    this._form.reset();
  }
}