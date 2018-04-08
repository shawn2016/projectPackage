import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { EFEF_GETDATA, EFEF_ORDERINFO, EFEF_GETNUM, EFEF_GETLOANINTENTION1, EFEF_GETLOGININFO } from './constants'
const EFEF_boardData = (state = {}, action) => {
  switch (action.type) {
    case EFEF_GETNUM:
      return action.data && action.data.body ? action.data.body : state
    default:
      return state
  }
}
const EFEF_dayTradingData = (state = {}, action) => {
  switch (action.type) {
    case EFEF_GETDATA:
      return action.data && action.data.body ? action.data.body : state
    default:
      return state
  }
}
const EFEF_LoanIntentionData1 = (state = [], action) => {
  switch (action.type) {
    case EFEF_GETLOANINTENTION1:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const EFEF_orderInfo = (state = {}, action) => {
  switch (action.type) {
    case EFEF_ORDERINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
const EFEF_LoginInfoData = (state = [], action) => {
  switch (action.type) {
    case EFEF_GETLOGININFO:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const homeList = combineReducers({ EFEF_dayTradingData, EFEF_orderInfo, EFEF_boardData, EFEF_LoanIntentionData1, EFEF_LoginInfoData })
injectReducer(homeList, 'listQuery')