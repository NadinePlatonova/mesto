export default class Card {
  constructor(data, cardSelector, userId, handleCardClick, handleLikeClick, handleDeleteLikePic) {
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteLikePic = handleDeleteLikePic;
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
    this._handleLikeClick(this._cardId, this.isLiked)
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
      this._handleDeleteLikePic(this);
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

// export default class Card {
//   // constructor(userId, name, link, likeCount, cardSelector, isEdited, isLiked, handleCardClick, handleCardDelete, handleCardLike)
//   constructor(userId, name, link, likeCount, cardSelector, isEdited, isLiked, handleCardClick, handleCardDelete, handleCardLike) {
//     this._id = userId;
//     this._name = name;
//     this._link = link;
//     this._likeCount = likeCount;
//     this._isEdited = isEdited;
//     this._isLiked = isLiked;
//     this._cardSelector = cardSelector;
//     this._handleCardClick = handleCardClick;
//     this._handleCardDelete = handleCardDelete;
//     this._handleCardLike = handleCardLike;
//     }

//   _getTemplate() {
//     const cardElement = document
//     .querySelector(this._cardSelector)
//     .content
//     .querySelector('.element')
//     .cloneNode(true);

//     if (this._isEdited) {
//       this._deleteButton.classList.add('element__delete-button_visible')
//     }

//     // if (this._isLiked) {
//     //   cardElement.querySelector('.element__like-button').classList.add('element__like-button_active')
//     // } 

//   return cardElement;
//   }

// generateCard() {
//   this._element = this._getTemplate();
//   this._elementPic = this._element.querySelector('.element__image');
//   this._likeButton = this._element.querySelector('.element__like-button');
//   this._deleteButton = this._element.querySelector('.element__delete-button');
//   this._setEventListeners();

// //   if (!isEdited) {
// //     this._deleteButton.disabled;
// //     this._deleteButton.hidden;
// // }

//   this._likeButton.textContent = this._likeCount; 
//   this._element.querySelector('.element__title').textContent = this._name;
//   this._elementPic.src = this._link;
//   this._elementPic.alt = this._name;

//       if (this._isLiked) {
//         this._likeButton.classList.add('element__like-button_active')
//     }
  
//   return this._element;
// }

// _handleLikePic(like) {
//   this._handleCardLike(
//     this,
//     this._id,
//     like.classList.contains('element__like-button_active')
//     )
// }

// likeStatus() {
//   this._likeButton.classList.toggle('element__like-button_active');
// }

// handleRemove() {
//   this._element.remove()
//   this._element = ''
// }

// setLikesNumber(value) {
//   this._likeButton.textContent = value
// }

// _setEventListeners() {
//   this._likeButton.addEventListener('click', () => {
//      this._handleLikePic(this._likeButton);
//   })
  
//   this._deleteButton.addEventListener('click', () => {
//       this._handleCardDelete(this, this._id);
//     })

//   this._element.querySelector('.element__image').addEventListener('click', () => {
//       this._handleCardClick(this._name, this._link);
//   })
// }
// }