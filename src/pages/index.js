import './index.css';
import { api } from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
config,
openPopupEdit,
placeButtonAdd,
formPopupEdit,
nameInput,
jobInput,
formNewCard,
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

// Функции
// Открытие модального окна с картинкой
const handleCardClick = (name, link) => openPopupWithImage.open(name, link);

// Создание карточки
function createCard(name, link) {
  const card = new Card(name, link, config.cardSelector, handleCardClick);
  return card.generateCard();
}
// Рендер карточек

api.getInitialCards()
.then((data) => {
  const renderCardList = new Section({
    items: data,
    renderer: (item) => {
      const cardElement = createCard(item.name, item.link);
      renderCardList.addItem(cardElement);
    }
  }, config.containerSelector);
  renderCardList.renderItems();
})

// Валидация форм
const editFormValidator = new FormValidator(config, formPopupEdit);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formNewCard);
cardFormValidator.enableValidation();

// Экземпляр модального окна с картинкой
const openPopupWithImage = new PopupWithImage(config.popupImageSelector)
openPopupWithImage.setEventListeners();

// Открыть форму редактирования профиля
// const userInfo = new UserInfo(config.nameProfile, config.roleProfile, config.avatarImage)
// const popupUserForm = new PopupWithForm(config.popupEdit, {
//   handleFormSubmit: (name, about) => {
//     api.editUserInfo(name, about)
//     }
// })
// .then((data) => {
//   userInfo.setUserInfo(data.name, data.role, data.avatar)
// })

// api.getUserInfo()
// .then((data) => {
//   userInfo.setUserInfo(data.name, data.role, data.avatar);
// })

const userInfo = new UserInfo(config.nameProfile, config.roleProfile)
const popupUserForm = new PopupWithForm(config.popupEdit, {
  handleFormSubmit: (name, role) => {
        userInfo.setUserInfo(name, role)
    }
})
// function handleFormSubmit(name, role) {
//   api.editUserInfo(name, role)
//   .then((data) => {
//     userInfo.setUserInfo(data.name, data.about, data.avatar)
//   })  
// }
popupUserForm.setEventListeners()
const handlePopupEditProfile = () => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.name
    jobInput.value = userData.role
    editFormValidator.setSubmitButtonActive();
    editFormValidator.deleteInputErrors();
    popupUserForm.open()
}

// Открыть форму добавления карточки
const popupAddForm = new PopupWithForm(config.popupNewCard, {
  handleFormSubmit: (data) => {
    const cardElement = createCard(data.place, data.link);
    renderCardList.addItem(cardElement);
    cardFormValidator.setSubmitButtonInactive();
    popupAddForm.close();
  }
})
popupAddForm.setEventListeners();

const handlePopupNewCardOpen = () => {
  cardFormValidator.setSubmitButtonInactive();
  cardFormValidator.deleteInputErrors();
  popupAddForm.open();
  formNewCard.reset();
}

openPopupEdit.addEventListener('click', handlePopupEditProfile);
placeButtonAdd.addEventListener('click', handlePopupNewCardOpen);