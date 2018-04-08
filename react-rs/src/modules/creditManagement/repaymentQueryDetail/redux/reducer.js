import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETREPAYMENTINFO, GETREPAYMENTDETAILLIST } from './constants'
/* 获取还款详情信息 */
const repaymentDetailInfo = (state = {
  body: {}
}, action) => {
  switch (action.type) {
    case GETREPAYMENTINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
/* 获取还款明细列表信息 */
const repaymentDetailList = (state = {
  body: []
}, action) => {
  switch (action.type) {
    case GETREPAYMENTDETAILLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}

const reducerList = combineReducers({ repaymentDetailInfo, repaymentDetailList })
injectReducer(reducerList, 'repaymentDetailData')