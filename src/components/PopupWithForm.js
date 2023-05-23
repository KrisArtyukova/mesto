import Popup from "./Popup";
import { formConfig } from "../utils/constants";
import FormValidator from "./FormValidator";

export default class PopupWithForm extends Popup {
  constructor({ submitFormCallback, inputTitleElement, inputSubtitleElement }, popupSelector) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputSelector = formConfig.inputSelector;
    this._inputTitleElement = inputTitleElement;
    this._inputSubtitleElement = inputSubtitleElement;
    this._formValidator = new FormValidator(formConfig, this._form);
  }

  setInitialValues(name, job) {
    this._inputTitleElement.value = name;
    this._inputSubtitleElement.value = job;
  }

  _getInputValues() {
    return {
      inputTitleValue: this._inputTitleElement.value,
      inputSubTitleValue: this._inputSubtitleElement.value,
    }
  }

  _submitForm(event) {
    const inputValues = this._getInputValues();
    this._submitFormCallback(event, inputValues.inputTitleValue, inputValues.inputSubTitleValue);
  }

  close() {
    super.close();
    this._formValidator.resetInputValidity();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(event);
    });
  }
}
