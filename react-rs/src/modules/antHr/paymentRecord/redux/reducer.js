import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { AHPR_GETTQLIST, AHPR_UPDATESEARCHINFO, AHPR_CLEARSEARCHINFO, AHPR_RESETCURRENTPAGE, AHPR_EXPORTRECORD } from './constants'

const AHPR_tradeDataList1 = (state = { body: { values: [], pagenation: {} } }, action) => {
  switch (action.type) {
    case AHPR_GETTQLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
const AHPR_exportRecord = (state = {}, action) => {
  switch (action.type) {
    case AHPR_EXPORTRECORD:
      return action.data ? action.data : state
    default:
      return state
  }
}
const AHPR_upDateSearchInfo = (state = { page: 1, rows: 10, accountNo: '', payType: '' }, action) => {
  console.log(action)
  switch (action.type) {
    case AHPR_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    case AHPR_CLEARSEARCHINFO:
      return { page: 1, rows: 10 }
    default:
      return state
  }
}
const AHPR_isReserCurrentPage1 = (state = 0, action) => {
  switch (action.type) {
    case AHPR_RESETCURRENTPAGE:
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
const searchChargeQuery = combineReducers({ AHPR_tradeDataList1, AHPR_upDateSearchInfo, AHPR_isReserCurrentPage1, AHPR_exportRecord })
injectReducer(searchChargeQuery, 'AHPR_tradeQueryData')