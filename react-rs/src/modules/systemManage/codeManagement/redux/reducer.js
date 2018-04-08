import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { SMCM_GETLIST, SMCM_DELUSER, SMCM_UNLOCKUSER, SMCM_LOCKUSER } from './constants'

const SMCM_zhenList = (state = { body: { accounts: [] } }, action) => {
  switch (action.type) {
    case SMCM_GETLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
const SMCM_delUser = (state = {}, action) => {
  switch (action.type) {
    case SMCM_DELUSER:
      return action.data ? action.data : state
    default:
      return state
  }
}
const SMCM_lockUser = (state = {}, action) => {
  switch (action.type) {
    case SMCM_LOCKUSER:
      return action.data ? action.data : state
    default:
      return state
  }
}
const SMCM_unLockUser = (state = {}, action) => {
  switch (action.type) {
    case SMCM_UNLOCKUSER:
      return action.data ? action.data : state
    default:
      return state
  }
}
const singleHandle = combineReducers({ SMCM_zhenList, SMCM_delUser, SMCM_lockUser, SMCM_unLockUser })
injectReducer(singleHandle, 'SMCM_userListDataQuery')