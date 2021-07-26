import Card from './Card';
import {initialCards} from './initial-сards.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
};


const nameProfile = document.querySelector('.profile__name');
const roleProfile = document.querySelector('.profile__role');
// const elementTemplate = document.querySelector('#element-template').content;
// const placesList = document.querySelector(".elements__list");
const popups = document.querySelectorAll('.popup');

// Редактирование профиля
const openPopupEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formPopupEdit = popupEdit.querySelector('.popup__form');
const nameInput = formPopupEdit.querySelector('.popup__text_type_name');
const jobInput = formPopupEdit.querySelector('.popup__text_type_role');
const submitButtonPopupEdit = formPopupEdit.querySelector('.popup__submit-button');

// Добавление новой карточки
const placeButtonAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector(".popup__form")
const placeInput = formNewCard.querySelector('.popup__text_type_place');
const imgInput = formNewCard.querySelector(".popup__text_type_link");
const submitButtonAddForm = formNewCard.querySelector('.popup__submit-button'); 

// Попап с картинкой
export const popupImage = document.querySelector('.popup_type_image');
export const placeImage = popupImage.querySelector('.popup__image');
export const namePopupImage = popupImage.querySelector('.popup__name');

// Функции
const renderItems = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.createCard();
  
    document.querySelector('.elements__list').prepend(cardElement);
  })
}

renderItems();

// function renderItemsStart() {
//   initialCards.forEach((item) => {
//       renderItem(item.name, item.link)
//   })
// }
// renderItemsStart()
//Рендер карточки
// function renderItem(name, link) {
//   const htmlElement = createCard(name, link)
//   placesList.prepend(htmlElement)
// }
// function createCard(name, link) {
//   const cardElement = elementTemplate.cloneNode(true)
//   const elementPic = cardElement.querySelector('.element__image');
//   cardElement.querySelector('.element__title').textContent = name
//   elementPic.src = link
//   elementPic.alt = name

//   likeStatus(cardElement);
//   deleteCard(cardElement);
//   openImage(cardElement, name, link);
  
//   return cardElement
// }

// Функция открытия попапа с изображением
// function openImage (cardElement, name, link) {
//   cardElement.querySelector('.element__image').addEventListener('click', () => {
//     placeImage.src = link
//     placeImage.alt = name
//     namePopupImage.textContent = name
//     openPopup(popupImage);
//   })
// }

// Функция лайка карточки
// function likeStatus (cardElement) {
//   cardElement.querySelector('.element__like-button').addEventListener('click', (cardElement) => {
//     cardElement.target.classList.toggle('element__like-button_active');
//   })
// }

// // Функция удаления карточки
// function deleteCard (cardElement) {
//   cardElement.querySelector('.element__delete-button').addEventListener('click', (cardElement) => {
//   cardElement.target.closest('.element').remove();
//   })
// }

// Универсальная функция закрытия попапов
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        
          closePopup(item)
          
      }
  })
})

// Открыть попап
function openPopup(popup) {
  document.addEventListener('keydown', handleEscUp);
  popup.classList.add('popup_opened');
}

// Закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscUp);
}

// Закрыть попап на Esc
function handleEscUp (evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// Открыть форму редактирования профиля
function openPopupForm () {
  setSubmitButtonActive(submitButtonPopupEdit, config);
  deleteInputErrors(formPopupEdit, config);
  nameInput.value = nameProfile.textContent
  jobInput.value = roleProfile.textContent
  openPopup(popupEdit);
}

// Редактирование профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value
  roleProfile.textContent = jobInput.value
  closePopup(popupEdit);
}

// Открытие модального окна "Добавление карточек"
function handlePopupNewCardOpen() {
  setSubmitButtonInactive(submitButtonAddForm, config);
  deleteInputErrors(formNewCard, config);
  openPopup(popupNewCard)
  formNewCard.reset()
}

// Добавление карточки с новыми значениями
function handlePopupNewCardSubmit(evt) {
  evt.preventDefault()
  renderItem(placeInput.value, imgInput.value);
  deleteInputErrors(formNewCard, config);
  setSubmitButtonInactive(submitButtonAddForm, config);
  closePopup(popupNewCard);
}
 
openPopupEdit.addEventListener('click', openPopupForm);
formPopupEdit.addEventListener('submit', handleProfileFormSubmit);
placeButtonAdd.addEventListener('click', handlePopupNewCardOpen);
formNewCard.addEventListener('submit', handlePopupNewCardSubmit);