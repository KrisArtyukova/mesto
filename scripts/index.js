    import Card from './Card.js';
    import FormValidator from './FormValidator.js';
    import { initialCards, formConfig } from './constants.js';

    const editBtn = document.querySelector('.profile__btn-edit');
    const openAddCardPopupBtn = document.querySelector('.profile__btn-add');
    const popupEditProfile = document.querySelector('.popup_edit_profile');
    const popupEditCloseButton = popupEditProfile.querySelector('.popup__close-icon');
    const closeAddCardPopupBtn = document.querySelector('.popup__close-icon_add');
    const popupAddCard = document.querySelector('.popup_cards_add');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    const cardsContainer = document.querySelector('.elements');
    const nameInput = document.querySelector('.form__input_type_name');
    const jobInput = document.querySelector('.form__input_type_info');
    const titleInput = document.querySelector('.form__input_type_title');
    const srcInput = document.querySelector('.form__input_type_src');
    const editProfileFormElement = document.querySelector('.form_profile_add');
    const addCardFormElement = document.querySelector('.form_card_add');

    const profileFormValidator = new FormValidator(formConfig, editProfileFormElement);
    const cardFormValidator = new FormValidator(formConfig, addCardFormElement);

    renderInitialCards();

    function handleCardClick(element, link, name, caption) {
      const imagePopupImg = element.querySelector('.popup__img');
      const imagePopupCaption = element.querySelector('.popup__caption');
      imagePopupImg.src = link;
      imagePopupImg.alt = name;
      imagePopupCaption.textContent = caption;

      openPopup(element);
    }

    function addCard(cardsListFragment) {
      cardsContainer.prepend(cardsListFragment);
    }

    function createCard(link, name) {
      const cardData = {
        link,
        name,
        imagePopup: '.popup_img_view',
      }

      const card = new Card(cardData, '#cardTemplate', handleCardClick, closePopup);
      const cardElement = card.createCard();
      return cardElement
    }

    function renderInitialCards() {
      const cardsListFragment = document.createDocumentFragment();

      initialCards.forEach((card) => {
        cardsListFragment.appendChild(createCard(card.link, card.name))
      });

      addCard(cardsListFragment);
    }

    function fillProfilePopupInputs() {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileSubtitle.textContent;
    }

    function editBtnHandler() {
      profileFormValidator.resetInputValidity();
      openPopup(popupEditProfile);
      fillProfilePopupInputs();
    }

    function popupProfileCloseBtnHandler() {
      editProfileFormElement.reset();
      closePopup(popupEditProfile);
    }


    // --------------- Для попапа добавления карточки места --------------------------

    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
      }
    }


    function openAddCardPopupBtnHandler() {
      cardFormValidator.resetInputValidity();
      openPopup(popupAddCard);
    }

    function closeAddCardPopupBtnHandler() {
      addCardFormElement.reset();
      closePopup(popupAddCard);
    }

    // --------------- ---------------------------------------------------------------


    function openPopup(element) {
      document.body.addEventListener('keydown', closeByEsc);
      element.classList.add('popup_opened');
    }

    function closePopup(element) {
      document.body.removeEventListener('keydown', closeByEsc);
      element.classList.remove('popup_opened');
    }

    function editProfileFormSubmitHandler(evt) {
      evt.preventDefault();
      profileTitle.textContent = nameInput.value;
      profileSubtitle.textContent = jobInput.value;
      closePopup(popupEditProfile);
    }

    function addCardFormSubmitHandler(evt) {
      evt.preventDefault();
      addCard(createCard(srcInput.value, titleInput.value));
      closeAddCardPopupBtnHandler();
    }

    editBtn.addEventListener('click', editBtnHandler);
    popupEditCloseButton.addEventListener('click', popupProfileCloseBtnHandler);
    openAddCardPopupBtn.addEventListener('click', openAddCardPopupBtnHandler);
    closeAddCardPopupBtn.addEventListener('click', closeAddCardPopupBtnHandler);
    editProfileFormElement.addEventListener('submit', editProfileFormSubmitHandler);
    addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);

    popupAddCard.addEventListener('click', (event) => {
      if (event.target === popupAddCard) closeAddCardPopupBtnHandler();
    });

    popupEditProfile.addEventListener('click', (event) => {
      if (event.target === popupEditProfile) popupProfileCloseBtnHandler();
    });


