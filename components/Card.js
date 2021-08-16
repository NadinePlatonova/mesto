// import { popupImage, placeImage, namePopupImage } from '../utils/constants.js';
// import { openPopup } from '../utils/utils.js';

export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

  return cardElement;
  }

generateCard() {
  this._element = this._getTemplate();
  this._elementPic = this._element.querySelector('.element__image');
  this._likeButton = this._element.querySelector('.element__like-button');
  this._setEventListeners();
  this._element.querySelector('.element__title').textContent = this._name;
  this._elementPic.src = this._link;
  this._elementPic.alt = this._name;
  
  return this._element;
}

_likeStatus() {
  this._likeButton.classList.toggle('element__like-button_active');
}

_handleRemove() {
  this._element.remove()
  this._element = ''
}

_setEventListeners() {
  this._likeButton.addEventListener('click', () => {
      this._likeStatus();
  })
  this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleRemove();
  })
  this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
  })
}
}