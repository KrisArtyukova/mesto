import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({ link, name, caption }, popupSelector) {
    super(popupSelector);
    this._link = link;
    this._name = name;
    this._caption = caption;
    this._imageElement = this._popupElement.querySelector('.popup__img');
    this._imagePopupCaption = this._popupElement.querySelector('.popup__caption');
  }

  open() {
    super.open();
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._imagePopupCaption.textContent = this._caption;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
