export default class UserInfo {
    constructor(nameSelector, roleSelector, avatarSelector) {
        this._userName = document.querySelector(nameSelector);
        this._userRole = document.querySelector(roleSelector);
        this._avatarPic = document.querySelector(avatarSelector);
    }
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
        this._userId = data._id
    }
}