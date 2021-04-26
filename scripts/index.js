import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// variables

const editModal = document.querySelector('.modal_type_edit');
const addModal = document.querySelector('.modal_type_add');

const profile = document.querySelector(".profile");
const openEditModalBtn = profile.querySelector(".profile__edit-btn");
const openAddModalBtn = profile.querySelector(".profile__add-btn");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");

const elements = document.querySelector('.elements__list');

const editForm = document.querySelector(".edit-form");
const editFormInputName = editForm.querySelector(".form__item_el_name");
const editFormInputBio = editForm.querySelector(".form__item_el_bio");

const addForm = document.querySelector(".add-form");
const addFormInputName = addForm.querySelector(".form__item_el_name");
const addFormInputLink = addForm.querySelector(".form__item_el_link");
const addFormSubmitButton = addForm.querySelector(".form__submit-btn");

// functions

export const openModal = ((modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener('keydown', closeModalWithEscButton);
  setOverlayClickEventListener(modal);
});

const setOverlayClickEventListener = ((modal) => {
  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('modal') || evt.target.classList.contains('modal__close-btn')) {
      closeModal(modal);
    }
  })
});

const closeModal = ((modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener('keydown', closeModalWithEscButton);
});

const closeModalWithEscButton = ((evt) => {
  const openedModal = document.querySelector('.modal_opened');
  if (evt.key === "Escape") {
    closeModal(openedModal);
  }
});

const editFormSubmitHandler = ((evt) => {
  evt.preventDefault();
  profileName.textContent = editFormInputName.value;
  profileBio.textContent = editFormInputBio.value;
  closeModal(editModal);
});

const addFormSubmitHandler = ((evt) => {
  evt.preventDefault();
  // add a new element to elements
  const element = new Card({name: addFormInputName.value, link: addFormInputLink.value, alt: `Изображение ${addFormInputName.value}`}, '#element-template');
  const cardElement = element.generateCard();
  elements.prepend(cardElement);

  addForm.reset();
  disableFormSubmitButton(addFormSubmitButton);
  closeModal(addModal);
});

const disableFormSubmitButton = (button) => {
  button.classList.add("form__submit-btn_disabled");
  button.setAttribute("disabled", true);
}

// event listeners

editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);

openEditModalBtn.addEventListener ('click', function () {
  openModal(editModal);
  editFormInputName.value = profileName.textContent;
  editFormInputBio.value = profileBio.textContent;
});

openAddModalBtn.addEventListener ("click", () => openModal(addModal));

// when page opens, there should be 6 elements added by JavaScript

const initialCards = [
  {
    name: 'Laramie, WY',
    link: './images/laramie.jpg',
    alt: 'Бескрайние просторы штата Вайоминг спокойным зимним вечером'
  },
  {
    name: 'Chicago, IL',
    link: './images/chicago.jpg',
    alt: 'Оживленная улица центрального Чикаго, закат'
  },
  {
    name: 'Bangor, ME',
    link: './images/bangor.jpg',
    alt: 'Бесконечные леса штата Мэйн в ясный летний день'
  },
  {
    name: 'Virgin River Canyon, AZ',
    link: './images/virgin-river.jpg',
    alt: 'Высоченные ярко-рыжие каньоны штата Аризоны'
  },
  {
    name: 'Lucile, ID',
    link: './images/lucile.jpg',
    alt: 'Мост через Snake River, штат Айдахо, вид сверху'
  },
  {
    name: 'Atlanta, GA',
    link: './images/atlanta.jpg',
    alt: 'Полная огней ночная Антланта, штат Джорджия, с высоты птичьего полета'
  }
];

initialCards.forEach((item) => {
  const element = new Card(item, Card.selectors.template);
  const cardElement = element.generateCard();
  document.querySelector(Card.selectors.elements).append(cardElement);
});

// forms validation

const formValidationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_active'
}; 

// save all document forms as an array
const formList = Array.from(document.querySelectorAll(formValidationSettings.formSelector));

// enable validation for each document form
formList.forEach((form) => {
  const element = new FormValidator(formValidationSettings, form);
  const newElement = element.enableValidation();
});
