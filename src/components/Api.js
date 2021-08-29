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
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    editUserInfo(name, about) {
        const url = `${this._baseUrl}/users/me`
        return fetch(url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    addNewCard(name, link) {
        const url = `${this._baseUrl}/cards`
        return fetch(url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getInitialCards() {
        const url = `${this._baseUrl}/cards`
        return fetch(url, {
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
    }

//     _checkResponseInfo(res) {
//         if (!res.ok) {
//             return Promise.reject(`Ошибка: ${res.status}`);
//         }
//         return res.json();
//     }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: '362a2219-41f2-4a3b-84cc-680eb976a5f4',
        'Content-Type': 'application/json'
    }
})