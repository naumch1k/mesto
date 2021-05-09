import {Card} from '../components/Card.js';
import ModalWithForm from '../components/ModalWithForm.js';
import ModalWithImage from '../components/ModalWithImage.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {initialCards} from '../utils/initial-сards.js';
import {
  cardListSelector
} from '../utils/constants.js';

// form validation settings

const formValidationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_active'
};

// variables

const profile = document.querySelector(".profile");
const openEditModalBtn = profile.querySelector(".profile__edit-btn");
const openAddModalBtn = profile.querySelector(".profile__add-btn");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");

const elements = document.querySelector('.elements__list');

const editForm = document.querySelector(".edit-form");
const editFormInputName = editForm.querySelector(".form__item_el_name");
const editFormInputBio = editForm.querySelector(".form__item_el_bio");

const editFormValidator = new FormValidator(formValidationSettings, editForm);
editFormValidator.enableValidation();


const addForm = document.querySelector(".add-form");
const addFormInputName = addForm.querySelector(".form__item_el_name");
const addFormInputLink = addForm.querySelector(".form__item_el_link");
const addFormSubmitButton = addForm.querySelector(".form__submit-btn");

const addFormValidator = new FormValidator(formValidationSettings, addForm);
addFormValidator.enableValidation();

const imageModal = new ModalWithImage('.modal_type_image');
imageModal.setEventListeners();

// functions

const editFormSubmitHandler = (() => {
  profileName.textContent = editFormInputName.value;
  profileBio.textContent = editFormInputBio.value;

  editModal.closeModal();
});

const addFormSubmitHandler = (() => {
  // add a new element to elements
  const cardElement = createCard({name: addFormInputName.value, link: addFormInputLink.value, alt: `Изображение ${addFormInputName.value}`}, '#element-template');
  elements.prepend(cardElement);

  disableFormSubmitButton(addFormSubmitButton);
  addModal.closeModal();
});


const editModal = new ModalWithForm('.modal_type_edit', editFormSubmitHandler);
editModal.setEventListeners();


const addModal = new ModalWithForm('.modal_type_add', addFormSubmitHandler);
addModal.setEventListeners();


const disableFormSubmitButton = (button) => {
  button.classList.add("form__submit-btn_disabled");
  button.setAttribute("disabled", true);
}

function cardImageClickHandler(name, link, alt = `Изображение ${name}`) {
  imageModal.openModal(name, link, alt);
}

const createCard = (data, cardSelector) => {
  const element = new Card(data, cardSelector, cardImageClickHandler);
  const cardElement = element.generateCard();
  return cardElement;
}

// event listeners

openEditModalBtn.addEventListener ('click', function () {
  editModal.openModal();
  editFormInputName.value = profileName.textContent;
  editFormInputBio.value = profileBio.textContent;
  editFormValidator.setInitialState();
});

openAddModalBtn.addEventListener ("click", function () {
  addModal.openModal();
  addFormValidator.setInitialState();
});

// when page opens, there should be 6 elements added by JavaScript

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, Card.selectors.template);
    cardList.addItem(cardElement);
  }
}, cardListSelector)

cardList.renderItems();
