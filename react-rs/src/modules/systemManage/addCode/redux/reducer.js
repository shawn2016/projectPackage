import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETDATA, ADDUSER, GETUSERCODE, GETUSERINFO } from './constants'

const userData = (state = { body: [] }, action) => {
  switch (action.type) {
    case GETDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
const getUserInfo = (state = {}, action) => {
  switch (action.type) {
    case ADDUSER:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
const getUserCode = (state = {}, action) => {
  switch (action.type) {
    case GETUSERCODE:
      return action.data ? action.data : state
    default:
      return state
  }
}
const getUserInfo2 = (state = {}, action) => {
  switch (action.type) {
    case GETUSERINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
const reducerList = combineReducers({ userData, getUserInfo, getUserCode, getUserInfo2 })
injectReducer(reducerList, 'userDataQuery')