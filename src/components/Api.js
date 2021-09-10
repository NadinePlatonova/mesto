class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        const url = `${this._baseUrl}/users/me`
        return fetch(url, {
            headers: this._headers
        })
        .then(this._checkResponseStatus);
    }

    editUserInfo(data) {
        const url = `${this._baseUrl}/users/me`
        return fetch(url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.role
            })
        })
        .then(this._checkResponseStatus);
    }

    addNewCard(data) {
        const url = `${this._baseUrl}/cards`
        return fetch(url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.place,
                link: data.link
            })
        })
        .then(this._checkResponseStatus);
    }

    getInitialCards() {
        const url = `${this._baseUrl}/cards`
        return fetch(url, {
            headers: this._headers
        })
        .then(this._checkResponseStatus);
    }

    patchAvatar(data) {
        const url = `${this._baseUrl}/users/me/avatar`
        return fetch(url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link
            })
        })
        .then(this._checkResponseStatus);
    }

    deleteCard(cardId) {
        const url = `${this._baseUrl}/cards/${cardId}`
        return fetch(url, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponseStatus);
    }

    putLike(cardId) {
        const url = `${this._baseUrl}/cards/likes/${cardId}`
        return fetch(url, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._checkResponseStatus);
    }

    deleteLike(cardId) {
        const url = `${this._baseUrl}/cards/likes/${cardId}`
        return fetch(url, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._checkResponseStatus);
    }

    _checkResponseStatus(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: '362a2219-41f2-4a3b-84cc-680eb976a5f4',
        'Content-Type': 'application/json'
    }
})