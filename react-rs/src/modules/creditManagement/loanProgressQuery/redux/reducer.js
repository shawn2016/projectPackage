import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETLOANPROGRESSLIST, LOANPROGRESSSEARCH, CLEARLOANPROGRESSSEARCH } from './constants'

/**
 * 获取贷款进度数据列表
 */
const loanProgressData = (state = {
  body: {
    pagenation: {},
    values: []
  }
}, action) => {
  switch (action.type) {
    case GETLOANPROGRESSLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
/* 修改查询参数 */
const loanProgressSearch = (state = {}, action) => {
  switch (action.type) {
    case LOANPROGRESSSEARCH:
      return Object.assign({}, state, action.value)
    case CLEARLOANPROGRESSSEARCH:
      return {}
    default:
      return state
  }
}


const reducerList = combineReducers({ loanProgressData, loanProgressSearch })
injectReducer(reducerList, 'loanProgressQuery')