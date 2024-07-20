import './pages/index.css';
import {cardsConteiner, createCard, deleteCard, like} from './components/card.js';
import {openPopup, closePopup} from './components/modals.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { loadUserInfo, loadCards, saveProfileData, addCard, removeCard, likeCard, unlikeCard, changeAvatar } from './components/api.js';

const popupList = document.querySelectorAll('.popup');
//добавляем каждому попапу анимацию
popupList.forEach(function(popup){
  popup.classList.add('popup_is-animated');
})

//задаем глобальные переменные
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
  saveValuesEditForm(evt);
  saveProfileData(profileTitle.textContent, profileDescription.textContent)
  .catch(err => console.log('Ошибка обновления данных пользователя'))
  .finally(res => {
    renderLoading(false, popupEdit)
    closePopup(popupEdit)
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
    const myId = '5c7f86bff2845991536227fe';
    const newCard = createCard(data, deleteCard, like, showImage, myId);
    cardsConteiner.prepend(newCard);
    
  })
  .catch(err => {
    console.log('Ошибка при добавлении карточки:', err)
  })
  .finally(res => {
    renderLoading(false, popupNewCard);
    closePopup(popupNewCard);
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
  })
  .catch(err => console.log('Ошибка при обновлении аватара: ', err))
  .finally(res => {
    renderLoading(false, popupAvatar);
    closePopup(popupAvatar);
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
  inactiveButtonClass: '.popup__button_inactive',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup-input-error_active'
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
    const card = createCard(cardData, deleteCard, like, showImage, myId, cardId);
    cardsConteiner.append(card);
    const cardLikes = card.querySelector('.like_counter');
    cardLikes.textContent = cardData.likes.length;
    const cardId = cardData._id;

    const likeButton = card.querySelector('.card__like-button');
    const likers = cardData.likes;

    //если лайк предварительно стоит, то сердечко черное
    const hasId = likers.some(o => o._id === myId);
    if(hasId) {
      likeButton.classList.add('card__like-button_is-active');
    }

    //обработчик клика на корзину
    card.addEventListener('click', function(evt){
      if(evt.target.matches('.card__delete-button')) {
        removeCard(cardId)
        .then(res => console.log(`Удалена карточка с ID: ${cardId}`))
        .catch(err => console.log('Ошибка удаления карточки'))
      }
    })

    //обработчик клика на кнопку лайка
    card.addEventListener('click', function(evt) {
      if(evt.target.matches('.card__like-button')) {
        cardLikeToggle(likeButton, cardId, cardLikes);
      }
    })
  })
})
.catch((err) => {
  console.log('Запрос не выполнен: ', err)
})


//обработка добавления/удаления лайка
function cardLikeToggle(likeButton, cardId, cardLikes) {
  if((likeButton.classList.contains('card__like-button_is-active'))) {
    unlikeCard(cardId)
    .then(data => {
      likeButton.classList.remove('card__like-button_is-active');
      cardLikes.textContent = data.likes.length;
    })
  }
  else {
    likeCard(cardId)
    .then(data => {
      likeButton.classList.add('card__like-button_is-active');
      cardLikes.textContent = data.likes.length;
    })
    
  }
}

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