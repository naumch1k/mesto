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

let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-btn");
let form = document.querySelector(".form");
let inputName = form.querySelector(".form__item_el_name");
let inputBio = form.querySelector(".form__item_el_bio"); 
let profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile__name");
let profileBio = profile.querySelector(".profile__bio");
let editButton = profile.querySelector(".profile__edit-btn");

// Create a new element using template

const elements = document.querySelector('.elements__list');

function addElement (name, link, alt) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__image').src = link;
  element.querySelector('.element__image').alt = alt;
  element.querySelector('.element__title').textContent = name;

  element.querySelector('.element__like-btn').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-btn_active');
  })

  elements.append(element);
}

// When the page opens, there should be 6 cards added by JavaScript

for (let i = 0; i < initialCards.length; i++) {
  addElement(initialCards[i].name, initialCards[i].link, initialCards[i].alt);
}

function openPopup () {
  popup.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
}

function closePopup () {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closePopup ();
}

editButton.addEventListener ("click", openPopup);

closeButton.addEventListener ("click", closePopup);

form.addEventListener('submit', formSubmitHandler);