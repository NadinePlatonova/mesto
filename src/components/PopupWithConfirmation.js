import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setHandleFormSubmit(submit) {
        this._handleSubmit = submit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = document.querySelector('.popup__form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        })
    }
}