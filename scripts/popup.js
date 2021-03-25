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

// variables

const profile = document.querySelector(".profile");
const editModal = document.querySelector('.popup-edit');
const addModal = document.querySelector('.popup-add');

// open modal

const openEditModalBtn = profile.querySelector(".profile__edit-btn");
const openAddModalBtn = profile.querySelector(".profile__add-btn");

function openModal(modal) {
  modal.classList.add("popup_opened");
  
  if (modal === editModal) {
    inputName.value = profileName.textContent;
    inputBio.value = profileBio.textContent;
  }
}

openEditModalBtn.addEventListener ("click", () => openModal(editModal));
openAddModalBtn.addEventListener ("click", () => openModal(addModal));

// close modal

const closeEditModalBtn = editModal.querySelector(".popup__close-btn");
const closeAddModalBtn = addModal.querySelector(".popup-add__close-btn");


function closeModal(modal) {
  modal.classList.remove("popup_opened");
}

closeEditModalBtn.addEventListener ("click", () => closeModal(editModal));
closeAddModalBtn.addEventListener ("click", () => closeModal(addModal));


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

const editForm = document.querySelector(".edit-form");
const inputName = editForm.querySelector(".form__item_el_name");
const inputBio = editForm.querySelector(".form__item_el_bio");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");


function editFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closeModal(editModal);
}

editForm.addEventListener('submit', editFormSubmitHandler);

// Add Element Popup

const addForm = document.querySelector(".add-form");
const inputElName = addForm.querySelector(".form__item_el_name");
const inputElLink = addForm.querySelector(".form__item_el_link");

function addFormSubmitHandler (evt) {
  evt.preventDefault();
  addElement(inputElName.value, inputElLink.value);
  inputElName.value = "";
  inputElLink.value = "";
  closeModal(addModal);
}

addForm.addEventListener('submit', addFormSubmitHandler);