    const editBtn = document.querySelector('.profile__btn-edit');
    const closeBtn = document.querySelector('.popup__close-icon');
    const saveBtn = document.querySelector('.form__btn');
    const popupEditProfile = document.querySelector('.popup');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    let nameInput = document.querySelector('.form__input_type_name');
    let jobInput = document.querySelector('.form__input_type_info');
    // Находим форму в DOM
    let formElement = document.querySelector('form');

    function initial() {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileSubtitle.textContent;
    }

    function editBtnHandler() {
      popupEditProfile.classList.add('popup_opened');
      initial();
    }

    function closeBtnHandler() {
      popupEditProfile.classList.remove('popup_opened');
    }

    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler (evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                            // Так мы можем определить свою логику отправки.
                            // О том, как это делать, расскажем позже.

      // Вставьте новые значения с помощью textContent
      profileTitle.textContent = nameInput.value;
      profileSubtitle.textContent = jobInput.value;
      popupEditProfile.classList.remove('popup_opened');
    }

    editBtn.addEventListener('click', editBtnHandler);
    closeBtn.addEventListener('click', closeBtnHandler);

    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
    formElement.addEventListener('submit', formSubmitHandler);
