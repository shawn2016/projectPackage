import { combineReducers } from 'redux'
import { injectReducer } from 'reduxes/reducers'
import { reducerFactory1 } from 'utils/utils'
import {
  REGISTERPROGRESS_GETIMGVERIFICATION,
  REGISTERPROGRESS_GETMESSAGECODE,
  REGISTERPROGRESS_GETSESSIONID
} from './constants'
const imgVerificationCode = reducerFactory1(REGISTERPROGRESS_GETIMGVERIFICATION, {}) //获取图片验证码
const smsVerificationCode = reducerFactory1(REGISTERPROGRESS_GETMESSAGECODE, {}) // 获取短信验证码
const registerProgressSessionId = reducerFactory1(REGISTERPROGRESS_GETSESSIONID, {}) // 验证身份信息 获取sessionid
injectReducer(combineReducers({
  imgVerificationCode,
  smsVerificationCode,
  registerProgressSessionId
}), 'registerProgressSrearch')

