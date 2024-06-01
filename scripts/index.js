// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsConteiner = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(evt, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = evt.link;
  cardElement.querySelector('.card__title').textContent = evt.name;
  cardElement.querySelector('.card__image').alt = evt.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (evt) {
  const card = createCard(evt, deleteCard);
  cardsConteiner.append(card);
})

