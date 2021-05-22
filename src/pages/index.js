import './index.css';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  userData,
  formValidationSettings,
  popupSelectors,
  formSelectors,
  elementsListSelector,
  profileSelector,
  openEditPopupButtonSelector,
  openAddPopupButtonSelector,
  //formSubmitButtonSelector,
  editFormInputNameSelector,
  editFormInputBioSelector
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: '2a6d7634-25aa-4e7e-bcf3-8309525480f9',
    'Content-Type': 'application/json'
  }
})

// variables

const profile = document.querySelector(profileSelector);
const openEditPopupBtn = profile.querySelector(openEditPopupButtonSelector);
const openAddPopupBtn = profile.querySelector(openAddPopupButtonSelector);
const editForm = document.querySelector(formSelectors.editFormSelector);
const editFormInputName = editForm.querySelector(editFormInputNameSelector);
const editFormInputBio = editForm.querySelector(editFormInputBioSelector);
const addForm = document.querySelector(formSelectors.addFormSelector);
//const addFormSubmitButton = addForm.querySelector(formSubmitButtonSelector);

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

const createCard = (data, cardSelector) => {
  const element = new Card(data, cardSelector, cardImageClickHandler);
  const cardElement = element.generateCard();
  return cardElement;
}

const cardList = new Section ({
  //items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, Card.selectors.template);
    cardList.addItem(cardElement);
  }
}, elementsListSelector)

const addFormSubmitHandler = ((data) => {
  const cardElement = createCard(data, '#element-template');
  cardList.addItem(cardElement);
  addPopup.closePopup();
});

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

// load cards from the server

api.getCards()
  .then(res => {
    cardList.renderItems(res);
  })
