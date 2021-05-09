import Modal from './Modal.js';

export default class ModalWithForm extends Modal {
  constructor(modalSelector, submitHandler) {
    super(modalSelector);
    this._submitHandler = submitHandler;

    this._form = this._modal.querySelector(".form");
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__item');
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  closeModal() {
    super.closeModal();
    this._form.reset();
  }
}