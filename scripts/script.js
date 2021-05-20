let openPopup = document.querySelector('.popup-open');
let popup = document.querySelector('body > .popup');
let closePopup = document.querySelector('.popup__close');

openPopup.addEventListener('click', function() {
  popup.classList.add('popup_opened');
})

closePopup.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})