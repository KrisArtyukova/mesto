import { api } from './Api';
export default class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector, profileAvatarSelector }, popupWithFormProfile) {
    this._userInfo = undefined;
    this._profileAvatarElement = document.querySelector(profileAvatarSelector);
    this._popupWithFormProfile = popupWithFormProfile;
    this._popupForm = this._popupWithFormProfile._popupElement;
    this._popupBtn = this._popupForm.querySelector('.popup__button');
    this._popupBtnTextContent = this._popupBtn.textContent;

    api.getUserInfo()
    .then((userInfo) => {
      this._userInfo = userInfo;
      if (userInfo) {
        this._userInfo = userInfo;
        this._profileTitle.textContent = userInfo.name;
        this._profileSubtitle.textContent = userInfo.about;
        this._profileAvatarElement.style.backgroundImage=`url(${userInfo.avatar})`;
      }
    });


    this._profileTitle = document.querySelector(profileTitleSelector);
    this._profileSubtitle = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    return {
      profileTitleContent: this._userInfo.name,
      profileSubtitleContent: this._userInfo.about,
      userInfo: this._userInfo,
    }
  }

  setUserInfo({ profileTitleContent, profileSubtitleContent }) {
    this._popupBtn.textContent = `${this._popupBtnTextContent} ...`
    api.editUserInfo(profileTitleContent, profileSubtitleContent)
    .then((userInfo) => {
      if (userInfo) {
        this._userInfo = userInfo;
        this._profileTitle.textContent = userInfo.name;
        this._profileSubtitle.textContent = userInfo.about;
        this._popupWithFormProfile.close();
      }
    })
    .finally(() => {
      this._popupBtn.textContent = this._popupBtnTextContent;
    });
  }

}
