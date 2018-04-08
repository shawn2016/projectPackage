import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETSAMLLREGISTERINFO } from './constants'
/**
 * 获取企业注册信息
 */
const smallRegisterInfo = (state = {}, action) => {
  switch (action.type) {
    case GETSAMLLREGISTERINFO:
      console.log('11state', state, '11action', action)
      return action.data ? action.data : state
    default:
      return state
  }
}
const smallCompanyRegisterInfo = combineReducers({ smallRegisterInfo })
injectReducer(smallCompanyRegisterInfo, 'smallRegisterInfo')