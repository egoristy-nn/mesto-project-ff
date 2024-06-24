//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

//DOM узлы
export const cardsConteiner = document.querySelector('.places__list');

//Функция создания карточки
export function createCard(cardData, deleteCard, like, showImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  cardsConteiner.addEventListener('click', showImage)

  cardsConteiner.addEventListener('click', like);
  
  return cardElement;
}

//Функция удаления карточки
export function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

//обработка лайка карточки
export function like(evt){
  if(evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}