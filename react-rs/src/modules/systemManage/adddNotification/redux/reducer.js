import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { SENA_GETNOTIFICATION, SENA_UPDATESEARCHINFO, SENA_GETINFO, SENA_GETACCOUNTDATA } from './constants'

const SENA_notificationData = (state = [], action) => {
  switch (action.type) {
    case SENA_GETNOTIFICATION:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const SENA_queryInfo = (state = {}, action) => {
  switch (action.type) {
    case SENA_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
const SENA_getInfo = (state = [], action) => {
  switch (action.type) {
    case SENA_GETINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
/**
 * 账户信息
 */
const SENA_accountData = (state = {}, action) => {
  switch (action.type) {
    case SENA_GETACCOUNTDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
const reducerList = combineReducers({ SENA_notificationData, SENA_queryInfo, SENA_getInfo, SENA_accountData })
injectReducer(reducerList, 'SENA_notificationDataQuery')