const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_active'
}; 

// enable validation for each document form

const enableValidation = (currentSettings) => {
  const formList = Array.from(document.querySelectorAll(currentSettings.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(form.querySelectorAll(currentSettings.inputSelector));
    
    inputList.forEach((input) => {
      setEventListeners(form, inputList, input, currentSettings);
    });
  });
};

// set input listener to all of the form inputs

const setEventListeners = (form, inputList, input, currentSettings) => {
  const submitButton = form.querySelector(currentSettings.submitButtonSelector);

  input.addEventListener('input', () => {
    isValid(form, input, currentSettings);
    toggleSubmitButtonState(inputList, submitButton, currentSettings);
  });

  toggleSubmitButtonState(inputList, submitButton, currentSettings); // disable submit button before any data entry
};

// check input validity

const isValid = (form, input, currentSettings) => {
  return (!input.validity.valid) 
  ? showInputError(form, input, input.validationMessage, currentSettings) 
  : hideInputError(form, input, currentSettings);
};

// add error class

const getErrorElement = (form, input) => form.querySelector(`#${input.id}-error`);

const showInputError = (form, input, errorMessage, currentSettings) => {
  const error = getErrorElement(form, input);

  input.classList.add(currentSettings.inputErrorClass);
  error.classList.add(currentSettings.errorClass);
  error.textContent = errorMessage;
};

// remove error class

const hideInputError = (form, input, currentSettings) => {
  const error = getErrorElement(form, input);

  input.classList.remove(currentSettings.inputErrorClass);
  error.classList.remove(currentSettings.errorClass);
  error.textContent = '';
};

// check all form inputs to prevent submission if any of those is invalid

const hasInvalidInput = (inputList)  => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

// enable/disable form submit button

const toggleSubmitButtonState = (inputList, submitButton, currentSettings) => {
  if (hasInvalidInput(inputList)) {
    submitButton.setAttribute("disabled", true);
    submitButton.classList.add(currentSettings.inactiveButtonClass);
  } else {
    submitButton.classList.remove(currentSettings.inactiveButtonClass);
    submitButton.removeAttribute("disabled");
  }
};

enableValidation(validationSettings);
