export class SessionStorage {
  constructor() {
    this.session = sessionStorage
  }
  setItem(key, value) {
    let _value = value
    _value = JSON.stringify(value)
    this.session.setItem(key, _value)
  }
  getItem = (key) => JSON.parse(this.session.getItem(key))
  removeItem = (key) => this.session.removeItem(key)
}

export default SessionStorage