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
submitButton,
avatarEditButton,
formAvatar
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

// Функции

let currentUser;
let renderCardList;

const userInfo = new UserInfo(config.nameProfile, config.roleProfile, config.avatarImage)

// Рендер карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([res, cards]) => {
  currentUser = res._id;
  setUserInfo({ name: res.name, role: res.about, avatar: res.avatar });
  setCardsArray(cards);
})
.catch((err) => {
  console.log(err);
})

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

function setUserInfo(info) {
  currentUser = info;
  userInfo.setUserInfo(info)
}
// Открытие модального окна с картинкой
const handleCardClick = (name, link) => openPopupWithImage.open(name, link);

// Уведомление о загрузке
function notifyLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// Создание карточки
function createCard(item) {
  const isEdited = item.owner._id === currentUser._id
  const isLiked = item.likes.some(owner => owner._id === currentUser._id)
  const card = new Card(
    item._id,
    item.name,
    item.link,
    item.likes.length,
    config.cardSelector,
    isEdited,
    isLiked,
    handleCardClick,
    handleCardDelete,
    handleCardLike
    );
  return card.generateCard();
}

function handleCardDelete(card, cardId) {
  popupWithConfirmation.open(() => {
    api.deleteCard(cardId)
    .then(() => {
      card.handleRemove()
      popupWithConfirmation.close()
    })
    .catch((err) => {
      console.log(err);
    })
  })
}

function handleCardLike(card, cardId, isActive) {
  function editLikeCount(data) {
    card.setLikesNumber(data.likes.length)
    card.likeStatus()
  }
  if (!isActive) {
    api.putLike(cardId)
    .then(editLikeCount)
    .catch((err) => {
      console.log(err);
    })
  } else {
    api.deleteLike(cardId)
    .then(editLikeCount)
    .catch((err) => {
      console.log(err);
    })
  }
}

// Валидация форм
const editFormValidator = new FormValidator(config, formPopupEdit);
editFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formNewCard);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, formAvatar);
avatarFormValidator.enableValidation();

// Экземпляр модального окна с картинкой
const openPopupWithImage = new PopupWithImage(config.popupImageSelector)
openPopupWithImage.setEventListeners();

// Экземпляр формы с удалением
const popupWithConfirmation = new PopupWithConfirmation(config.popupDeleteCard)
popupWithConfirmation.setEventListeners();

// Открыть форму редактирования профиля
const popupUserForm = new PopupWithForm(config.popupEdit, {
  handleFormSubmit: (item) => {
    notifyLoading(true, submitButton);
    api.editUserInfo(item)
    .then((item) => {
      userInfo.setUserInfo(item);
      popupUserForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      notifyLoading(false, submitButton);
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

// Открыть форму добавления карточки
const popupAddForm = new PopupWithForm(config.popupNewCard, {
  handleFormSubmit: (item) => {
    notifyLoading(true, submitButton);
    api.addNewCard(item)
    .then((data) => {
      createCard(data);
      cardFormValidator.setSubmitButtonInactive();
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      notifyLoading(false, submitButton);
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

// Открыть редактирование аватара
const editAvatar = new PopupWithForm(config.popupAvatar, {
  handleFormSubmit: (item) => {
    notifyLoading(true, submitButton);
    api.patchAvatar(item)
    .then((item) => {
      userInfo.setUserInfo(item);
      editAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      notifyLoading(false, submitButton);
    })
  }
})
editAvatar.setEventListeners()

const handleEditAvatar = () => {
  editAvatar.open();
  avatarFormValidator.setSubmitButtonInactive();
  avatarFormValidator.deleteInputErrors();
  formAvatar.reset();
}


openPopupEdit.addEventListener('click', handlePopupEditProfile);
placeButtonAdd.addEventListener('click', handlePopupNewCardOpen);
avatarEditButton.addEventListener('click', handleEditAvatar);