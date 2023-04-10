    const editBtn = document.querySelector('.profile__btn-edit');
    const openAddCardPopupBtn = document.querySelector('.profile__btn-add');
    const popupEditProfile = document.querySelector('.popup_edit_profile');
    const popupEditCloseButton = document.querySelector('.popup__close-icon');
    const closeAddCardPopupBtn = document.querySelector('.popup__close-icon_add');
    const popupAddCard = document.querySelector('.popup_cards_add');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    const cardsContainer = document.querySelector('.elements');
    const cardTemplate = document.querySelector('#cardTemplate').content;
    const nameInput = document.querySelector('.form__input_type_name');
    const jobInput = document.querySelector('.form__input_type_info');
    const titleInput = document.querySelector('.form__input_type_title');
    const srcInput = document.querySelector('.form__input_type_src');
    const popUpImgView = document.querySelector('.popup_img_view');
    const popUpImg = popUpImgView.querySelector('.popup__img');
    const popUpCaption = popUpImgView.querySelector('.popup__caption');
    const popupImgCloseBtn = popUpImgView.querySelector('.popup__close-icon_img');
    const editProfileFormElement = document.querySelector('.form');
    const addCardFormElement = document.querySelector('.form_card_add');

    renderInitialCards();

    function addHandlerToLikeBtn(likeBtn) {

      const likeBtnHandler = (event) => {
        event.target.classList.toggle('element__like-btn_active');
      }

      likeBtn.addEventListener('click', likeBtnHandler);
    }

    function addHandlerToDeleteBtn(deleteBtn) {
      const delBtnHandler = (event) => {
        event.target.closest('.element').remove();
      }

      deleteBtn.addEventListener('click', (event) => delBtnHandler(event));
    }

    function addHandlerToCardImg(cardImg, cardTitle) {
      const imgClickHandler = () => {
        openPopup(popUpImgView);
        popUpImg.src = cardImg.src;
        popUpImg.alt =cardTitle.textContent;
        popUpCaption.textContent = cardTitle.textContent;
      }

      cardImg.addEventListener('click', imgClickHandler);
    }


    function createCard(link, name) {
      const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
      const cardImg = cardElement.querySelector('.element__img');
      const cardTitle = cardElement.querySelector('.element__title');
      const likeBtn = cardElement.querySelector('.element__like-btn');
      const deleteBtn = cardElement.querySelector('.element__del-btn');

      cardImg.src = link;
      cardImg.alt = name;
      cardTitle.textContent = name;
      addHandlerToCardImg(cardImg, cardTitle);
      addHandlerToLikeBtn(likeBtn);
      addHandlerToDeleteBtn(deleteBtn);
      return cardElement;
    }

    function addCard(link, name) {
      cardsContainer.prepend(createCard(link, name));
    }

    function renderInitialCards() {
      initialCards.forEach((card) => {
        addCard(card.link, card.name);
      });
    }

    function fillProfilePopupInputs() {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileSubtitle.textContent;
    }

    function editBtnHandler() {
      openPopup(popupEditProfile);
      fillProfilePopupInputs();
    }

    function popupProfileCloseBtnHandler() {
      closePopup(popupEditProfile);
    }


    // --------------- Для попапа добавления карточки места --------------------------

    function openAddCardPopupBtnHandler() {
      openPopup(popupAddCard);
    }

    function closeAddCardPopupBtnHandler() {
      closePopup(popupAddCard);
    }

    // --------------- ---------------------------------------------------------------

    function popUpImgCloseHandler() {
      closePopup(popUpImgView);
    }


    function openPopup(element) {
      element.classList.add('popup_opened');
    }

    function closePopup(element) {
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
      addCard(srcInput.value, titleInput.value);
      closeAddCardPopupBtnHandler();
      evt.target.reset();
    }

    editBtn.addEventListener('click', editBtnHandler);
    popupEditCloseButton.addEventListener('click', popupProfileCloseBtnHandler);
    openAddCardPopupBtn.addEventListener('click', openAddCardPopupBtnHandler);
    closeAddCardPopupBtn.addEventListener('click', closeAddCardPopupBtnHandler);
    editProfileFormElement.addEventListener('submit', editProfileFormSubmitHandler);
    addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);
    popupImgCloseBtn.addEventListener('click', popUpImgCloseHandler);


