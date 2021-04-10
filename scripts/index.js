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
  document.addEventListener('keydown', closeWithEscButton);
  setOverlayClickEventListener(modal);
}

openEditModalBtn.addEventListener ('click', function () {
  openModal(editModal);
  editFormInputName.value = profileName.textContent;
  editFormInputBio.value = profileBio.textContent;
});

openAddModalBtn.addEventListener ("click", () => openModal(addModal));

// close modal

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener('keydown', closeWithEscButton);
}

const closeWithEscButton = function(evt) {
  const openedModal = document.querySelector('.modal_opened');
  if (evt.key === "Escape") {
    closeModal(openedModal);
  }
}

const setOverlayClickEventListener = ((modal) => {
  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('modal') || evt.target.classList.contains('modal__close-btn')) {
      closeModal(modal);
    }
  })
});

// create an element using template

const elements = document.querySelector('.elements__list');

function createElement (name, link, alt = `Изображение ${name}`) {
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

  const imageModalImage = imageModal.querySelector('.modal__image');
  const imageModalCaption = imageModal.querySelector('.modal__image-caption');

  function imageClickHandler () {
    imageModalImage.src = link;
    imageModalCaption.textContent = name;
    openModal(imageModal);
  }

  elementImage.addEventListener('click', imageClickHandler);
  
  return element;
}

// add an element to elements

const addElement = function(name, link, alt) {
  const element = createElement(name, link, alt);
  elements.append(element);
}

// when page opens, there should be 6 elements added by JavaScript

function initializePhotos(arr) {
  arr.forEach((item) => {
    addElement(item.name, item.link, item.alt);
  });
}

initializePhotos(initialCards);

// edit profile

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

// add element

const addForm = document.querySelector(".add-form");
const addFormInputName = addForm.querySelector(".form__item_el_name");
const addFormInputLink = addForm.querySelector(".form__item_el_link");

function addFormSubmitHandler (evt) {
  evt.preventDefault();
  const newElement = createElement(addFormInputName.value, addFormInputLink.value);
  elements.prepend(newElement);
  addForm.reset();
  closeModal(addModal);
}

addForm.addEventListener('submit', addFormSubmitHandler);
