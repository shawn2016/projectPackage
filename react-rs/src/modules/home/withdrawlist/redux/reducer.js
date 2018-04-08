import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { WDWL_GETDATA, WDWL_GETACCOUNTDATA } from './constants'

const WDWL_loanProgressData = (state = {}, action) => {
  switch (action.type) {
    case WDWL_GETDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
const WDWL_accountData = (state = {}, action) => {
  switch (action.type) {
    case WDWL_GETACCOUNTDATA:
      console.log(action)
      return action.data ? action.data : state
    default:
      return state
  }
}
const WDWL_isReserCurrentPage = (state = 0, action) => {
  switch (action.type) {
    case 'RESETCURRENTPAGE':
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
const reducerList = combineReducers({ WDWL_loanProgressData, WDWL_accountData, WDWL_isReserCurrentPage })
injectReducer(reducerList, 'WDWL_loanProgressQuery')