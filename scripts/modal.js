//variables

const editModal = document.querySelector('.modal_type_edit');
const addModal = document.querySelector('.modal_type_add');

const editForm = document.querySelector(".edit-form");
const addForm = document.querySelector(".add-form");

// open modal

export const openModal = ((modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener('keydown', closeModalWithEscButton);
  modal.addEventListener('click', closeModalWithOverlayClick);
});

// close modal

export const closeModal = ((modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener('keydown', closeModalWithEscButton);
  modal.removeEventListener('click', closeModalWithOverlayClick);
});

const getCurrentlyOpenedModal = () => document.querySelector('.modal_opened');

const closeModalWithEscButton = ((evt) => {
  const openedModal = getCurrentlyOpenedModal();
  if (evt.key === "Escape") {
    closeModal(openedModal);
  }
});

const closeModalWithOverlayClick = ((evt) => {
  const openedModal = getCurrentlyOpenedModal();
  if (evt.target.classList.contains('modal') || evt.target.classList.contains('modal__close-btn')) {
    closeModal(openedModal);
  }
});
