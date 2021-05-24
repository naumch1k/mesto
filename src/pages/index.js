import './index.css';
import Card from '../components/Card.js';
import PopupConfirmDeletion from '../components/PopupConfirmDeletion.js';
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
  openPopupButtonSelectors,
  formSelectors,
  elementsListSelector,
  profileSelector,
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

let user = null;

// variables

const profile = document.querySelector(profileSelector);
const openEditPopupBtn = profile.querySelector(openPopupButtonSelectors.openEditPopupButtonSelector);
const openAddPopupBtn = profile.querySelector(openPopupButtonSelectors.openAddPopupButtonSelector);
const openEditAvatarPopupBtn = profile.querySelector(openPopupButtonSelectors.openEditAvatarButtonSelector);
const editForm = document.querySelector(formSelectors.editProfileFormSelector);
const editFormInputName = editForm.querySelector(editFormInputNameSelector);
const editFormInputBio = editForm.querySelector(editFormInputBioSelector);
const addForm = document.querySelector(formSelectors.addFormSelector);
const editAvatarForm = document.querySelector(formSelectors.editAvatarFormSelector);

// edit profile

const editFormValidator = new FormValidator(formValidationSettings, editForm);
const editAvatarFormValidator = new FormValidator(formValidationSettings, editAvatarForm);
const userInfo = new UserInfo(userData);

const editFormSubmitHandler = ((data) => {
  editPopup.renderLoading(true);
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(() => {
      editPopup.closePopup();
      editPopup.renderLoading(false);
    })
});

// add card

const addFormValidator = new FormValidator(formValidationSettings, addForm);

const createCard = (data, cardSelector) => {
  const element = new Card(data, cardSelector, {
    currentUser: user._id,
    handleCardClick: (name, link, alt = `Изображение ${name}`) => {
      imagePopup.openPopup(name, link, alt);
    },
    handleDeleteButtonClick: () => {
      confirmPopup.openPopup();
      confirmPopup.setSubmitHandler(() => {
        api.deleteCard(element.getId())
          .catch(err => console.log(`Error: ${err}`))
          .finally(() => {
            element.removeCard();
            confirmPopup.closePopup();
          })
      })
    },
    handleLike: () => {
      api.setLike(element._data)
      .then(data => {
        element.like(data)
      })
      .catch(err => console.log(`Error: ${err}`))
    }
  });
  const cardElement = element.generateCard();
  return cardElement;
}

const cardList = new Section ({
  //items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item, Card.selectors.template));
  }
}, elementsListSelector)

const addFormSubmitHandler = ((data) => {
  addPopup.renderLoading(true);
  api.addNewCard(data)
    .then(res => {
      const cardElement = createCard(res, '#element-template');
      cardList.addItem(cardElement);
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(() => {
      addPopup.closePopup();
      addPopup.renderLoading(false);
    })
});

const editAvatarFormSubmitHandler = ((data) => {
  editAvatarPopup.renderLoading(true);
  api.setUserAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
    })
    .catch(err => console.log(`Error: ${err}`))
    .finally(() => {
      editAvatarPopup.closePopup();
      editAvatarPopup.renderLoading(false);
    })
})

const editPopup = new PopupWithForm(popupSelectors.editPopupSelector, editFormSubmitHandler);
const addPopup = new PopupWithForm(popupSelectors.addPopupSelector, addFormSubmitHandler);
const imagePopup = new PopupWithImage(popupSelectors.imagePopupSelector);
const confirmPopup = new PopupConfirmDeletion(popupSelectors.confirmPopupSelector);
const editAvatarPopup = new PopupWithForm(popupSelectors.editAvatarPopupSelector, editAvatarFormSubmitHandler);

// enable form validation

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

// set event listeners

editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();
editAvatarPopup.setEventListeners();

openEditPopupBtn.addEventListener ('click', function () {
  const userData = userInfo.getUserInfo();
  editFormInputName.value = userData.name;
  editFormInputBio.value = userData.about;
  editPopup.openPopup();
  editFormValidator.setInitialState();
});

openAddPopupBtn.addEventListener ("click", function () {
  addPopup.openPopup();
  addFormValidator.setInitialState();
});

openEditAvatarPopupBtn.addEventListener ("click", function () {
  editAvatarPopup.openPopup();
  editAvatarFormValidator.setInitialState();
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {

    // get user data from the server
    user = userData;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);

    // load cards from the server
    console.log(cards)
    cardList.renderItems(cards);
  })
