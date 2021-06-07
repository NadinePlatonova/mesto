let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('body > .popup');
let closePopup = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_role');
let nameProfile = document.querySelector('.profile__name');
let roleProfile = document.querySelector('.profile__role');

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

const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');

function renderInitialCards() {
  initialCards.forEach(renderInitialCard);
}

function renderInitialCard ({name, link}) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = name;
  cardElement.querySelector('.element__like-button').addEventListener('click', likeStatus);
  cardElement.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  elementsList.append(cardElement);
}

renderInitialCards();

function likeStatus (evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function deleteCard (evt) {
  evt.target.closest('.element').remove();
}

function openPopupForm () {
  nameInput.value = nameProfile.textContent
  jobInput.value = roleProfile.textContent
  popup.classList.add('popup_opened');
}

function closePopupForm () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value
  roleProfile.textContent = jobInput.value
  closePopupForm();
}

openPopup.addEventListener('click', openPopupForm);
closePopup.addEventListener('click', closePopupForm);
formElement.addEventListener('submit', formSubmitHandler);