const editBtn = document.getElementsByClassName('profile__btn-edit')[0];
    const closeBtn = document.getElementsByClassName('form__close-icon')[0];
    const saveBtn = document.getElementsByClassName('form__btn')[0];
    const form = document.getElementsByClassName('form')[0];

    editBtn.addEventListener('click', editBtnHandler);
    closeBtn.addEventListener('click', closeBtnHandler);
    saveBtn.addEventListener('click', saveBtnHandler);

    function editBtnHandler() {
      form.classList.add('form_opened');
    }

    function closeBtnHandler() {
      form.classList.remove('form_opened');
    }

    function saveBtnHandler() {
      form.classList.remove('form_opened');
    }

    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    let nameInput = document.querySelector('input.form__input-name');
    let jobInput = document.querySelector('input.form__input-info');

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;

    // Находим форму в DOM
    let formElement = document.querySelector('form');

    // Обработчик «отправки» формы, хотя пока
    // она никуда отправляться не будет
    function formSubmitHandler (evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                            // Так мы можем определить свою логику отправки.
                            // О том, как это делать, расскажем позже.

      // Находим поля формы в DOM
      let nameInput = document.querySelector('input.form__input-name'); // Воспользуйтесь инструментом .querySelector()
      let jobInput = document.querySelector('input.form__input-info');// Воспользуйтесь инструментом .querySelector()

      // Получите значение полей из свойства value
      const nameInputValue = nameInput.value;
      const jobInputValue = jobInput.value;

      // Выберите элементы, куда должны быть вставлены значения полей
      const profileTitle = document.querySelector('.profile__title');
      const profileSubtitle = document.querySelector('.profile__subtitle');

      // Вставьте новые значения с помощью textContent
      profileTitle.textContent = nameInputValue;
      profileSubtitle.textContent = jobInputValue;
    }

    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
    formElement.addEventListener('submit', formSubmitHandler);
