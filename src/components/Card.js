export default class Card {
  constructor(cardData, selectorTemplate, handleCardClick) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._selectorTemplate = selectorTemplate;
    this._imagePopup = document.querySelector('.popup_img_view');
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector('.element__img');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._likeBtnElement = this._cardElement.querySelector('.element__like-btn');
    this._deleteBtnElement = this._cardElement.querySelector('.element__del-btn');
    this._titleElement = this._cardElement.querySelector('.element__title');
    this._titleElement.textContent = this._name;
    this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._likeBtnElement.addEventListener('click', this._handleLike);
    this._deleteBtnElement.addEventListener('click', this._handleDeleteElement);
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name, this._titleElement.textContent)
    });
  }

  createCard() {
    this._setEventListeners();
    return this._cardElement;
  }

}
