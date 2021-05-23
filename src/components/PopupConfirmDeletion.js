import Popup from './Popup.js';

export default class PopupConfirmDeletion extends Popup {

  static selectors = {
    form: ".form"
  }
  
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector(PopupConfirmDeletion.selectors.form);
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }

  setSubmitHandler(handleSubmit) {
    this._handleSubmit = handleSubmit;
  }
}