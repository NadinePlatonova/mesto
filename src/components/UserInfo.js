export default class UserInfo {
    constructor(nameSelector, roleSelector, avatarSelector, avatarButton, clickOnButton) {
        this._userName = document.querySelector(nameSelector);
        this._userRole = document.querySelector(roleSelector);
        this._avatarPic = document.querySelector(avatarSelector);
        this._avatarButton = document.querySelector(avatarButton);
        this._clickOnButton = clickOnButton;
    }
// не забыть добавить аватар
    getUserInfo() {
        const getInfo = {}
        getInfo.name = this._userName.textContent
        getInfo.role = this._userRole.textContent
        return getInfo
    }

    setUserInfo(data) {
        this._userName.textContent = data.name
        this._userRole.textContent = data.role
        this._avatarPic.src = data.avatar
    }

    setEventListeners() {
        this._avatarPic.onmouseover = () => this._showButton(this._avatarButton);
        this._avatarButton.onmouseleave = () => this._hideButton(this._avatarButton);
        this._avatarButton.onclick = () => this._clickOnButton;
    }

    _showButton(avatarButton) {
        avatarButton.classList.add('profile__edit-avatar_active');
    }

    _hideButton(avatarButton) {
        avatarButton.classList.remove('profile__edit-avatar_active');
    }
}