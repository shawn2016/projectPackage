import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { DESL_GETDATA, DESL_GETACCOUNTDATA } from './constants'

const DESL_loanProgressData = (state = {}, action) => {
  switch (action.type) {
    case DESL_GETDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
const DESL_accountData = (state = {}, action) => {
  switch (action.type) {
    case DESL_GETACCOUNTDATA:
      console.log(action)
      return action.data ? action.data : state
    default:
      return state
  }
}
const DESL_isReserCurrentPage = (state = 0, action) => {
  switch (action.type) {
    case 'RESETCURRENTPAGE':
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
const reducerList = combineReducers({ DESL_loanProgressData, DESL_accountData, DESL_isReserCurrentPage })
injectReducer(reducerList, 'DESL_loanProgressQuery')