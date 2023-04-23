// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const enableValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(enableValidationConfig);

function enableValidation(enableValidationConfig) {
  const formElements = document.querySelectorAll(enableValidationConfig.formSelector);

  Array.from(formElements).forEach((formElement) => {
    addValidation(formElement);
  });
}


function addValidation(formElement) {
  const inputElements = formElement.querySelectorAll(enableValidationConfig.inputSelector);
  const submitButtonElement = formElement.querySelector(enableValidationConfig.submitButtonSelector);

  Array.from(inputElements).forEach((inputElement) => {
    inputElement.addEventListener('change', (event) => {
      const currentInput = event.target;

      if (formElement.checkValidity()) {
        submitButtonElement.classList.remove(enableValidationConfig.inactiveButtonClass);
        submitButtonElement.removeAttribute('disabled');
      } else {
        submitButtonElement.classList.add(enableValidationConfig.inactiveButtonClass);
        submitButtonElement.setAttribute('disabled', true);
      }

      if (!currentInput.checkValidity()) {
        setValidationError(inputElement);
      } else {
        hideValidationError(inputElement);
      }
    });
  });
}

function setValidationError(inputElement) {
  inputElement.classList.add(enableValidationConfig.inputErrorClass);
  inputElement.nextElementSibling.textContent = inputElement.validationMessage;
  inputElement.nextElementSibling.classList.add(enableValidationConfig.errorClass);
}

function hideValidationError(inputElement) {
  inputElement.classList.remove(enableValidationConfig.inputErrorClass);
  inputElement.nextElementSibling.classList.remove(enableValidationConfig.errorClass);
}
