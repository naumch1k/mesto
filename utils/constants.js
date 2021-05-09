export const cardListSelector = '.elements__list';
const profile = document.querySelector(".profile");
export const openEditModalBtn = profile.querySelector(".profile__edit-btn");
export const openAddModalBtn = profile.querySelector(".profile__add-btn");
export const editForm = document.querySelector(".edit-form");
export const addForm = document.querySelector(".add-form");
export const addFormSubmitButton = addForm.querySelector(".form__submit-btn");
export const userNameSelector = ".profile__name";
export const userBioSelector = ".profile__bio";
export const editFormInputName = editForm.querySelector(".form__item_el_name");
export const editFormInputBio = editForm.querySelector(".form__item_el_bio");
export const elements = document.querySelector('.elements__list');




export const formValidationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_active'
};