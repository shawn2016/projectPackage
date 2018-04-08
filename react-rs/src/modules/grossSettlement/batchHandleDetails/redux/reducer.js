import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GSBHD_UPDATESEARCHINFO, GSBHD_GETORDERLIST, GSBHD_EXAMINERESULT, GSBHD_ORDERINFO, GSBHD_ORDERFLOWINFO } from './constants'
const GSBHD_orderInfo = (state = {}, action) => {
  switch (action.type) {
    case GSBHD_ORDERINFO:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const GSBHD_orderflowInfo = (state = [], action) => {
  switch (action.type) {
    case GSBHD_ORDERFLOWINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
const GSBHD_examineResult = (state = {}, action) => {
  switch (action.type) {
    case GSBHD_EXAMINERESULT:
      return action.data ? action.data : state
    default:
      return state
  }
}
const GSBHD_orderList = (state = { values: [], pagenation: { itemCount: 0 } }, action) => {
  switch (action.type) {
    case GSBHD_GETORDERLIST:
      return action.data.body ? action.data.body : state
    default:
      return state
  }
}
const GSBHD_isReserCurrentPage = (state = 0, action) => {
  switch (action.type) {
    case 'GSBHD_RESETCURRENTPAGE':
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
const GSBHD_queryInfo = (state = { page: 1, rows: 10 }, action) => {
  switch (action.type) {
    case GSBHD_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
const singleHandleDetails = combineReducers({ GSBHD_queryInfo, GSBHD_orderList, GSBHD_examineResult, GSBHD_isReserCurrentPage, GSBHD_orderInfo, GSBHD_orderflowInfo })
injectReducer(singleHandleDetails, 'GSBHD_singleHandleDetails')