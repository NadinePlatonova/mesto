import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/constants.js';
// import { closePopup, openPopup } from '../utils/utils.js';
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

const config = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible',
  containerSelector: '.elements__list',
  cardSelector: '#element-template',
  popupImageSelector: '.popup_type_image'
};

const nameProfile = document.querySelector('.profile__name');
const roleProfile = document.querySelector('.profile__role');
// const popups = document.querySelectorAll('.popup');

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

// Функции
const openPopupWithImage = new PopupWithImage(config.popupImageSelector);
const handleCardClick = (name, link) => openPopupWithImage.open(name, link);
openPopupWithImage.close();

// Создание карточки
function createCard(name, link) {
  const card = new Card(name, link, config.cardSelector, handleCardClick);
  return card.generateCard();
}
// Рендер карточек
const renderCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    renderCardList.addItem(cardElement);
  }
}, config.containerSelector);

renderCardList.renderItems();



// Валидация форм
const editFormValidator = new FormValidator(config, formPopupEdit);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formNewCard);
cardFormValidator.enableValidation();

// Универсальная функция закрытия попапов
// popups.forEach((item) => {
//   item.addEventListener('click', (evt) => {
//       if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        
//           closePopup(item)
          
//       }
//   })
// })

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
  renderItem(placeInput.value, imgInput.value);
  cardFormValidator.deleteInputErrors();
  cardFormValidator._setSubmitButtonInactive();
  closePopup(popupNewCard);
}
 
openPopupEdit.addEventListener('click', openPopupForm);
formPopupEdit.addEventListener('submit', handleProfileFormSubmit);
placeButtonAdd.addEventListener('click', handlePopupNewCardOpen);
formNewCard.addEventListener('submit', handlePopupNewCardSubmit);