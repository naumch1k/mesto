let editButton = document.querySelector(".profile__edit-btn");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-btn");

editButton.addEventListener ("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("popup_opened");
});

closeButton.addEventListener ("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("popup_opened")
});