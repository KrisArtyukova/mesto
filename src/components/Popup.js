export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector('.popup__close-icon');
  }

  open() {
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  setEventListeners() {
    document.addEventListener('keydown', (event) => this._handleEscClose(event));
    this._popupCloseBtn.addEventListener('click', () => this.close());
    this._popupElement.addEventListener('click', (event) => {
      if (event.target === this._popupElement) this.close();
    });
  }
}
