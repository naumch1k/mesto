export class FormValidator {

  constructor(data, element) {
    this._data = data;
    this._element = element;
    this._inputList = Array.from(this._element.querySelectorAll(this._data.inputSelector));
    this._submitButton = this._element.querySelector(this._data.submitButtonSelector);
  }

  // set input listener to all of the form inputs
  _setEventListeners() {
    this._inputList.forEach(input =>
      input.addEventListener('input', () => this._validationHandler(input))
    );
    this._toggleSubmitButtonState();
  }

  _validationHandler = (input) => {
    this._isValid(input);
    this._toggleSubmitButtonState();
  }

  // check input validity
  _isValid = input => {
    return (!input.validity.valid)
    ? this._showInputError(input, input.validationMessage)
    : this._hideInputError(input);
  };

  // add error class
  _showInputError = (input, errorMessage) => {
    const error = this._element.querySelector(`#${input.id}-error`);

    input.classList.add(this._data.inputErrorClass);
    error.classList.add(this._data.errorClass);
    error.textContent = errorMessage;
  }

  // remove error class
  _hideInputError = input => {
    const error = this._element.querySelector(`#${input.id}-error`);
  
    input.classList.remove(this._data.inputErrorClass);
    error.classList.remove(this._data.errorClass);
    error.textContent = '';
  };

  // check all form inputs to prevent submission if any of those is invalid
  _hasInvalidInput = inputList => inputList.some(input => !input.validity.valid)

  // enable/disable form submit button
  _toggleSubmitButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._data.inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(this._data.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  // remove error class when reopen
  setInitialState() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
      this._toggleSubmitButtonState();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
