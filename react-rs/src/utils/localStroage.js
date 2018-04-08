export class LocalStroage {
  constructor() {
    this.local = localStorage
  }
  setItem(key, value) {
    let _value = value
    _value = JSON.stringify(value)
    // if (typeof value === 'object') {
    //   _value = JSON.stringify(value)
    // }
    this.local.setItem(key, _value)
  }
  getItem = (key) => JSON.parse(this.local.getItem(key))
}

export default LocalStroage