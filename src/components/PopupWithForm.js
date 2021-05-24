import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  static selectors = {
    form: ".form",
    formItem: ".form__item",
    formSubmitButton: ".form__submit-btn"
  }

  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;

    this._form = this._popup.querySelector(PopupWithForm.selectors.form);
    this._submitButton = this._form.querySelector(PopupWithForm.selectors.formSubmitButton);
    this._initialSubmitButtonValue = this._submitButton.textContent;
  }

  renderLoading(isLoading, buttonValue = 'Cохранение...') {
    if (isLoading) {
      this._submitButton.textContent = buttonValue;
    } else {
      this._submitButton.textContent = this._initialSubmitButtonValue;
    }
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
