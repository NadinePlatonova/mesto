import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._placeImage = this._popupSelector.querySelector('.popup__image');
        this._namePopupImage = this._popupSelector.querySelector('.popup__name');
    }

    open(name, link) {
        this._placeImage.src = link;
        this._placeImage.alt = name;
        this._namePopupImage.textContent = name;
        super.open();
    }
}