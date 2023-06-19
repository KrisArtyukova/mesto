import { api } from './Api';

export default class Card {
  constructor(cardData, selectorTemplate, handleCardClick, popupWithFormDeleteCard, userInfo) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._popupWithFormDeleteCard = popupWithFormDeleteCard;
    this._selectorTemplate = selectorTemplate;
    this._imagePopup = document.querySelector('.popup_img_view');
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector('.element__img');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._likeBtnElement = this._cardElement.querySelector('.element__like-btn');
    this._likeCountElement = this._cardElement.querySelector('.element__like-count');
    this._deleteBtnElement = this._cardElement.querySelector('.element__del-btn');
    this._titleElement = this._cardElement.querySelector('.element__title');
    this._titleElement.textContent = this._name;
    this._handleCardClick = handleCardClick;
    this._likeCountElement.textContent = this._likes.length;
    this._hasOwnLike = this._resolveOwnLike(cardData);
    this._userInfo = userInfo.getUserInfo().userInfo;
    if (this._hasOwnLike) this._likeBtnElement.classList.add('element__like-btn_active');
    if (cardData.owner._id !== this._userInfo._id) this._deleteBtnElement.remove();
  }

  _resolveOwnLike(cardData) {
    return cardData.likes.some((like) => {
      return (like.name === cardData.owner.name && like.about === cardData.owner.about);
    });
  }

  _getTemplate() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
  }

  _handleLike = () => {
    if (this._hasOwnLike) {
      api.deleteLike(this._cardId)
      .then((cardData) => {
        this._likeCountElement.textContent = cardData.likes.length;
        this._likeBtnElement.classList.remove('element__like-btn_active');
        this._hasOwnLike = this._resolveOwnLike(cardData);
      });
    } else {
      api.addLike(this._cardId)
      .then((cardData) => {
        this._likeCountElement.textContent = cardData.likes.length;
        this._likeBtnElement.classList.add('element__like-btn_active');
        this._hasOwnLike = this._resolveOwnLike(cardData);
      });
    }
  }

  _handleDeleteElement = () => {
    this._popupWithFormDeleteCard.open({card: this._cardElement, cardId: this._cardId});
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
