import { likeCard, unlikeCard, removeCard } from "./api";
//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//DOM узлы
export const cardsConteiner = document.querySelector('.places__list');

//Функция создания карточки
export function createCard(cardData, showImage, userId, cardId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardId = cardData._id;
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  if(userId !== cardData.owner._id) {
    deleteButton.remove()
  }

  const cardLikes = cardTemplate.querySelector('.like_counter');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likers = cardData.likes;

  //если лайк предварительно стоит, то сердечко черное
  const hasId = likers.some(o => o._id === userId);
  if(hasId) {
    likeButton.classList.add('card__like-button_is-active');
  }

  //обработчик клика на кнопку лайка
  likeButton.addEventListener('click', function(evt) {
    cardLikeToggle(cardId);
  })

  //обработка добавления/удаления лайка
  function cardLikeToggle(cardId) {
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

  // function cardLikeToggle() {
  //   if((likeButton.classList.contains('card__like-button_is-active'))) {
  //     likeButton.classList.remove('card__like-button_is-active');
  //     cardLikes.textContent = likers.length;
  //     console.log(cardLikes.textContent)
  //   }
  //   else {
  //     likeButton.classList.add('card__like-button_is-active');
  //     cardLikes.textContent = likers.length;
  //     console.log(cardLikes.textContent)
  //   }
  // }

  //обработчик клика на корзину
  deleteButton.addEventListener('click', function(evt){
    removeCard(cardId)
      .then(res => {
        evt.target.closest('.places__item').remove()
        console.log(`Удалена карточка с ID: ${cardId}`)
      })
      .catch(err => console.log('Ошибка удаления карточки'))
  })

  cardsConteiner.addEventListener('click', showImage)

  return cardElement;
}