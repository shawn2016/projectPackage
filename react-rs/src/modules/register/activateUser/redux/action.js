import { actionFactory } from 'utils/utils'
import {
  ACTIVATEUSER_GETMESSAGECODE,
  ACTIVATEUSER_GETSTATE,
  ACTIVATEUSER_GETUSERINFO,
  ACTIVATEUSER_GETVERIFICATION,
  ACTIVATEUSER_SAVEACTIVATEINFO,
  ACTIVATEUSER_GETCOMPANYLIST
} from './constants'

export const handleMessageCode = actionFactory(ACTIVATEUSER_GETMESSAGECODE, 'POST', '/activate/getSmsCode') // 获取短信验证码
export const getUserState = actionFactory(ACTIVATEUSER_GETSTATE, 'POST', '/login/getActivateSts') // 获取用户激活状态
export const getUserInfo = actionFactory(ACTIVATEUSER_GETUSERINFO, 'POST', '/activate/validateInfo') // 获取用户激活状态
export const handleGetVerificationCode = actionFactory(ACTIVATEUSER_GETVERIFICATION, 'POST', '/generic/getRandomCode', true) // 获取验证码
export const saveActivateInfo = actionFactory(ACTIVATEUSER_SAVEACTIVATEINFO, 'POST', '/activate/updateUserInfo') // 保存激活信息
export const getCompanyList = actionFactory(ACTIVATEUSER_GETCOMPANYLIST, 'POST', '/activate/getCompanyInfo') // 获取企业列表
// export const getCompanyList = (param) => ({
//   callApi: {
//     type: ACTIVATEUSER_GETCOMPANYLIST,
//     path: '/modules/register/activateUser/mock/mock.json',
//     method: 'GET',
//     param
//   }
// })