import './index.css';
import Card from '../components/Card.js';
import ModalWithForm from '../components/ModalWithForm.js';
import ModalWithImage from '../components/ModalWithImage.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from '../utils/initial-сards.js';
import {
  cardListSelector,
  openEditModalBtn,
  openAddModalBtn,
  editForm,
  addForm,
  addFormSubmitButton,
  formValidationSettings,
  userNameSelector,
  userBioSelector,
  editFormInputName,
  editFormInputBio,
  elements
} from '../utils/constants.js';

// edit profile

const editFormValidator = new FormValidator(formValidationSettings, editForm);

const editFormSubmitHandler = ((data) => {

  const userInfo = new UserInfo({ userNameSelector, userBioSelector });
  userInfo.setUserInfo(data);
  editModal.closeModal();
});

const editModal = new ModalWithForm('.modal_type_edit', editFormSubmitHandler);

// add card

const addFormValidator = new FormValidator(formValidationSettings, addForm);

const addFormSubmitHandler = ((data) => {
  
  const cardElement = createCard(data, '#element-template');
  elements.prepend(cardElement);

  disableFormSubmitButton(addFormSubmitButton);
  addModal.closeModal();
});

const createCard = (data, cardSelector) => {
  const element = new Card(data, cardSelector, cardImageClickHandler);
  const cardElement = element.generateCard();
  return cardElement;
}

const disableFormSubmitButton = (button) => {
  button.classList.add("form__submit-btn_disabled");
  button.setAttribute("disabled", true);
}

const addModal = new ModalWithForm('.modal_type_add', addFormSubmitHandler);

// view card image

function cardImageClickHandler(name, link, alt = `Изображение ${name}`) {
  imageModal.openModal(name, link, alt);
}

const imageModal = new ModalWithImage('.modal_type_image');

// enable form validation

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// set event listeners

editModal.setEventListeners();
addModal.setEventListeners();
imageModal.setEventListeners();

openEditModalBtn.addEventListener ('click', function () {
  const userInfo = new UserInfo({ userNameSelector, userBioSelector });
  const userData = userInfo.getUserInfo();
  editFormInputName.value = userData.name;
  editFormInputBio.value = userData.bio;
  editModal.openModal();
  editFormValidator.setInitialState();
});

openAddModalBtn.addEventListener ("click", function () {
  addModal.openModal();
  addFormValidator.setInitialState();
});

// open page with 6 initial cards added by JavaScript

const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, Card.selectors.template);
    cardList.addItem(cardElement);
  }
}, cardListSelector)

cardList.renderItems();
