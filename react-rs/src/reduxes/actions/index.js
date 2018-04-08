import store from '../store'
import * as api from './api'
import * as token from './token'
const callBack = () => ({ name: '宋亚奇' })
const _actions = {
  callBack,
  api,
  token
}

let enhanceActions = {}
const mapActions = (actions) => {
  Object.keys(actions).forEach((namespace) => {
    if (enhanceActions[namespace]) {
      console.log(`namespace of actions ${namespace} namespace already exist`)
      return true
      // let error = new Error(`namespace of actions ${namespace} namespace already exist`)
      // throw error
    }
    let realActions = actions[namespace],
      actionsKeys = Object.keys(realActions),
      actionsLength = actionsKeys.length,
      enhanceAction = {}

    if (!actionsLength) {
      return
    }
    actionsKeys.forEach(actionKey => {
      enhanceAction[actionKey] = (...args) => {
        const action = realActions[actionKey](...args)
        return store.dispatch(action)
      }
    })
    enhanceActions[namespace] = enhanceAction
  })
}

mapActions(_actions)

export {
  mapActions as injectActions
}
console.log(enhanceActions)
export default enhanceActions
