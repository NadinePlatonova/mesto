let openPopup = document.querySelector('.profile__edit-button');
let popup = document.querySelector('body > .popup');
let closePopup = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_role');
let nameProfile = document.querySelector('.profile__name');
let roleProfile = document.querySelector('.profile__role');

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