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

// Variables


const profile = document.querySelector(".profile");

// Create a new element using template

const elements = document.querySelector('.elements__list');

function addElement (name, link, alt = `Изображение ${name}`) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = alt;
  element.querySelector('.element__title').textContent = name;

  element.querySelector('.element__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active');
  })

  elements.append(element); //КАК сделать, чтобы 6 выстраиваились с 1 по 6, а новые вставали в конец??
}

// When the page opens, there should be 6 cards added by JavaScript

function initializePhotos(arr) {
  arr.forEach(element => {
    addElement(element.name, element.link, element.alt);
  });
}

initializePhotos(initialCards);

//OR

/* for (let i = 0; i < initialCards.length; i++) {
  addElement(initialCards[i].name, initialCards[i].link, initialCards[i].alt);
} */

// Edit Profile Popup

const popupEdit = document.querySelector('.popup-edit');
const editForm = document.querySelector(".edit-form");
const editButton = profile.querySelector(".profile__edit-btn");
const editFormCloseBtn = popupEdit.querySelector(".popup__close-btn");
const inputName = editForm.querySelector(".form__item_el_name");
const inputBio = editForm.querySelector(".form__item_el_bio");

const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");


function openPopupEdit () {
  popupEdit.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
}

function closePopupEdit () {
  popupEdit.classList.remove("popup_opened");
}

function editFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closePopupEdit ();
}

editButton.addEventListener ("click", openPopupEdit);
editFormCloseBtn.addEventListener ("click", closePopupEdit);
editForm.addEventListener('submit', editFormSubmitHandler);

// Add Element Popup

const popupAdd = document.querySelector('.popup-add');
const addForm = document.querySelector(".add-form");
const addButton = profile.querySelector(".profile__add-btn");
const addFormCloseBtn = popupAdd.querySelector(".popup-add__close-btn");
const inputElName = addForm.querySelector(".form__item_el_name");
const inputElLink = addForm.querySelector(".form__item_el_link");

function openPopupAdd () {
  popupAdd.classList.add("popup_opened");
}

function closePopupAdd () {
  popupAdd.classList.remove("popup_opened");
}

function addFormSubmitHandler (evt) {
  evt.preventDefault();
  addElement(inputElName.value, inputElLink.value);
  closePopupAdd ();
}

addButton.addEventListener ("click", openPopupAdd);
addFormCloseBtn.addEventListener ("click", closePopupAdd);
addForm.addEventListener('submit', addFormSubmitHandler);