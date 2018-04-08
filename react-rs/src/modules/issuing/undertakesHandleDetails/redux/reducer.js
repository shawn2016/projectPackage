import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { IUTHD_UPDATESEARCHINFO, IUTHD_GETORDERLIST, IUTHD_ORDERINFO, IUTHD_ORDERFLOWINFO } from './constants'
const IUTHD_orderInfo = (state = {}, action) => {
  switch (action.type) {
    case IUTHD_ORDERINFO:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const IUTHD_orderflowInfo = (state = [], action) => {
  switch (action.type) {
    case IUTHD_ORDERFLOWINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
const IUTHD_orderList = (state = { values: [], pagenation: { itemCount: 0 } }, action) => {
  switch (action.type) {
    case IUTHD_GETORDERLIST:
      return action.data.body ? action.data.body : state
    default:
      return state
  }
}
const IUTHD_isReserCurrentPage = (state = 0, action) => {
  switch (action.type) {
    case 'IUTHD_RESETCURRENTPAGE':
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
const IUTHD_queryInfo = (state = { page: 1, rows: 10 }, action) => {
  switch (action.type) {
    case IUTHD_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
const singleHandleDetails = combineReducers({ IUTHD_queryInfo, IUTHD_orderList, IUTHD_isReserCurrentPage, IUTHD_orderInfo, IUTHD_orderflowInfo })
injectReducer(singleHandleDetails, 'IUTHD_singleHandleDetails')