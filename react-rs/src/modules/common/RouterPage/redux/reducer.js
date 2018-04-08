import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { COMMON_GETMENULIST, COMMON_GETOPERRULE, LOGOUT, GETOPERRULEINFO } from './constants'

/**
 * 获取菜单列表
 */
const menuList = (state = {
  body: {
    menu: []
  }
}, action) => {
  switch (action.type) {
    case COMMON_GETMENULIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
/**
 * 获取权限
 */
const operRule = (state = {}, action) => {
  switch (action.type) {
    case COMMON_GETOPERRULE:
      return action.data ? action.data : state
    default:
      return state
  }
}
const logout = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      return action.data ? action.data : state
    default:
      return state
  }
}
const getOperRuleInfo = (state = {}, action) => {
  switch (action.type) {
    case GETOPERRULEINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}

const reducerList = combineReducers({ menuList, operRule, logout, getOperRuleInfo })
injectReducer(reducerList, 'common')