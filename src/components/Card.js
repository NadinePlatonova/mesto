export default class Card {
  constructor(userId, name, link, likeCount, cardSelector, isEdited, isLiked, handleCardClick, handleCardDelete, handleCardLike) {
    this._id = userId;
    this._name = name;
    this._link = link;
    this._likeCount = likeCount;
    this._isEdited = isEdited;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    if (this._isEdited) {
      cardElement.querySelector('.element__delete-button').classList.add('element__delete-button_visible')
    }

    if (this._isLiked) {
      cardElement.querySelector('.element__like-button').classList.add('element__like-button_active')
    } 

  return cardElement;
  }

generateCard() {
  this._element = this._getTemplate();
  this._elementPic = this._element.querySelector('.element__image');
  this._likeButton = this._element.querySelector('.element__like-button');
  this._setEventListeners();

  this._likeButton.textContent = this._likeCount; 
  this._element.querySelector('.element__title').textContent = this._name;
  this._elementPic.src = this._link;
  this._elementPic.alt = this._name;
  
  return this._element;
}

_handleLikePic(like) {
  this._handleCardLike(
    this,
    this._id,
    like.classList.contains('element__like-button_active')
    )
}

likeStatus() {
  this._likeButton.classList.toggle('element__like-button_active');
}

handleRemove() {
  this._element.remove()
  // this._element = ''
}

setLikesNumber(value) {
  this._likeButton.textContent = value
}

_setEventListeners() {
  this._likeButton.addEventListener('click', () => {
     this._handleLikePic(this._likeButton);
  })
  
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleCardDelete(this, this._id);
    })

  this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
  })
}
}