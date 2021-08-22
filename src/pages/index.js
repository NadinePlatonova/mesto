import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { 
initialCards,
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

// Экземпляр модального окна с картинкой
const openPopupWithImage = new PopupWithImage(config.popupImageSelector)
openPopupWithImage.setEventListeners();

// Открыть форму редактирования профиля
const userInfo = new UserInfo(config.nameProfile, config.roleProfile)
const popupUserForm = new PopupWithForm(config.popupEdit, {
  handleFormSubmit: (name, role) => {
        userInfo.setUserInfo(name, role)
    }
})
popupUserForm.setEventListeners()
const handlePopupEditProfile = () => {
    const userData = userInfo.getUserInfo()
    nameInput.value = userData.name
    jobInput.value = userData.role
    editFormValidator._setSubmitButtonActive();
    editFormValidator.deleteInputErrors();
    popupUserForm.open()
}

// Открыть форму добавления карточки
const popupAddForm = new PopupWithForm(config.popupNewCard, {
  handleFormSubmit: (data) => {
    const cardElement = createCard(data.place, data.link);
    renderCardList.addItem(cardElement);
    cardFormValidator._setSubmitButtonInactive();
    popupAddForm.close();
  }
})
popupAddForm.setEventListeners();

const handlePopupNewCardOpen = () => {
  cardFormValidator._setSubmitButtonInactive();
  cardFormValidator.deleteInputErrors();
  popupAddForm.open();
  formNewCard.reset();
}

openPopupEdit.addEventListener('click', handlePopupEditProfile);
placeButtonAdd.addEventListener('click', handlePopupNewCardOpen);