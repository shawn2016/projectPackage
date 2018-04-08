import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETLOANINTENTIONLIST, LOANINTENTIONSEARCH, CLEARLOANINTENTIONSEARCH } from './constants'
/* 获取贷款意向数据列表 */
const loanIntentionData = (state = {
  body: {
    pagenation: {},
    values: []
  }
}, action) => {
  switch (action.type) {
    case GETLOANINTENTIONLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
/* 修改查询参数 */
const loanIntentionSearch = (state = {}, action) => {
  switch (action.type) {
    case LOANINTENTIONSEARCH:
      return Object.assign({}, state, action.value)
    case CLEARLOANINTENTIONSEARCH:
      return {}
    default:
      return state
  }
}

const reducerList = combineReducers({ loanIntentionData, loanIntentionSearch })
injectReducer(reducerList, 'loanIntentionQuery')