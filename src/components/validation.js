//функция добавления класса с ошибкой 
function showInputError (formElement, inputElement, errorMessage, configValidation) { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(configValidation.inputErrorClass); 
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(configValidation.errorClass); 
} 
 
//функция удаления класса с ошибкой 
export function hideInputError (formElement, inputElement, configValidation) { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(configValidation.inputErrorClass); 
  errorElement.classList.remove(configValidation.errorClass); 
  errorElement.textContent = ''; 
  inputElement.setCustomValidity(''); 
} 
 
//функция проверки на валидность 
function isValid(formElement, inputElement, configValidation) { 
  if(inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage) 
  } else { 
    inputElement.setCustomValidity(''); 
  } 
 
  if(!inputElement.validity.valid) { 
    showInputError(formElement, inputElement, inputElement.validationMessage, configValidation); 
  } 
  else { 
    hideInputError(formElement, inputElement, configValidation); 
  } 
} 
 
//вешаем обработчики событий на каждый input выбранной формы 
export function setEventListeners(formElement, configValidation) { 
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector)); 
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector); 
  toggleButtonState(inputList, buttonElement, configValidation); 
  inputList.forEach( function (inputElement) { 
    inputElement.addEventListener('input', function() { 
      isValid(formElement, inputElement, configValidation); 
      toggleButtonState(inputList, buttonElement, configValidation); 
    }) 
  }) 
} 
 
//вешаем обработчики событий на каждую форму 
export function enableValidation(configValidation) { 
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector)); 
  formList.forEach(function (formElement) { 
    setEventListeners(formElement, configValidation); 
  }) 
} 
 
//проверка на валидность всех полей формы 
function hasInvalidInput(inputList) { 
  return inputList.some(function(inputElement) { 
    return !inputElement.validity.valid; 
  }) 
} 
 
//активируем/деактивируем кнопку 
function toggleButtonState(inputList, buttonElement, configValidation) { 
  if(hasInvalidInput(inputList)) { 
    buttonElement.disabled = true; 
    buttonElement.classList.add(configValidation.inactiveButtonClass); 
  } 
  else { 
    buttonElement.disabled = false; 
    buttonElement.classList.remove(configValidation.inactiveButtonClass); 
  } 
} 
 
//очистка ошибок валидации 
export function clearValidation(formElement, configValidation) { 
   
  const submitButton = formElement.querySelector(configValidation.submitButtonSelector); 
  const inputSelectors = Array.from(formElement.querySelectorAll(configValidation.inputSelector)); 
  const errors = formElement.querySelectorAll(configValidation.errorClass); 
 
  toggleButtonState(inputSelectors, submitButton, configValidation); 
 
  inputSelectors.forEach(function (input) { 
    hideInputError(formElement, input, configValidation); 
  }) 
 
  errors.forEach(function (error) { 
    error.textContent = ''; 
  }) 
} 