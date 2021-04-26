import {FormValidator} from './FormValidator.js';

// form validation settings

const formValidationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_active'
};

//variables

const editModal = document.querySelector('.modal_type_edit');
const addModal = document.querySelector('.modal_type_add');

const editForm = document.querySelector(".edit-form");
const addForm = document.querySelector(".add-form");

const editFormValidator = new FormValidator(formValidationSettings, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(formValidationSettings, addForm);
addFormValidator.enableValidation();

// open modal

export const openModal = ((modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener('keydown', closeModalWithEscButton);
  modal.addEventListener('click', closeModalWithOverlayClick);

  if (modal === editModal || modal === addModal) {
    const currentForm = modal.querySelector(".form");
    currentForm.reset();
    setInitialState(currentForm);
  }
});

const setInitialState = (currentForm) => {
  if (currentForm.classList.contains("edit-form")) {
    editFormValidator.setInitialState();
  } else if (currentForm.classList.contains("add-form")) {
    addFormValidator.setInitialState();
  }
}

// close modal

export const closeModal = ((modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener('keydown', closeModalWithEscButton);
  modal.removeEventListener('click', closeModalWithOverlayClick);
});

const getCurrentlyOpenedModal = () => document.querySelector('.modal_opened');

const closeModalWithEscButton = ((evt) => {
  const openedModal = getCurrentlyOpenedModal();
  if (evt.key === "Escape") {
    closeModal(openedModal);
  }
});

const closeModalWithOverlayClick = ((evt) => {
  const openedModal = getCurrentlyOpenedModal();
  if (evt.target.classList.contains('modal') || evt.target.classList.contains('modal__close-btn')) {
    closeModal(openedModal);
  }
});
