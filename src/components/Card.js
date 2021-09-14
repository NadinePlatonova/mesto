export default class Card {
  constructor(data, cardSelector, userId, handleCardClick, handleLikeClick, handleDeleteCard) {
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this.cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
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
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    this._handleTrashIcon();
    
    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;
  
  
    return this._element;
  }

  _likeStatus() {
    this._handleLikeClick(this.cardId, this.isLiked)
    .then((data) => {
      this._likeButton.classList.toggle('element__like-button_active');
      this.isLiked = !this.isLiked;
      this._likeButton.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  }

  setUserLikes(card) {
    if (this._likes.some(owner => owner._id === this._userId)) {
      this._likeButton.classList.add('element__like-button_active');
    }
  }

  updateLikesNumber(card) {
    this._likeButton.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeStatus();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this);
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  handleRemove() {
    this._element.remove();
    this._element = null;
  }

  _handleTrashIcon() {
    if (this._userId === this._ownerId) {
      this._deleteButton.classList.add('element__delete-button_visible')
    } else {
      this._deleteButton.classList.remove('element__delete-button_visible')
    }
  }
}