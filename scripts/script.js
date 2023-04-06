    const editBtn = document.querySelector('.profile__btn-edit');
    const openAddCardPopupBtn = document.querySelector('.profile__btn-add');
    const closeBtn = document.querySelector('.popup__close-icon');
    const closeAddCardPopupBtn = document.querySelector('.popup__close-icon_add');
    const saveBtn = document.querySelector('.form__btn');
    const popupEditProfile = document.querySelector('.popup');
    const popupAddCard = document.querySelector('.popup_cards_add');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    const cardContainer = document.querySelector('.elements');
    const cardTemplate = document.querySelector('#cardTemplate').content;
    let nameInput = document.querySelector('.form__input_type_name');
    let jobInput = document.querySelector('.form__input_type_info');
    const titleInput = document.querySelector('.form__input_type_title');
    const srcInput = document.querySelector('.form__input_type_src');
    const popUpImgView = document.querySelector('.popup_img_view');
    const popupImgCloseBtn = document.querySelector('.popup__close-icon_img');
    // Находим форму в DOM
    let formElement = document.querySelector('.form');
    let addCardFormElement = document.querySelector('.form_card_add');

    const initialCards = [
      {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },
      {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
      }
    ];

    initial();

    function addHandlerToLikeBtns() {
      const likeBtns = document.querySelectorAll('.element__like-btn');

      const likeBtnHandler = (event) => {
        event.target.classList.toggle('element__like-btn_active');
      }

      likeBtns.forEach((likeBtn) => {
        likeBtn.addEventListener('click', (event) => likeBtnHandler(event));
      });
    }

    function addHandlerToDeleteBtns() {
      const deleteBtns = document.querySelectorAll('.element__del-btn');

      const delBtnHandler = (event) => {
        event.target.parentElement.remove();
      }

      deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', (event) => delBtnHandler(event));
      });
    }

    function addHandlerToImg(isInitial) {
      const imgList = isInitial ? document.querySelectorAll('.element__img') : document.querySelector('.element__img');
      const imgElement = document.querySelector('.popup__img');
      const popUpCaption = document.querySelector('.popup__caption');

      const imgClickHandler = (event) => {
        popUpImgView.classList.add('popup_opened');
        imgElement.src = event.target.src;
        popUpCaption.textContent = event.target.parentElement.querySelector('.element__title').textContent;
      }

      if (isInitial) {
        imgList.forEach((img) => {
          img.addEventListener('click', (event) => imgClickHandler(event));
        });
      } else {
        imgList.addEventListener('click', (event) => imgClickHandler(event));
      }

      popupImgCloseBtn.addEventListener('click', () => popUpImgView.classList.remove('popup_opened'));
    }

    function initial() {
      initialCards.forEach((card) => {
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        cardElement.querySelector('.element__img').src = card.link;
        cardElement.querySelector('.element__title').textContent = card.name;
        cardContainer.appendChild(cardElement);
      });

      addHandlerToLikeBtns();
      addHandlerToDeleteBtns();
      addHandlerToImg(true);
    }

    function initialForTitlePopUp() {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileSubtitle.textContent;
    }

    function editBtnHandler() {
      popupEditProfile.classList.add('popup_opened');
      initialForTitlePopUp();
    }

    function closeBtnHandler() {
      popupEditProfile.classList.remove('popup_opened');
    }

    function openAddCardPopup() {
      popupEditProfile.classList.remove('popup_opened');
    }

    // --------------- Для попапа добавления карточки места --------------------------

    function openAddCardPopupBtnHandler() {
      popupAddCard.classList.add('popup_opened');
    }

    function closeAddCardPopupBtnHandler() {
      popupAddCard.classList.remove('popup_opened');
    }

    // --------------- ---------------------------------------------------------------

    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler (evt, isFromEditForm) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                            // Так мы можем определить свою логику отправки.
                            // О том, как это делать, расскажем позже.
      // Вставьте новые значения с помощью textContent

      if (isFromEditForm) {
        profileTitle.textContent = nameInput.value;
        profileSubtitle.textContent = jobInput.value;
        popupEditProfile.classList.remove('popup_opened');
      } else {
        const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
        cardElement.querySelector('.element__img').src = srcInput.value;
        cardElement.querySelector('.element__title').textContent = titleInput.value;
        cardContainer.insertBefore(cardElement, cardContainer.firstChild);
        popupAddCard.classList.remove('popup_opened');

        const likeBtn = document.querySelector('.element__like-btn');
        const delBtn = document.querySelector('.element__del-btn');

        const likeBtnHandler = (event) => {
          event.target.classList.toggle('element__like-btn_active');
        }
        likeBtn.addEventListener('click', (event) => likeBtnHandler(event));

        const delBtnHandler = (event) => {
          event.target.parentElement.remove();
        }
        delBtn.addEventListener('click', (event) => delBtnHandler(event));

      addHandlerToImg(false);

      }

    }

    editBtn.addEventListener('click', editBtnHandler);
    closeBtn.addEventListener('click', closeBtnHandler);

    openAddCardPopupBtn.addEventListener('click', openAddCardPopupBtnHandler);
    closeAddCardPopupBtn.addEventListener('click', closeAddCardPopupBtnHandler);

    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
    formElement.addEventListener('submit', (evt) => formSubmitHandler(evt, true));
    addCardFormElement.addEventListener('submit', (evt) => formSubmitHandler(evt, false));

