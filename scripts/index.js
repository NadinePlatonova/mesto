import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './initial-сards.js';

const config = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
};

const nameProfile = document.querySelector('.profile__name');
const roleProfile = document.querySelector('.profile__role');
const placesList = document.querySelector('.elements__list');
const popups = document.querySelectorAll('.popup');

// Редактирование профиля
const openPopupEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const formPopupEdit = popupEdit.querySelector('.popup__form');
const nameInput = formPopupEdit.querySelector('.popup__text_type_name');
const jobInput = formPopupEdit.querySelector('.popup__text_type_role');

// Добавление новой карточки
const placeButtonAdd = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector(".popup__form")
const placeInput = formNewCard.querySelector('.popup__text_type_place');
const imgInput = formNewCard.querySelector(".popup__text_type_link");

// Попап с картинкой
export const popupImage = document.querySelector('.popup_type_image');
export const placeImage = popupImage.querySelector('.popup__image');
export const namePopupImage = popupImage.querySelector('.popup__name');

// Функции
const renderItems = () => {
  initialCards.forEach((item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.createCard();
  
    placesList.prepend(cardElement);
  })
}

renderItems();

const editFormValidator = new FormValidator(config, formPopupEdit);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formNewCard);
cardFormValidator.enableValidation();

// Универсальная функция закрытия попапов
popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        
          closePopup(item)
          
      }
  })
})

// Открыть попап
export function openPopup(popup) {
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
  editFormValidator._setSubmitButtonActive();
  editFormValidator.deleteInputErrors();
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
  cardFormValidator._setSubmitButtonInactive();
  cardFormValidator.deleteInputErrors();
  openPopup(popupNewCard)
  formNewCard.reset()
}

// Добавление карточки с новыми значениями
function handlePopupNewCardSubmit(evt) {
  evt.preventDefault()
  renderItems(placeInput.value, imgInput.value);
  cardFormValidator.deleteInputErrors();
  cardFormValidator._setSubmitButtonInactive();
  closePopup(popupNewCard);
}
 
openPopupEdit.addEventListener('click', openPopupForm);
formPopupEdit.addEventListener('submit', handleProfileFormSubmit);
placeButtonAdd.addEventListener('click', handlePopupNewCardOpen);
formNewCard.addEventListener('submit', handlePopupNewCardSubmit);