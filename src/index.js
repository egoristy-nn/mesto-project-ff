import './pages/index.css';
import { initialCards } from './components/cards.js';
import {cardsConteiner, createCard, deleteCard, like} from './components/card.js';
import {openPopup, closePopup} from './components/modals.js';

//вывод карточек на страницу
initialCards.forEach(function (cardData) {
  const card = createCard(cardData, deleteCard, like, showImage);
  cardsConteiner.append(card);
})
          
const popupList = document.querySelectorAll('.popup');
//добавляем каждому попапу анимацию
popupList.forEach(function(popup){
  popup.classList.add('popup_is-animated');
})

//задаем глобальные переменные
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

//задаем массив всех кнопок закрытия попапа
const closePopupButtons = document.querySelectorAll('.popup__close');
const crossIcons = Array.from(closePopupButtons);

//каждому крестику задаем обработчик событий на клик
crossIcons.forEach(function (icon) {
  icon.addEventListener('click', function(){
    closePopup(icon.closest('.popup'));
  });
});

//работаем со значением формы для редактирования профиля
const editNameForm = document.forms.edit_profile;
const inputName = editNameForm.elements.name;
const inputJob = editNameForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//задаем значения полям формы для редактирования профиля
function setValuesEditForm () {
  inputName.value = profileTitle.textContent;
  inputJob.value = profileDescription.textContent;
}

//функция сохранения данных профиля
function saveValuesEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
}

//работаем со значением формы для добавления карточки
const newPlaceForm = document.forms.new_place;
const inputPlace = newPlaceForm.elements.place_name;
const inputURL = newPlaceForm.elements.link;

//функция добавления новой карточки на страницу
function saveValuesNewPlaceForm(evt) {
  evt.preventDefault();
  const card = {};
  card.name = inputPlace.value;
  card.link = inputURL.value;
  const newCard = createCard(card, deleteCard, like, showImage);
  cardsConteiner.prepend(newCard);
  closePopup(evt.target.closest('.popup'));
  newPlaceForm.reset();
}

//работаем с модальным окном-изображением карточки
const imagePopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption');
//Функция показа попапа с картинкой
function showImage(evt) {
  imagePopup.src = evt.target.src;
  imagePopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.alt;

  if(evt.target.classList.contains('card__image')) {
    openPopup(popupImage);
  }
}

//отслеживание кликов по модальному окну редактирования профиля
editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  setValuesEditForm();
});
editNameForm.addEventListener('submit', function(evt){
  saveValuesEditForm(evt);
  closePopup(popupEdit);
});

//отслеживание кликов по модальному окну добавления карточки
addButton.addEventListener('click', function() {
  openPopup(popupNewCard);
});
newPlaceForm.addEventListener('submit', saveValuesNewPlaceForm);