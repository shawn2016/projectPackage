import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETROLEMMENU, GETBIZRULEINFO } from './constants'

const getRoleMenuList = (state = { body: { menuList: [], ruleList: [] } }, action) => {
  switch (action.type) {
    case GETROLEMMENU:
      return action.data ? action.data : state
    default:
      return state
  }
}
const getBizRuleInfo = (state = { body: { menuList: [], ruleList: [] } }, action) => {
  switch (action.type) {
    case GETBIZRULEINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}

const roleAndMenu = combineReducers({ getRoleMenuList, getBizRuleInfo })
injectReducer(roleAndMenu, 'roleMenuQuery')