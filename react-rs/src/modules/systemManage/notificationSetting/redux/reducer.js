/*  */
import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { SENG_GETNOTIFICATIONLIST, SENG_UPDATESEARCHINFO, SENG_TYPEID, SENG_GETLIST } from './constants'
/**
 * 获取简单通知信息
 */
const SENG_noticeOfSimpleInfo = (state = {}, action) => {
  switch (action.type) {
    case SENG_GETNOTIFICATIONLIST:
      console.log('11state', state, '11action', action)
      return action.data ? action.data : state
    default:
      return state
  }
}
/**
 * 获取各种通知列表
 */
const SENG_queryList = (state = {}, action) => {
  switch (action.type) {
    case SENG_GETLIST:
      console.log('state', state, 'action', action)
      return action.data ? action.data : state
    default:
      return state
  }
}
/*
* 查询参数
*/
const SENG_queryInfo = (state = {}, action) => {
  switch (action.type) {
    case SENG_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
/**
 * 当前tab标签序号
 */
const SENG_getTypeId = (state = '', action) => {
  switch (action.type) {
    case SENG_TYPEID:
      return action.value
    default:
      return state
  }
}

const reducerList = combineReducers({ SENG_noticeOfSimpleInfo, SENG_queryInfo, SENG_getTypeId, SENG_queryList })
injectReducer(reducerList, 'SENG_notificationListDataQuery')