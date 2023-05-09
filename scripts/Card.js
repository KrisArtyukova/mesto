export default class Card {
  constructor(cardData, selectorTemplate) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._selectorTemplate = selectorTemplate;
    this._imagePopup = document.querySelector(cardData.imagePopup);
    this._imagePopupImg = this._imagePopup.querySelector('.popup__img');
    this._imagePopupCaption = this._imagePopup.querySelector('.popup__caption');
    this._imagePopupCloseBtn = this._imagePopup.querySelector('.popup__close-icon_img');
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector('.element__img');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._likeBtnElement = this._cardElement.querySelector('.element__like-btn');
    this._deleteBtnElement = this._cardElement.querySelector('.element__del-btn');
    this._titleElement = this._cardElement.querySelector('.element__title');
    this._titleElement.textContent = this._name;
  }

  _getTemplate() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
  }

  _handleLike = () => {
    this._likeBtnElement.classList.toggle('element__like-btn_active');
  }

  _handleDeleteElement = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _openImagePopup = () => {
    document.body.addEventListener('keydown', this._closeByEsc);
    this._imagePopup.classList.add('popup_opened');
    this._imagePopupImg.src = this._link;
    this._imagePopupImg.alt = this._name;
    this._imagePopupCaption.textContent = this._titleElement.textContent;
  }

  _closeImagePopup = () => {
    this._imagePopup.classList.remove('popup_opened');
  }

  _closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
      this._closeImagePopup();
    }

    document.body.removeEventListener('keydown', this._closeByEsc);
  }

  _setEventListeners() {
    this._likeBtnElement.addEventListener('click', this._handleLike);
    this._deleteBtnElement.addEventListener('click', this._handleDeleteElement);
    this._imageElement.addEventListener('click', this._openImagePopup);
    this._imagePopupCloseBtn.addEventListener('click', this._closeImagePopup);
  }

  createCard() {
    this._setEventListeners();
    return this._cardElement;
  }

}
