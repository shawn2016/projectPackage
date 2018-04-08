import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETREPAYMENTLIST, REPAYMENTSEARCH, CLEARREPAYMENTSEARCH } from './constants'
/* 获取还款查询数据列表 */
const repaymentData = (state = {}, action) => {
  switch (action.type) {
    case GETREPAYMENTLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
/* 修改查询参数 */
const repaymentSearch = (state = {}, action) => {
  switch (action.type) {
    case REPAYMENTSEARCH:
      return Object.assign({}, state, action.value)
    case CLEARREPAYMENTSEARCH:
      return {}
    default:
      return state
  }
}

const reducerList = combineReducers({ repaymentData, repaymentSearch })
injectReducer(reducerList, 'repaymentData')