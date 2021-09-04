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

const userInfo = new UserInfo(config.nameProfile, config.roleProfile)

// переделанное - попап с редактированием

api.getUserInfo()
.then((item) => {
  userInfo.setUserInfo(item)
})
.catch((err) => {
  console.log(err);
})

const popupUserForm = new PopupWithForm(config.popupEdit, {
  handleFormSubmit: (item) => {
    api.editUserInfo(item)
    .then((item) => {
      userInfo.setUserInfo(item);
    })
    .catch((err) => {
      console.log(err);
    })    
  }
})
// код попапа с редактированием из 8 ПР
// const popupUserForm = new PopupWithForm(config.popupEdit, {
//   handleFormSubmit: (name, role) => {
//         userInfo.setUserInfo(name, role)
//     }
// })

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
  handleFormSubmit: (item) => {
    api.addNewCard(item)
    .then((data) => {
      createCard(data);
      cardFormValidator.setSubmitButtonInactive();
      popupAddForm.close();
    })
  }
})


// Код добавления новой карточки из 8 ПР :

// const popupAddForm = new PopupWithForm(config.popupNewCard, {
//   handleFormSubmit: (data) => {
//     const cardElement = createCard(data.place, data.link);
//     renderCardList.addItem(cardElement);
//     cardFormValidator.setSubmitButtonInactive();
//     popupAddForm.close();
//   }
// })
popupAddForm.setEventListeners();

const handlePopupNewCardOpen = () => {
  cardFormValidator.setSubmitButtonInactive();
  cardFormValidator.deleteInputErrors();
  popupAddForm.open();
  formNewCard.reset();
}

openPopupEdit.addEventListener('click', handlePopupEditProfile);
placeButtonAdd.addEventListener('click', handlePopupNewCardOpen);