import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { DSCS_GETORDERLIST, DSCS_UPDATESEARCHINFO, DSCS_GETCOMPANYACCLIST } from './constant'

/* 列表*/
const DSCS_orderList = (state = [], action) => {
  switch (action.type) {
    case DSCS_GETORDERLIST:
      return action.data.body ? action.data.body : state
    default:
      return state
  }
}
/* 查询条件*/
const DSCS_queryInfo = (state = {}, action) => {
  switch (action.type) {
    case DSCS_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
/**
 * 以下为查询选项数据（下拉框option）
 */
/* 对公账户列表*/
const DSCS_companyAccList = (state = [], action) => {
  switch (action.type) {
    case DSCS_GETCOMPANYACCLIST:
      return action.data.body ? action.data.body : state
    default:
      return state
  }
}

const searchsingleInfo = combineReducers({ DSCS_orderList, DSCS_queryInfo, DSCS_companyAccList })
injectReducer(searchsingleInfo, 'DSCS_singleHandleSearchInfo')