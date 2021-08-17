export default class UserInfo {
    constructor({nameSelector, roleSelector}) {
        this._userName = document.querySelector(nameSelector);
        this._userRole = document.querySelector(roleSelector);
    }

    getUserInfo() {
        const getInfo = {}
        getInfo.name = this._userName.textContent
        getInfo.role = this._userRole.textContent
        return getInfo
    }

    setUserInfo(name, role) {
        this._userName.textContent = name
        this._userRole.textContent = role
    }
}