import { combineReducers } from 'redux'
import { injectReducer } from 'reduxes/reducers'
import { reducerFactory1 } from 'utils/utils'
import {
  LOGIN_GETUSERACTIVESTATUS,
  LOGIN_LOGIN,
  LOGIN_CHECKUKEYPASS,
  LOGIN_GETVERIFICATION,
  LOGIN_GETUSERCODE,
  LOGIN_GETLOGININFO
} from './constants'
const handleGetUserIsAcitveState = (state = {}, aciton = { data: {} }) => {  // 获取用户状态
  if (aciton.type === LOGIN_GETUSERACTIVESTATUS) {
    return aciton.data
  }
  return state
}
// const handleGetUserCodeBySerial = (state = { userCode: { body: [] } }, aciton = { data: {} }) => {  // 获取用户状态
//   if (aciton.type === LOGIN_GETUSERCODE) {
//     return aciton.data
//   }
//   return state
// }
const handleLogin = reducerFactory1(LOGIN_LOGIN, {}) // 登录
const handleCheckUkeyPass = reducerFactory1(LOGIN_CHECKUKEYPASS, {}) // 校验ukey密码
const handleGetVericationCode = reducerFactory1(LOGIN_GETVERIFICATION, {}) // 获取验证码
const handleGetUserCodeBySerial = reducerFactory1(LOGIN_GETUSERCODE, {}) // 根据UKEY序列号, 获取用户名
const handelGetLoginInfo = reducerFactory1(LOGIN_GETLOGININFO, {})
// 合并reducer
let reducers = combineReducers({
  userStatus: handleGetUserIsAcitveState,
  userInfo: handleLogin,
  checkUkey: handleCheckUkeyPass,
  verificationCode: handleGetVericationCode,
  userCode: handleGetUserCodeBySerial,
  loginInfo: handelGetLoginInfo
})
injectReducer(reducers, 'loginState')