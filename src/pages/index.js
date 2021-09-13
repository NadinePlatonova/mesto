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
avatarEditButton,
formAvatar,
submitEditProfile,
submitAddCard,
submitEditAvatar
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

// Создаем переменную пользователя
let userId;
// Объявляем переменную со списком карточек
let renderCardList;

// Устанавливаем информацию о пользователе
const userInfo = new UserInfo(
  config.nameProfile,
  config.roleProfile,
  config.avatarImage
)

// Загружаем информацию с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([res, cards]) => {
  userId = res._id;
  userInfo.setUserInfo({ name: res.name, role: res.about, avatar: res.avatar });
  setCardsArray(cards.reverse());
})
.catch((err) => {
  console.log(err);
})

// Функция рендера карточек
function setCardsArray(cards) {
  renderCardList = new Section({
    items: cards,
    renderer: (item) => {
      const cardElement = createCard(item);
      renderCardList.addItem(cardElement);
    }
  }, config.containerSelector);
  renderCardList.renderItems();
}
// Создание карточки
function createCard(data) {
  const card = new Card(
    data,
    config.cardSelector,
    userId,
    handleCardClick,
    handleLikeClick,
    handleDeleteCard
    )
    const cardElement = card.generateCard();
    card.setUserLikes(cardElement);
    card.updateLikesNumber(cardElement);
    return cardElement;
}
// Функции для создания карточки
const handleCardClick = (name, link) => openPopupWithImage.open(name, link);

const handleLikeClick = (cardId, isLiked) => {
  return api.putLike(cardId, isLiked)
}

const handleDeleteCard = (object) => {
  popupWithConfirmation.object = object;
  popupWithConfirmation.open();
}

// Уведомление о загрузке
function notifyLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

// Попапы

// Попап добавления карточки
const popupAddForm = new PopupWithForm(config.popupNewCard, {
  handleFormSubmit: (item) => {
    notifyLoading(true, submitAddCard);
    api.addNewCard(item)
    .then((data) => {
      const cardElement = createCard(data);
      renderCardList.addItem(cardElement);
      cardFormValidator.setSubmitButtonInactive();
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      notifyLoading(false, submitAddCard);
    })
  }
})
popupAddForm.setEventListeners();

const handlePopupNewCardOpen = () => {
  cardFormValidator.setSubmitButtonInactive();
  cardFormValidator.deleteInputErrors();
  popupAddForm.open();
  formNewCard.reset();
}

// Попап редактирования профиля
const popupUserForm = new PopupWithForm(config.popupEdit, {
  handleFormSubmit: (item) => {
    notifyLoading(true, submitEditProfile);
    api.editUserInfo(item)
    .then((item) => {
      userInfo.setUserInfo(item);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      notifyLoading(false, submitEditProfile);
    })
  }
})
popupUserForm.setEventListeners()

const handlePopupEditProfile = () => {
  const userData = userInfo.getUserInfo()
  nameInput.value = userData.name
  jobInput.value = userData.role
  editFormValidator.setSubmitButtonActive();
  editFormValidator.deleteInputErrors();
  popupUserForm.open()
}

// Попап с аватаром
const editAvatar = new PopupWithForm(config.popupAvatar, {
  handleFormSubmit: (item) => {
    notifyLoading(true, submitEditAvatar);
    api.patchAvatar(item)
    .then((item) => {
      userInfo.setUserInfo(item);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      notifyLoading(false, submitEditAvatar);
    })
  }
})
editAvatar.setEventListeners();

const handleEditAvatar = () => {
  editAvatar.open();
  avatarFormValidator.setSubmitButtonInactive();
  avatarFormValidator.deleteInputErrors();
  formAvatar.reset();
}

// Экземпляр модального окна с картинкой
const openPopupWithImage = new PopupWithImage(config.popupImageSelector)
openPopupWithImage.setEventListeners();

// Попап с подтверждением удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(config.popupDeleteCard, {
  handleDeleteButtonClick: () => {
    const cardId = popupWithConfirmation.object._cardId;
    api.deleteCard(cardId)
    .then(() => {
      popupWithConfirmation.object.handleRemove();
      popupWithConfirmation.close();
      popupWithConfirmation.object = '';
    })
    .catch((err) => {
      console.log(err);
    })
  }
})
popupWithConfirmation.setEventListeners();

// Валидация форм
const editFormValidator = new FormValidator(config, formPopupEdit);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formNewCard);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, formAvatar);
avatarFormValidator.enableValidation();

// Слушатели
openPopupEdit.addEventListener('click', handlePopupEditProfile);
placeButtonAdd.addEventListener('click', handlePopupNewCardOpen);
avatarEditButton.addEventListener('click', handleEditAvatar);