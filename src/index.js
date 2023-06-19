    import Card from './components/Card.js';
    import Section from './components/Section.js';
    import { formConfig } from './utils/constants.js';
    import './pages/index.css';
    import PopupWithImage from './components/PopupWithImage.js';
    import PopupWithForm from './components/PopupWithForm.js';
    import PopupWithConfirmation from './components/PopupWithConfirmation.js';
    import UserInfo from './components/UserInfo.js';
    import FormValidator from './components/FormValidator.js';
    import { api } from './components/Api.js';

    let cardList = undefined;

    api.getInitialCards()
    .then((cards) => {
      cardList = new Section({
        items: cards,
        renderer: (item) => addCardItem(item)
      }, '.elements');
      cardList.renderItems();
    })

    const popupProfileOpenButton = document.querySelector('.profile__btn-edit');
    const popupAddCardOpenBtn = document.querySelector('.profile__btn-add');
    const popupEditAvatarOpenBtn = document.querySelector('.profile__avatar');

    const profileEditForm = document.querySelector('.form_profile_add');
    const cardAddForm = document.querySelector('.form_card_add');
    const avatarEditForm = document.querySelector('.form_edit_avatar');

    const profileEditFormValidator = new FormValidator(formConfig, profileEditForm);
    const cardAddFormValidator = new FormValidator(formConfig, cardAddForm);
    const editAvatarFormValidator = new FormValidator(formConfig, avatarEditForm);

    const popupWithImage = new PopupWithImage('.popup_img_view');
    popupWithImage.setEventListeners();

    const popupWithFormProfile = new PopupWithForm({
      submitFormCallback: editProfileFormSubmitHandler
     }, '.popup_edit_profile');

    const userInfo = new UserInfo({
      profileTitleSelector: '.profile__title',
      profileSubtitleSelector: '.profile__subtitle',
      profileAvatarSelector: '.profile__avatar'
    }, popupWithFormProfile);

     const popupWithFormCard = new PopupWithForm({
      submitFormCallback: addCardFormSubmitHandler
     }, '.popup_cards_add');

     const popupWithFormEditAvatar = new PopupWithForm({
      submitFormCallback: editAvatarFormSubmitHandler
     }, '.popup_edit_avatar');


     const popupWithFormDeleteCard = new PopupWithConfirmation(
      ({ card, cardId }) => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.remove();
            popupWithFormDeleteCard.close();
          })
      },
      '.popup_delete_card'
     );


    function addCardItem(item) {
      const card = new Card(item, '#cardTemplate', handleCardClick, popupWithFormDeleteCard, userInfo);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }

    popupWithFormProfile.setEventListeners();
    popupWithFormCard.setEventListeners();
    popupWithFormEditAvatar.setEventListeners();
    popupWithFormDeleteCard.setEventListeners();

    function handleCardClick(link, name, caption) {
      popupWithImage.open({ link, name, caption });
    }

    function editProfileFormSubmitHandler(evt, inputValues) {
      evt.preventDefault();
      userInfo.setUserInfo({
        profileTitleContent: inputValues['name'],
        profileSubtitleContent: inputValues['info'],
      });
    }

    function addCardFormSubmitHandler(evt, inputValues) {
      evt.preventDefault();
      const popupBtn = popupWithFormCard._form.querySelector('.popup__button');
      const defaultTextContent = popupBtn.textContent;
      popupBtn.textContent = `${defaultTextContent} ...`;

      api.addCard(inputValues['title'], inputValues['link'])
      .then((cardData) => {
        addCardItem(cardData);
        popupWithFormCard.close();
      })
      .finally(() => {
        popupBtn.textContent = defaultTextContent;
      })
    }

    function editAvatarFormSubmitHandler(evt, inputValues) {
      evt.preventDefault();
      const avatarLink = inputValues['link'];
      const popupBtn = popupWithFormEditAvatar._form.querySelector('.popup__button');
      const defaultTextContent = popupBtn.textContent;
      popupBtn.textContent = `${defaultTextContent} ...`;


      api.editUserAvatar(avatarLink)
      .then((response) => {
        console.log(response);
        popupEditAvatarOpenBtn.style.backgroundImage=`url(${response.avatar})`;
        popupWithFormEditAvatar.close();
      })
      .finally(() => {
        popupBtn.textContent = defaultTextContent;
      })
    }

    function editBtnHandler() {
      const initialValues = userInfo.getUserInfo();
      popupWithFormProfile.setInitialValues({ name: initialValues.profileTitleContent, info: initialValues.profileSubtitleContent  });
      profileEditFormValidator.resetInputValidity();
      popupWithFormProfile.open();
    }

    function openAddCardPopupBtnHandler() {
      cardAddFormValidator.resetInputValidity();
      popupWithFormCard.open();
    }

    function openEditAvatarPopupBtnHandler() {
      editAvatarFormValidator.resetInputValidity();
      popupWithFormEditAvatar.open();
    }

    popupProfileOpenButton.addEventListener('click', editBtnHandler);
    popupAddCardOpenBtn.addEventListener('click', openAddCardPopupBtnHandler);
    popupEditAvatarOpenBtn.addEventListener('click', openEditAvatarPopupBtnHandler);



