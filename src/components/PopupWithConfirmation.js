import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.popup__submit-button');
    }

    open(submitHandler) {
        super.open();
        this._confirmationAct = submitHandler;
        this._submitButton.addEventListener('click', this._confirmationAct);
    }

    close() {
        if (this._confirmationAct) {
          this._submitButton.removeEventListener('click', this._confirmationAct)
        }
    } 
}