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
const editModal = document.querySelector('.modal_type_edit');
const addModal = document.querySelector('.modal_type_add');
const imageModal = document.querySelector('.modal_type_image');

// open modal

const openEditModalBtn = profile.querySelector(".profile__edit-btn");
const openAddModalBtn = profile.querySelector(".profile__add-btn");

function openModal(modal) {
  modal.classList.add("modal_opened");
  
  if (modal === editModal) {
    editFormInputName.value = profileName.textContent;
    editFormInputBio.value = profileBio.textContent;
  }
}

openEditModalBtn.addEventListener ("click", () => openModal(editModal));
openAddModalBtn.addEventListener ("click", () => openModal(addModal));

// close modal

const closeEditModalBtn = editModal.querySelector(".modal__close-btn");
const closeAddModalBtn = addModal.querySelector(".modal__close-btn");
const closeImageModalBtn = imageModal.querySelector(".modal__close-btn");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

closeEditModalBtn.addEventListener ("click", () => closeModal(editModal));
closeAddModalBtn.addEventListener ("click", () => closeModal(addModal));
closeImageModalBtn.addEventListener ("click", () => closeModal(imageModal));


// Create a new element using template

const elements = document.querySelector('.elements__list');

function addElement (name, link, alt = `Изображение ${name}`, pos = 'prepend') {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');

  elementImage.src = link;
  elementImage.alt = alt;
  element.querySelector('.element__title').textContent = name;

  element.querySelector('.element__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active');
  })

  element.querySelector('.element__delete-btn').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  })

  function imageClickHandler () {
    imageModal.querySelector('.modal__image').src = link;
    imageModal.querySelector('.modal__image-caption').textContent = name;
    openModal(imageModal);
  }

  elementImage.addEventListener('click', imageClickHandler);

  if (pos === 'append') {
    elements.append(element);
  } else {
    elements.prepend(element);
  } 
}

// When the page opens, there should be 6 cards added by JavaScript

function initializePhotos(arr) {
  arr.forEach(element => {
    addElement(element.name, element.link, element.alt, 'append');
  });
}

initializePhotos(initialCards);

// Edit Profile

const editForm = document.querySelector(".edit-form");
const editFormInputName = editForm.querySelector(".form__item_el_name");
const editFormInputBio = editForm.querySelector(".form__item_el_bio");
const profileName = profile.querySelector(".profile__name");
const profileBio = profile.querySelector(".profile__bio");


function editFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = editFormInputName.value;
  profileBio.textContent = editFormInputBio.value;
  closeModal(editModal);
}

editForm.addEventListener('submit', editFormSubmitHandler);

// Add Element

const addForm = document.querySelector(".add-form");
const addFormInputName = addForm.querySelector(".form__item_el_name");
const addFormInputLink = addForm.querySelector(".form__item_el_link");

function addFormSubmitHandler (evt) {
  evt.preventDefault();
  addElement(addFormInputName.value, addFormInputLink.value);
  addFormInputName.value = "";
  addFormInputLink.value = "";
  closeModal(addModal);
}

addForm.addEventListener('submit', addFormSubmitHandler);