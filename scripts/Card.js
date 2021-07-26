import {popupImage, placeImage, namePopupImage} from './index.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
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
  this._element.querySelector('.element__title').textContent = this._name;
  this._elementPic.src = this._link;
  this._elementPic.alt = this._name;

  this._likeStatus();
  this._deleteCard();
  this._openImage();
  
  return this._element;
}

_openImage() {
  this._element.querySelector('.element__image').addEventListener('click', () => {
    placeImage.src = this._link
    placeImage.alt = this._name
    namePopupImage.textContent = this._name
    openPopup(popupImage);
  })
}

_likeStatus() {
  cardElement.querySelector('.element__like-button').addEventListener('click', (cardElement) => {
    cardElement.target.classList.toggle('element__like-button_active');
  })
}

_deleteCard() {
  cardElement.querySelector('.element__delete-button').addEventListener('click', (cardElement) => {
  cardElement.target.closest('.element').remove();
  })
}
}