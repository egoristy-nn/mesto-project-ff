const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
  headers: {
    authorization: 'fe4a098e-70f7-4042-a964-379522886ea1',
    'Content-Type': 'application/json'
  }
}

//загрузка информации о пользователе
export function loadUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: 'fe4a098e-70f7-4042-a964-379522886ea1'
    }
  })
  .then((res) => res.json())
}

//загрузка карточек
export function loadCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: {
      authorization: 'fe4a098e-70f7-4042-a964-379522886ea1'
    }
  })
  .then(res => res.json())
}

//редактирование профиля
export function saveProfileData(profileName, profileDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: 'fe4a098e-70f7-4042-a964-379522886ea1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${profileName}`,
      about: `${profileDescription}`
    })
  })
  .then(res => res.json())
}

//добавление карточки
export function addCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: 'fe4a098e-70f7-4042-a964-379522886ea1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${cardName}`,
      link: `${cardLink}`
    })
  })
  .then(res => res.json())
}

//удаление карточки
export function removeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'fe4a098e-70f7-4042-a964-379522886ea1'
    }
  })
  .then(res => res.json())
}

//поставить лайк карточке
export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'fe4a098e-70f7-4042-a964-379522886ea1'
    }
  })
  .then(res => res.json())
}

//убрать лайк с карточки
export function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'fe4a098e-70f7-4042-a964-379522886ea1'
    }
  })
  .then(res => res.json())
}

//смена аватарки пользователя
export function changeAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: 'fe4a098e-70f7-4042-a964-379522886ea1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${url}`
    })
  })
  .then(res => res.json())
}

