import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, config, openPopupEdit, placeButtonAdd, popupEdit, formPopupEdit, nameInput, jobInput, nameProfile, roleProfile } from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

// const config = {
//   inputSelector: '.popup__text',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_disabled',
//   inputErrorClass: 'popup__text_type_error',
//   errorClass: 'popup__error_visible',
//   containerSelector: '.elements__list',
//   cardSelector: '#element-template',
//   popupImageSelector: '.popup_type_image'
// };


// const popups = document.querySelectorAll('.popup');

// Редактирование профиля



// Добавление новой карточки

const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewCard = popupNewCard.querySelector(".popup__form")
const placeInput = formNewCard.querySelector('.popup__text_type_place');
const imgInput = formNewCard.querySelector(".popup__text_type_link");

// Функции


const handleCardClick = (name, link) => openPopupWithImage.open(name, link);

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

// Открыть форму редактирования профиля

const openPopupWithImage = new PopupWithImage(config.popupImageSelector)
openPopupWithImage.setEventListeners();

const userInfo = new UserInfo(nameProfile, roleProfile)
console.log(popupEdit);
const popupUserForm = new PopupWithForm(popupEdit, {
  handleFormSubmit: (data) => {
        userInfo.setUserInfo(data)
    }
})
popupUserForm.setEventListeners()
const handleProfileFormSubmit = () => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.name
    jobInput.value = userData.role
    popupUserForm.open()
}

// function openPopupForm () {
//   editFormValidator._setSubmitButtonActive();
//   editFormValidator.deleteInputErrors();
  // nameInput.value = nameProfile.textContent
  // jobInput.value = roleProfile.textContent
  // editPopup.open();
// }

// Редактирование профиля
// function handleProfileFormSubmit (evt) {
//   evt.preventDefault();
//   nameProfile.textContent = nameInput.value
//   roleProfile.textContent = jobInput.value
//   closePopup(popupEdit);
// }

// Открытие модального окна "Добавление карточек"
function handlePopupNewCardOpen() {
  cardFormValidator._setSubmitButtonInactive();
  cardFormValidator.deleteInputErrors();
  // openPopup(popupNewCard)
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
 
// openPopupEdit.addEventListener('click', openPopupForm);
formPopupEdit.addEventListener('submit', handleProfileFormSubmit);
placeButtonAdd.addEventListener('click', handlePopupNewCardOpen);
formNewCard.addEventListener('submit', handlePopupNewCardSubmit);