import { combineReducers } from 'redux'
import { injectReducer } from 'reduxes/reducers'
import { reducerFactory1 } from 'utils/utils'
import {
  ACTIVATEUSER_GETMESSAGECODE,
  ACTIVATEUSER_GETSTATE,
  ACTIVATEUSER_GETUSERINFO,
  ACTIVATEUSER_SAVEACTIVATEINFO,
  ACTIVATEUSER_GETVERIFICATION,
  ACTIVATEUSER_GETCOMPANYLIST
} from './constants'

const handleMessageCode = reducerFactory1(ACTIVATEUSER_GETMESSAGECODE, {}) // 发送短信信息
const getUserState = reducerFactory1(ACTIVATEUSER_GETSTATE, {}) // 获取用户状态
const getUserInfo = reducerFactory1(ACTIVATEUSER_GETUSERINFO, {}) // 获取用户信息
const handleGetVericationCode = reducerFactory1(ACTIVATEUSER_GETVERIFICATION, {}) // 获取验证码
const saveActivateInfo = reducerFactory1(ACTIVATEUSER_SAVEACTIVATEINFO, {}) // 保存激活信息
const handleGetCompanyList = reducerFactory1(ACTIVATEUSER_GETCOMPANYLIST, {}) // 所注册的企业列表
// const handleGetCompanyList = (state = {}, action) => {
//   switch (action.type) {
//     case ACTIVATEUSER_GETCOMPANYLIST:
//       return Object.assign({}, state, action.data)
//     default:
//       return state
//   }
// }
injectReducer(combineReducers({
  userState: getUserState,
  userInfo: getUserInfo,
  verificationCode: handleGetVericationCode,
  activateInfo: saveActivateInfo,
  messageCode: handleMessageCode,
  companyList: handleGetCompanyList
}), 'activateUserState')