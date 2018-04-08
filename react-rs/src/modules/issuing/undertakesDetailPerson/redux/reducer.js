import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GSSHD_ORDERINFO, GSSHD_ORDERFLOWINFO, GSSHD_EXAMINERESULT } from './constants'
const GSSHD_orderInfo = (state = {}, action) => {
  switch (action.type) {
    case GSSHD_ORDERINFO:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const GSSHD_orderflowInfo = (state = [], action) => {
  switch (action.type) {
    case GSSHD_ORDERFLOWINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
const GSSHD_examineResult = (state = {}, action) => {
  switch (action.type) {
    case GSSHD_EXAMINERESULT:
      return action.data ? action.data : state
    default:
      return state
  }
}
const singleHandleDetails = combineReducers({ GSSHD_orderInfo, GSSHD_orderflowInfo, GSSHD_examineResult })
injectReducer(singleHandleDetails, 'GSSHD_singleHandleDetails')