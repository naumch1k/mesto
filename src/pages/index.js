import './index.css';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from '../utils/initial-сards.js';

import {
  userData,
  formValidationSettings,
  popupSelectors,
  formSelectors,
  elementsListSelector,
  profileSelector,
  openEditPopupButtonSelector,
  openAddPopupButtonSelector,
  formSubmitButtonSelector,
  disabledFormSubmitButtonClass,
  editFormInputNameSelector,
  editFormInputBioSelector
} from '../utils/constants.js';

// variables

const profile = document.querySelector(profileSelector);
const openEditPopupBtn = profile.querySelector(openEditPopupButtonSelector);
const openAddPopupBtn = profile.querySelector(openAddPopupButtonSelector);
const elements = document.querySelector(elementsListSelector);
const editForm = document.querySelector(formSelectors.editFormSelector);
const editFormInputName = editForm.querySelector(editFormInputNameSelector);
const editFormInputBio = editForm.querySelector(editFormInputBioSelector);
const addForm = document.querySelector(formSelectors.addFormSelector);
const addFormSubmitButton = addForm.querySelector(formSubmitButtonSelector);

// edit profile

const editFormValidator = new FormValidator(formValidationSettings, editForm);
const userInfo = new UserInfo(userData);

const editFormSubmitHandler = ((data) => {
  userInfo.setUserInfo(data);
  editPopup.closePopup();
});

const editPopup = new PopupWithForm(popupSelectors.editPopupSelector, editFormSubmitHandler);

// add card

const addFormValidator = new FormValidator(formValidationSettings, addForm);

const addFormSubmitHandler = ((data) => {
  
  const cardElement = createCard(data, '#element-template');
  elements.prepend(cardElement);

  disableFormSubmitButton(addFormSubmitButton);
  addPopup.closePopup();
});

const createCard = (data, cardSelector) => {
  const element = new Card(data, cardSelector, cardImageClickHandler);
  const cardElement = element.generateCard();
  return cardElement;
}

const disableFormSubmitButton = (button) => {
  button.classList.add(disabledFormSubmitButtonClass);
  button.setAttribute("disabled", true);
}

const addPopup = new PopupWithForm(popupSelectors.addPopupSelector, addFormSubmitHandler);

// view card image

function cardImageClickHandler(name, link, alt = `Изображение ${name}`) {
  imagePopup.openPopup(name, link, alt);
}

const imagePopup = new PopupWithImage(popupSelectors.imagePopupSelector);

// enable form validation

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// set event listeners

editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();

openEditPopupBtn.addEventListener ('click', function () {
  const userData = userInfo.getUserInfo();
  editFormInputName.value = userData.name;
  editFormInputBio.value = userData.bio;
  editPopup.openPopup();
  editFormValidator.setInitialState();
});

openAddPopupBtn.addEventListener ("click", function () {
  addPopup.openPopup();
  addFormValidator.setInitialState();
});

// open page with 6 initial cards added by JavaScript

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, Card.selectors.template);
    cardList.addItem(cardElement);
  }
}, elementsListSelector)

cardList.renderItems();
