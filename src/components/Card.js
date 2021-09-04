export default class Card {
  constructor(data, userId, addLike, removeLike, handleDeleteCard, cardSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
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
  this._deleteButton = this._element.querySelector('.element__delete-button')
  this._setEventListeners();
  if (this._ownerId === this._userId) {
    this._deleteButton.classList.add('element__delete-button_visible');
  }
  this.isLiked();
  this._likesNumber = this._element.querySelector('.element__like-button')
  this._likesNumber.textContent = this._likes.length; 
  this._element.querySelector('.element__title').textContent = this._name;
  this._elementPic.src = this._link;
  this._elementPic.alt = this._name;
  
  return this._element;
}

isLiked() {
  if (this._likes.some((like) => like._id === this._userId)) {
    this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
  }
}

_likeStatus() {
  this._likeButton.classList.toggle('element__like-button_active');
  if (event.target.classList.contains('element__like-button_active')) {
    event.target.classList.remove('element__like-button_active');
    this._likesNumber.textContent = this._likes.length -=1;
    this._removeLike(this._cardId);
  } else {
    event.target.classList.add('element__like-button_active');
    this._likesNumber.textContent = this._likes.length +=1;
    this._addLike(this._cardId);
  }
}

_handleRemove() {
  this._element.remove()
  this._element = ''
}

_setEventListeners() {
  this._likeButton.addEventListener('click', () => {
      this._likeStatus();
  })
  if (this._ownerId === this._userId) {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleRemove();
    })
  }
  // this._element.querySelector('.element__delete-button').addEventListener('click', () => {
  //     this._handleRemove();
  // })
  this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._data);
  })
}
}