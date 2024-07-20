//функция добавления класса с ошибкой
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup-input-error_active');
}

//функция удаления класса с ошибкой
export function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup-input-error_active');
  errorElement.textContent = '';
}

//функция проверки на валидность
function isValid(formElement, inputElement) {
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('');
  }

  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    hideInputError(formElement, inputElement);
  }
}

//вешаем обработчики событий на каждый input выбранной формы
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach( function (inputElement) {
    inputElement.addEventListener('input', function() {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

//вешаем обработчики событий на каждую форму
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(function (formElement) {
    setEventListeners(formElement);
  })
}

//проверка на валидность всех полей формы
function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement) {
    return !inputElement.validity.valid;
  })
}

//активируем/деактивируем кнопку
function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_inactive');
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_inactive');
  }
}

//очистка ошибок валидации
export function clearValidation(formElement, configValidation) {
  
  const submitButton = formElement.querySelector(configValidation.submitButtonSelector);
  const inputSelectors = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const errors = formElement.querySelectorAll(configValidation.errorClass);

  submitButton.disabled = true;
  submitButton.classList.add(configValidation.inactiveButtonClass);

  inputSelectors.forEach(function (input) {
    hideInputError(formElement, input);
  })

  errors.forEach(function (error) {
    error.textContent = '';
  })
}