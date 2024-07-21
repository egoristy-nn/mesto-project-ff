const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: 'fe4a098e-70f7-4042-a964-379522886ea1',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if(!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  return res.json();
}

//загрузка информации о пользователе
export function loadUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => getResponseData(res))
}

//загрузка карточек
export function loadCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => getResponseData(res))
}

//редактирование профиля
export function saveProfileData(profileName, profileDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${profileName}`,
      about: `${profileDescription}`
    })
  })
  .then(res => getResponseData(res))
}

//добавление карточки
export function addCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`
    })
  })
  .then(res => getResponseData(res))
}

//удаление карточки
export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => getResponseData(res))
}

//поставить лайк карточке
export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => getResponseData(res))
}

//убрать лайк с карточки
export function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then(res => getResponseData(res))
}

//смена аватарки пользователя
export function changeAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${url}`
    })
  })
  .then(res => getResponseData(res))
}

