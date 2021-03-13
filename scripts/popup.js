let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-btn");
let form = document.querySelector(".form");
let inputName = form.querySelector(".form__item_el_name");
let inputBio = form.querySelector(".form__item_el_bio"); 
let profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile__name");
let profileBio = profile.querySelector(".profile__bio");
let editButton = profile.querySelector(".profile__edit-btn");

editButton.addEventListener ("click", function () {
  popup.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
});

closeButton.addEventListener ("click", function () {
  popup.classList.remove("popup_opened");
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  popup.classList.remove("popup_opened");
}

form.addEventListener('submit', formSubmitHandler);