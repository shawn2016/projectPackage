import {
  SETTOKEN,
  CLEARTOEKN
} from 'reduxes/constants'
export const setToken = (state = {}, action = {}) => {
  if (action.type === SETTOKEN) {
    let _token = { ...action }
    delete _token.token
    return Object.assign(state, _token)
  }
  return state
}
export const clearToken = (state = {}, action = {}) => {
  if (action.type === CLEARTOEKN) {
    return {}
  }
  return state
}