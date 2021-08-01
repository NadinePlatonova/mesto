import { popupImage, placeImage, namePopupImage, openPopup } from './index.js';

export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  return cardElement;
  }

createCard() {
  this._element = this._getTemplate();
  this._elementPic = this._element.querySelector('.element__image');
  this._setEventListeners();
  this._element.querySelector('.element__title').textContent = this._name;
  this._elementPic.src = this._link;
  this._elementPic.alt = this._name;
  
  return this._element;
}

_openImage() {
    placeImage.src = this._link
    placeImage.alt = this._name
    namePopupImage.textContent = this._name
    openPopup(popupImage);
}

_likeStatus() {
  this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
}

_handleRemove() {
  this._element.remove()
  this._element = ''
}

_setEventListeners() {
  this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._likeStatus();
  })
  this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleRemove();
  })
  this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImage();
  })
}
}