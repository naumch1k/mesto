import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  static selectors = {
    form: ".form",
    formItem: ".form__item"
  }

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;

    this._form = this._popup.querySelector(PopupWithForm.selectors.form);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(PopupWithForm.selectors.formItem);
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

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}