// export const initialCards = [
//     {
//       name: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//       name: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//       name: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//       name: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//       name: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//       name: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
//   ];

export const openPopupEdit = document.querySelector('.profile__edit-button');
export const placeButtonAdd = document.querySelector('.profile__add-button');
export const submitButton = document.querySelector('.popup__submit-button');
export const avatarEditButton = document.querySelector('.profile__avatar');

export const formPopupEdit = document.forms['profileForm'];
export const nameInput = formPopupEdit.elements.name;
export const jobInput = formPopupEdit.elements.role;

export const formNewCard = document.forms['newItemForm'];
export const placeInput = formNewCard.elements.place;
export const imgInput = formNewCard.elements.link;

export const formAvatar = document.forms['edit-avatar']

export const config = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible',
  containerSelector: '.elements__list',
  cardSelector: '#element-template',
  popupImageSelector: '.popup_type_image',
  popupEdit: '.popup_type_edit',
  popupNewCard: '.popup_type_new-card',
  popupDeleteCard: '.popup_type_delete-card',
  nameProfile: '.profile__name',
  roleProfile: '.profile__role',
  avatarImage: '.profile__avatar',
  popupAvatar: '.popup_type_avatar'
};