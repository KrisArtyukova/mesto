export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector('.popup__close-icon');
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popupElement.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    console.log('click');
    if (evt.key === 'Escape') this.close();
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener('click', () => this.close());
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target === this._popupElement) this.close();
    });
  }
}
