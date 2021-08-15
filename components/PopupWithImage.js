import Popup from './Popup.js';
import { placeImage, namePopupImage } from '../utils/constants.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, name) {
        placeImage.src = link;
        placeImage.alt = name;
        namePopupImage.textContent = name;
        super.open();
    }
}