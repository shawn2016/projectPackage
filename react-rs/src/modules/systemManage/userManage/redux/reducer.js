import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import {
  SMUS_GETUSERLIST,
  SMUS_UPDATESEARCHINFO,
  SMUS_DELUSER,
  SMUS_RESETPWD,
  SMUS_UNLOCKUSER,
  SMUS_LOCKUSER,
  SMUS_APPROVEINFO
} from './constants'

const SMUS_userListData = (state = [], action) => {
  switch (action.type) {
    case SMUS_GETUSERLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
const SMUS_queryInfo = (state = {}, action) => {
  switch (action.type) {
    case SMUS_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
const SMUS_delUser = (state = {}, action) => {
  switch (action.type) {
    case SMUS_DELUSER:
      return action.data ? action.data : state
    default:
      return state
  }
}
const SMUS_resetPwd = (state = {}, action) => {
  switch (action.type) {
    case SMUS_RESETPWD:
      return action.data ? action.data : state
    default:
      return state
  }
}
const SMUS_lockUser = (state = {}, action) => {
  switch (action.type) {
    case SMUS_LOCKUSER:
      return action.data ? action.data : state
    default:
      return state
  }
}
const SMUS_unLockUser = (state = {}, action) => {
  switch (action.type) {
    case SMUS_UNLOCKUSER:
      return action.data ? action.data : state
    default:
      return state
  }
}
const SMUS_approveInfo = (state = {}, action) => {
  switch (action.type) {
    case SMUS_APPROVEINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
const SMUS_isReserCurrentPage = (state = 0, action) => {
  switch (action.type) {
    case 'RESETCURRENTPAGE':
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
const reducerList = combineReducers({ SMUS_userListData, SMUS_queryInfo, SMUS_delUser, SMUS_resetPwd, SMUS_lockUser, SMUS_unLockUser, SMUS_approveInfo, SMUS_isReserCurrentPage })
injectReducer(reducerList, 'SMUS_userListDataQuery')