import { cardsConteiner, createCard, deleteCard, like } from "./card";

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

const popupList = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImage = document.querySelector('.popup_type_image');

const closePopupButtons = document.querySelectorAll('.popup__close');
export const crossIcons = Array.from(closePopupButtons);

//добавляем каждому попапу анимацию
popupList.forEach(function(popup){
  popup.classList.add('popup_is-animated');
})

//функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
}

//функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
}

//фукнция закрытия попапа на Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

//функция закрытия попапа на оверлей
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

//работаем со значением формы для редактирования профиля
export const editNameForm = document.forms.edit_profile;

const inputName = editNameForm.elements.name;
const inputJob = editNameForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//задаем значения полям формы для редактирования профиля
export function setValues () {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileDescription.textContent;
}

//функция редактирования профиля
export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
}

//работаем со значением формы для добавления карточки
export const newPlaceForm = document.forms.new_place;
const inputPlace = newPlaceForm.elements.place_name;
const inputURL = newPlaceForm.elements.link;

//функция добавления новой карточки на страницу
export function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const card = new Object();
  card.name = inputPlace.value;
  card.link = inputURL.value;
  const newCard = createCard(card, deleteCard, like, showImage);
  cardsConteiner.prepend(newCard);
  closePopup(evt.target.closest('.popup'));
  newPlaceForm.reset();
}

//Функция показа попапа с картинкой
export function showImage(evt) {
  const imagePopup = document.querySelector('.popup__image');
  const captionPopup = document.querySelector('.popup__caption');
  imagePopup.src = evt.target.src;
  captionPopup.textContent = evt.target.alt;

  if(evt.target.classList.contains('card__image')) {
    openPopup(popupImage);
  }
}