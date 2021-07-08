// Функция наложения валидации на формы
const enableValidation = ({formSelector, ...rest}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));
  getFormList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });

      setEventListeners(formElement, rest);

  })
};
// Накладываем на инпуты обработчики по событию ввода текста в поле
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, errorClass, inputErrorClass, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, {errorClass, inputErrorClass});
          toggleButtonState(inputList, buttonElement);
      })
  })
};
// Проверка валидности инпутов
const checkInputValidity = (formElement, inputElement, {errorClass, inputErrorClass}) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, {errorClass, inputErrorClass});
      } else {
        hideInputError(formElement, inputElement, {errorClass, inputErrorClass});
      }
  };
// Показ ошибок инпутов
const showInputError = (formElement, inputElement, errorMessage, {errorClass, inputErrorClass, ...rest}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
// Скрытие ошибок инпутов
const hideInputError = (formElement, inputElement, {errorClass, inputErrorClass, ...rest}) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.remove(inputErrorClass);
   errorElement.classList.remove(errorClass);
   errorElement.textContent = '';
 };
// Проверка невалидных полей в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
} else {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}
}

// Функция сброса ошибок у полей ввода форм
const deleteInputErrors = (config) => {
  const forms = [...document.querySelectorAll(config.formSelector)];
  forms.forEach((formElement) => {
    const inputList = [...formElement.querySelectorAll(config.inputSelector)];
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
    })
  })
};

enableValidation(config);