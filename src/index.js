    import Card from './components/Card.js';
    import Section from './components/Section.js';
    import { initialCards } from './utils/constants.js';
    import './pages/index.css';
    import PopupWithImage from './components/PopupWithImage.js';
    import PopupWithForm from './components/PopupWithForm.js';
    import UserInfo from './components/UserInfo.js';

    const editBtn = document.querySelector('.profile__btn-edit');
    const openAddCardPopupBtn = document.querySelector('.profile__btn-add');
    const nameInput = document.querySelector('.form__input_type_name');
    const jobInput = document.querySelector('.form__input_type_info');
    const titleInput = document.querySelector('.form__input_type_title');
    const srcInput = document.querySelector('.form__input_type_src');

    const userInfo = new UserInfo({
      profileTitleSelector: '.profile__title',
      profileSubtitleSelector: '.profile__subtitle'
    });

    const cardList = new Section({
      items: initialCards,
      renderer: (item) => {
        const card = new Card(item, '#cardTemplate', handleCardClick);
        const cardElement = card.createCard();
        cardList.addItem(cardElement);
      }
    }, '.elements');

    const popupWithFormProfile = new PopupWithForm({
      submitFormCallback: editProfileFormSubmitHandler,
      inputTitleElement: nameInput,
      inputSubtitleElement: jobInput,
     }, '.popup_edit_profile');

     const popupWithFormCard = new PopupWithForm({
      submitFormCallback: addCardFormSubmitHandler,
      inputTitleElement: titleInput,
      inputSubtitleElement: srcInput,
     }, '.popup_cards_add');


    cardList.renderItems();
    popupWithFormProfile.setEventListeners();
    popupWithFormCard.setEventListeners();

    function handleCardClick(link, name, caption) {
      const popupWithImage = new PopupWithImage({ link, name, caption }, '.popup_img_view');
      popupWithImage.setEventListeners();
      popupWithImage.open();
    }

    function editProfileFormSubmitHandler(evt, nameValue, jobValue) {
      evt.preventDefault();
      userInfo.setUserInfo({
        profileTitleContent: nameValue,
        profileSubtitleContent: jobValue,
      });
      popupWithFormProfile.close();
    }

    function addCardFormSubmitHandler(evt, nameValue, linkValue) {
      evt.preventDefault();
      const card = new Card({ link: linkValue, name: nameValue }, '#cardTemplate', handleCardClick);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
      popupWithFormCard.close();
    }

    function editBtnHandler() {
      const initialValues = userInfo.getUserInfo();

      popupWithFormProfile.setInitialValues(initialValues.profileTitleContent, initialValues.profileSubtitleContent);
      popupWithFormProfile.open();
    }

    function openAddCardPopupBtnHandler() {
      popupWithFormCard.open();
    }

    editBtn.addEventListener('click', editBtnHandler);
    openAddCardPopupBtn.addEventListener('click', openAddCardPopupBtnHandler);


