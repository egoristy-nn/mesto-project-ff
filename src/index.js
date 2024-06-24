import './pages/index.css';
import { initialCards } from './components/cards.js';
import {cardsConteiner, createCard, deleteCard, like} from './components/card.js';
import { crossIcons,
          openPopup, 
          closePopup,
          editNameForm,
          setValues,
          handleFormSubmit,
          editButton, 
          newPlaceForm,
          handleFormSubmitPlace,
          addButton, 
          popupEdit, 
          popupNewCard,
          showImage } from './components/modals.js';

//вывод карточек на страницу
initialCards.forEach(function (cardData) {
  const card = createCard(cardData, deleteCard, like, showImage);
  cardsConteiner.append(card);
})

//отслеживание клика по модальному окну редактирования профиля
editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  setValues();
});
editNameForm.addEventListener('submit', function(evt){
  handleFormSubmit(evt);
  closePopup(popupEdit);
});

//отслеживание клика по модальному окну добавления карточки
addButton.addEventListener('click', function() {
  openPopup(popupNewCard);
});
newPlaceForm.addEventListener('submit', handleFormSubmitPlace);

//закрытие попапа на крестик
crossIcons.forEach(function (icon) {
  icon.addEventListener('click', function(){
    closePopup(icon.closest('.popup'));
  });
});

