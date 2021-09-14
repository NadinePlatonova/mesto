import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, { handleDeleteButtonClick }) {
        super(popupSelector);
        this._handleDeleteButtonClick = handleDeleteButtonClick;
        this._confirmButton = this._popup.querySelector('.popup__submit-button_type_confirm');
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', this._confirmDeleteCard);
    }

    _confirmDeleteCard = () => {
        this._handleDeleteButtonClick();
    }
}