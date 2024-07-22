import { likeCard, unlikeCard, removeCard } from "./api"; 
//Темплейт карточки 
const cardTemplate = document.querySelector('#card-template').content; 

//Функция создания карточки 
export function createCard(cardData, showImage, userId, cardId) { 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardImage = cardElement.querySelector('.card__image'); 
  const cardTitle = cardElement.querySelector('.card__title'); 
  const deleteButton = cardElement.querySelector('.card__delete-button'); 
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardLikes = cardTemplate.querySelector('.like_counter');
  cardLikes.textContent = 0;
  cardId = cardData._id;

  cardImage.src = cardData.link; 
  cardTitle.textContent = cardData.name; 
  cardImage.alt = cardData.name; 
  if(userId !== cardData.owner._id) { 
    deleteButton.remove() 
  } 

  const likers = cardData.likes; 
 
  //если лайк предварительно стоит, то сердечко черное 
  const hasId = likers.some(o => o._id === userId); 
  if(hasId) { 
    likeButton.classList.add('card__like-button_is-active'); 
  } 
 
  //обработчик клика на кнопку лайка 
  likeButton.addEventListener('click', function() {
    cardLikeToggle(cardId, likeButton, cardLikes)
  })

  //обработчик кнопки удаления
  deleteButton.addEventListener('click', function(evt) {
    cardDelete(cardId, deleteButton);
  })
 
  cardImage.addEventListener('click', showImage) 
 
  return cardElement; 
}

  //обработка добавления/удаления лайка 
  export function cardLikeToggle(cardId, likeButton, cardLikes) {
    if((likeButton.classList.contains('card__like-button_is-active'))) {
      unlikeCard(cardId)
      .then(data => { 
        likeButton.classList.remove('card__like-button_is-active'); 
        cardLikes.textContent = data.likes.length;
      })
      .catch(err => console.log('Ошибка при снятии лайка'))
    } 
    else { 
      likeCard(cardId) 
      .then(data => { 
        likeButton.classList.add('card__like-button_is-active'); 
        cardLikes.textContent = data.likes.length; 
      }) 
      .catch(err => console.log('Ошибка при постановке лайка')) 
    }
  }

  export function cardDelete(cardId, deleteButton) {
    removeCard(cardId)
      .then(res => { 
        deleteButton.closest('.places__item').remove() 
        console.log(`Удалена карточка с ID: ${cardId}`) 
      }) 
      .catch(err => console.log('Ошибка удаления карточки'))
  }