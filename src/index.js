import './pages/index.css'; 
import {createCard} from './components/card.js'; 
import {openPopup, closePopup} from './components/modals.js'; 
import { enableValidation, clearValidation } from './components/validation.js'; 
import { loadUserInfo, loadCards, saveProfileData, addCard, changeAvatar } from './components/api.js'; 
 
const popupList = document.querySelectorAll('.popup'); 
//добавляем каждому попапу анимацию 
popupList.forEach(function(popup){ 
  popup.classList.add('popup_is-animated'); 
}) 
 
//задаем глобальные переменные 
const cardsConteiner = document.querySelector('.places__list');
const avatarButton = document.querySelector('.profile__image'); 
const editButton = document.querySelector('.profile__edit-button'); 
const addButton = document.querySelector('.profile__add-button'); 
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupNewCard = document.querySelector('.popup_type_new-card'); 
const popupImage = document.querySelector('.popup_type_image'); 
const popupAvatar = document.querySelector('.popup_type_change-avatar'); 
 
//задаем массив всех кнопок закрытия попапа 
const closePopupButtons = document.querySelectorAll('.popup__close'); 
const crossIcons = Array.from(closePopupButtons); 
 
//каждому крестику задаем обработчик событий на клик 
crossIcons.forEach(function (icon) { 
  icon.addEventListener('click', function(){ 
    closePopup(icon.closest('.popup')); 
  }); 
}); 
 
//работаем со значением формы для смены аватарки 
const changeAvatarForm = document.forms.change_avatar; 
const inputAvatarURL = changeAvatarForm.elements.link; 
 
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
 
//работаем со значением формы для добавления карточки 
const newPlaceForm = document.forms.new_place; 
const inputPlace = newPlaceForm.elements.place_name; 
const inputURL = newPlaceForm.elements.link; 
 
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
  clearValidation(profileForm, validationConfig); 
  setValuesEditForm(); 
}); 
editNameForm.addEventListener('submit', function(evt){ 
  renderLoading(true, popupEdit); 
  evt.preventDefault();
  saveProfileData(inputName.value, inputJob.value) 
  .then(res => { 
    profileTitle.textContent = res.name; 
    profileDescription.textContent = res.about; 
    closePopup(popupEdit)
  }) 
  .catch(err => console.log('Ошибка обновления данных пользователя')) 
  .finally(res => { 
    renderLoading(false, popupEdit) 
  })  
}); 
 
//отслеживание кликов по модальному окну добавления карточки 
addButton.addEventListener('click', function() { 
  openPopup(popupNewCard); 
  newPlaceForm.reset(); 
  clearValidation(placeForm, validationConfig); 
}); 
newPlaceForm.addEventListener('submit', function(evt) { 
  evt.preventDefault(); 
  renderLoading(true, popupNewCard); 
  addCard(inputPlace.value, inputURL.value) 
  .then(data => { 
    const myId = data.owner._id; 
    const cardId = data._id; 
    const newCard = createCard(data, showImage, myId, cardId); 
    cardsConteiner.prepend(newCard); 
    closePopup(popupNewCard) 
  }) 
  .catch(err => { 
    console.log('Ошибка при добавлении карточки:', err) 
  }) 
  .finally(res => { 
    renderLoading(false, popupNewCard) 
  }) 
}) 
 
//отслеживание кликов по модальному окну редактирования аватарки 
avatarButton.addEventListener('click', function() { 
  openPopup(popupAvatar); 
  changeAvatarForm.reset(); 
  clearValidation(changeAvatarForm, validationConfig); 
}) 
 
changeAvatarForm.addEventListener('submit', function(evt) { 
  evt.preventDefault(); 
  renderLoading(true, popupAvatar); 
  changeAvatar(inputAvatarURL.value) 
  .then(data => { 
    const profileAvatar = document.querySelector('.profile__image'); 
    profileAvatar.setAttribute('style', `background-image: url(${data})`) 
    closePopup(popupAvatar) 
  }) 
  .catch(err => console.log('Ошибка при обновлении аватара: ', err)) 
  .finally(res => { 
    renderLoading(false, popupAvatar); 
  }) 
}) 
 
//////////////////////////////////////////////////////////////////////// 
//валидация для форм 
const profileForm = document.querySelector('.edit_profile_form'); 
const placeForm = document.querySelector('.new_place_form'); 

const validationConfig = { 
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_inactive', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup-input-error_active' 
} 

enableValidation(validationConfig); 
 
 
 
//////////////////////////////////////////////////////////////////////// 
//запросы к серверу 
 
Promise.all([loadUserInfo(), loadCards()]) 
.then(([userInfo, cardsArr]) => { 
  const profileAvatar = document.querySelector('.profile__image'); 
  profileAvatar.setAttribute('style', `background-image: url(${userInfo.avatar})`) 
  profileTitle.textContent = userInfo.name; 
  profileDescription.textContent = userInfo.about; 
  const myId = userInfo._id; 
   
  cardsArr.forEach(function (cardData) { 
    const card = createCard(cardData, showImage, myId, cardId); 
    cardsConteiner.append(card); 
    const cardId = cardData._id;
  }) 
}) 
.catch((err) => { 
  console.log('Запрос не выполнен: ', err) 
}) 
 
//уведомление о загрузке 
function renderLoading(isLoading, popup) { 
  const submitButton = popup.querySelector('.popup__button'); 
  if(isLoading) { 
    submitButton.textContent = 'Сохранение...'; 
  } 
  else { 
    submitButton.textContent = 'Сохранить'; 
  } 
} 