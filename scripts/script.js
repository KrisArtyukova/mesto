    const editBtn = document.querySelector('.profile__btn-edit');
    const closeBtn = document.querySelector('.popup__close-icon');
    const saveBtn = document.querySelector('.form__btn');
    const popupEditProfile = document.querySelector('.popup');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    let nameInput = document.querySelector('input.form__input_type_name');
    let jobInput = document.querySelector('input.form__input_type_info');
    // Находим форму в DOM
    let formElement = document.querySelector('form');

    function initial() {
      nameInput.value = profileTitle.textContent;
      jobInput.value = profileSubtitle.textContent;
    }

    function editBtnHandler() {
      popupEditProfile.classList.add('form_opened');
      initial();
    }

    function closeBtnHandler() {
      popupEditProfile.classList.remove('form_opened');
    }

    function saveBtnHandler() {
      popupEditProfile.classList.remove('form_opened');
    }

     // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler (evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                            // Так мы можем определить свою логику отправки.
                            // О том, как это делать, расскажем позже.

      // Получите значение полей из свойства value
      const nameInputValue = nameInput.value;
      const jobInputValue = jobInput.value;

      // Вставьте новые значения с помощью textContent
      profileTitle.textContent = nameInputValue;
      profileSubtitle.textContent = jobInputValue;
    }

    editBtn.addEventListener('click', editBtnHandler);
    closeBtn.addEventListener('click', closeBtnHandler);
    saveBtn.addEventListener('click', saveBtnHandler);

    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
    formElement.addEventListener('submit', formSubmitHandler);
