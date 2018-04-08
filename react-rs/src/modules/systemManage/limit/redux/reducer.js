import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import {
  SMUS_GETUSERLIST,
  SMUS_UPDATESEARCHINFO,
  SMUS_DELUSER,
  SMUS_APPROVEINFO,
  DESP_GETACCOUNTDATA
} from './constants'

const SMUS_userListData = (state = [], action) => {
  switch (action.type) {
    case SMUS_GETUSERLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
const DESP_accountData = (state = {}, action) => {
  switch (action.type) {
    case DESP_GETACCOUNTDATA:
      console.log(action)
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
const reducerList = combineReducers({ SMUS_userListData, SMUS_queryInfo, SMUS_delUser, SMUS_approveInfo, SMUS_isReserCurrentPage, DESP_accountData })
injectReducer(reducerList, 'SMUS_userListDataQuery')