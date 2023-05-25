    import Card from './components/Card.js';
    import Section from './components/Section.js';
    import { initialCards, formConfig } from './utils/constants.js';
    import './pages/index.css';
    import PopupWithImage from './components/PopupWithImage.js';
    import PopupWithForm from './components/PopupWithForm.js';
    import UserInfo from './components/UserInfo.js';
    import FormValidator from './components/FormValidator.js';

    const popupProfileOpenButton = document.querySelector('.profile__btn-edit');
    const popupAddCardOpenBtn = document.querySelector('.profile__btn-add');
    const profileEditForm = document.querySelector('.form_profile_add');
    const cardAddForm = document.querySelector('.form_card_add');

    const profileEditFormValidator = new FormValidator(formConfig, profileEditForm);
    const cardAddFormValidator = new FormValidator(formConfig, cardAddForm);

    const popupWithImage = new PopupWithImage('.popup_img_view');

    const userInfo = new UserInfo({
      profileTitleSelector: '.profile__title',
      profileSubtitleSelector: '.profile__subtitle'
    });

    function addCardItem(item) {
      const card = new Card(item, '#cardTemplate', handleCardClick);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }

    const cardList = new Section({
      items: initialCards,
      renderer: (item) => addCardItem(item)
    }, '.elements');

    const popupWithFormProfile = new PopupWithForm({
      submitFormCallback: editProfileFormSubmitHandler
     }, '.popup_edit_profile');

     const popupWithFormCard = new PopupWithForm({
      submitFormCallback: addCardFormSubmitHandler
     }, '.popup_cards_add');


    cardList.renderItems();
    popupWithFormProfile.setEventListeners();
    popupWithFormCard.setEventListeners();

    function handleCardClick(link, name, caption) {
      popupWithImage.setEventListeners();
      popupWithImage.open({ link, name, caption });
    }

    function editProfileFormSubmitHandler(evt, inputValues) {
      evt.preventDefault();
      userInfo.setUserInfo({
        profileTitleContent: inputValues['name'],
        profileSubtitleContent: inputValues['info'],
      });
      popupWithFormProfile.close();
    }

    function addCardFormSubmitHandler(evt, inputValues) {
      evt.preventDefault();
      addCardItem({ link: inputValues['link'], name: inputValues['title'] });
      popupWithFormCard.close();
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

    popupProfileOpenButton.addEventListener('click', editBtnHandler);
    popupAddCardOpenBtn.addEventListener('click', openAddCardPopupBtnHandler);


