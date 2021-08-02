export const popupImage = document.querySelector('.popup_type_image');
export const placeImage = popupImage.querySelector('.popup__image');
export const namePopupImage = popupImage.querySelector('.popup__name');

export function openPopup(popup) {
    document.addEventListener('keydown', handleEscUp);
    popup.classList.add('popup_opened');
  }

 export function handleEscUp (evt) {
    if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
    }
  }

 export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscUp);
  }