import {Card} from './Card.js';
import {initialCards} from './initial-сards.js';
import {openModal, closeModal} from './modal.js';

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

const editFormSubmitHandler = ((evt) => {
  evt.preventDefault();
  profileName.textContent = editFormInputName.value;
  profileBio.textContent = editFormInputBio.value;
  closeModal(editModal);
});

const addFormSubmitHandler = ((evt) => {
  evt.preventDefault();
  // add a new element to elements
  createCard({name: addFormInputName.value, link: addFormInputLink.value, alt: `Изображение ${addFormInputName.value}`}, '#element-template');

  disableFormSubmitButton(addFormSubmitButton);
  closeModal(addModal);
});

const disableFormSubmitButton = (button) => {
  button.classList.add("form__submit-btn_disabled");
  button.setAttribute("disabled", true);
}

const createCard = (data, cardSelector) => {
  const element = new Card(data, cardSelector);
  const cardElement = element.generateCard();
  elements.prepend(cardElement);
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

initialCards.forEach((item) => {
  createCard(item, Card.selectors.template);
});
