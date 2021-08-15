export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this.__handleEscClose());
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            const activePopup = document.querySelector('.popup_opened');
            this.close(activePopup);
        }
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this.__handleEscClose());
    }

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        
                this.close();
            }
        })
    }
}