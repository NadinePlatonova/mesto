import { nameInput, jobInput } from '../utils/constants.js'

export default class UserInfo {
    constructor(name, role) {
        this._UserName = name;
        this._UserRole = role;
    }

    getUserInfo() {
        nameInput.value = this._UserName.textContent
        jobInput.value = this._UserRole.textContent
    }

    setUserInfo() {
        this._UserName.textContent = nameInput.value
        this._UserRole.textContent = jobInput.value
    }
}