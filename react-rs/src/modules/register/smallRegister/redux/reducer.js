import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { reducerFactory1 } from 'utils/utils'
import { SMALLREGISTER_GETVERIFICATION,
  SMALLREGISTER_CHECKBASEINFO,
  SMALLREGISTER_GETSMSVERIFICATION,
  SMALLREGISTER_SAVEALLINFO,
  SMALLREGISTER_GETCOMPANYINFO
} from './constants'
/**
 * 获取图形验证码
 */
const imgVerificationCode = (state = {}, action) => {
  switch (action.type) {
    case SMALLREGISTER_GETVERIFICATION:
      return action.data ? action.data : state
    default:
      return state
  }
}
/**
 * 获取短信验证码
 */
const smsVerificationCode = (state = {}, action) => {
  switch (action.type) {
    case SMALLREGISTER_GETSMSVERIFICATION:
      return action.data ? action.data : state
    default:
      return state
  }
}
/**
 * 保存注册企业信息
 */
const registerSmallSaveInfo = (state = {}, action) => {
  switch (action.type) {
    case SMALLREGISTER_SAVEALLINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
/**
 * 获取企业信息
 */
const smallRegisterCompanyInfo = (state = {}, action) => {
  switch (action.type) {
    case SMALLREGISTER_GETCOMPANYINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
// 校验基本信息
const handleCheckBaseInfo = reducerFactory1(SMALLREGISTER_CHECKBASEINFO, {})
const smallRegisterReducer = combineReducers({
  imgVerificationCode,
  handleCheckBaseInfo,
  smsVerificationCode,
  registerSmallSaveInfo,
  smallRegisterCompanyInfo
})
injectReducer(smallRegisterReducer, 'smallRegisterReducer')