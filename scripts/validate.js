function setInputValidState(inputErrorClass, input, errorElement) {
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

function setInputInvalidState(inputErrorClass, input, errorElement) {
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;

}

function checkInputValidity(config, form, input) {
  const errorElement = form.querySelector(`#error-${input.id}`);

  if (input.checkValidity()) {
      setInputValidState(config.inputErrorClass, input, errorElement);
  } else {
      setInputInvalidState(config.inputErrorClass, input, errorElement);
  }
}

function disableButton({ inactiveButtonClass }, button) {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
}

function enableButton({ inactiveButtonClass }, button) {
  button.removeAttribute('disabled');
  button.classList.remove(inactiveButtonClass);
}

function toggleButtonValidity({ submitButtonSelector, ...rest }, form) {
  const submitButton = form.querySelector(submitButtonSelector);

  if (form.checkValidity()) {
      enableButton(rest, submitButton);
  } else {
      disableButton(rest, submitButton);
  }
}


function setSubmitListener(config, form) {
  form.addEventListener('submit', function (event) {
      event.preventDefault();
      toggleButtonValidity(config, form);
  });
}

function enableValidation({ formSelector, inputSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    const inputs = form.querySelectorAll(inputSelector);
    const inputsArray = Array.from(inputs);

    setInputsListeners(inputsArray, form, rest);
    setSubmitListener(rest, form);
    toggleButtonValidity(rest, form);
  });
}

function setInputsListeners(inputsArray, form, rest) {
  inputsArray.forEach(function (input) {
    input.addEventListener('input', () => {
        checkInputValidity(rest, form, input);
        toggleButtonValidity(rest, form);
    });
});
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function resetInputValidity(inputElements) {
  Array.from(inputElements).forEach((inputElement) => {
    const errorElement = document.querySelector(`#error-${inputElement.id}`);
    const config = {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    };
    setInputValidState(config.inputErrorClass, inputElement, errorElement);
  });
}
