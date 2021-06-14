const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const nameProfile = document.querySelector('.profile__name');
const roleProfile = document.querySelector('.profile__role');
const openPopupEdit = document.querySelector('.profile__edit-button');
const openPopupAddCard = document.querySelector('.profile__add-button');
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;
const popups = document.querySelectorAll('.popup');

// Редактирование профиля
const popupEdit = document.querySelector('.popup_type_edit');
const closePopupEdit = popupEdit.querySelector('.popup__close');
const formElement = popupEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__text_type_name');
const jobInput = formElement.querySelector('.popup__text_type_role');

// Добавление новой карточки
const popupAddCard = document.querySelector('.popup_type_new-card');
const closePopupAddCard = popupAddCard.querySelector('.popup__close');
const formPopupAddCard = popupAddCard.querySelector('.popup__form');

// Попап с картинкой
const popupImage = document.querySelector('.popup_type_image');
const openPopupImage = popupImage.querySelector('.popup__image');
const namePopupImage = popupImage.querySelector('.popup__name');
const closePopupImage = popupImage.querySelector('.popup__close');

// Функции
function renderInitialCards() {
  initialCards.forEach(renderInitialCard);
}

function renderInitialCard (item) {
  const card = createCard(item);
  elementsList.append(card);
}

renderInitialCards();

function createCard (item) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__image').src = item.link;
  cardElement.querySelector('.element__image').alt = item.name;
  cardElement.querySelector('.element__like-button').addEventListener('click', likeStatus);
  cardElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  return cardElement;
}

function likeStatus (evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function deleteCard (evt) {
  evt.target.closest('.element').remove();
}

popups.forEach((item) => {
  item.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")) {
        
          closePopup(item)
          
      }
  })
})

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupForm () {
  nameInput.value = nameProfile.textContent
  jobInput.value = roleProfile.textContent
  openPopup(popupEdit);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Редактирование профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value
  roleProfile.textContent = jobInput.value
  closePopup(popupEdit);
}

//Открытие модального окна "Добавление карточек"
function handlePopupNewCardOpen() {
  openPopup(popupAddCard);
  formPopupAddCard.reset();
}

openPopupEdit.addEventListener('click', openPopupForm);
openPopupAddCard.addEventListener('click', handlePopupNewCardOpen);
formElement.addEventListener('submit', formSubmitHandler);