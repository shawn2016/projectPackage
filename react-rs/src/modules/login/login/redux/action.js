import { actionFactory } from 'utils/utils'
import {
  LOGIN_GETUSERACTIVESTATUS,
  LOGIN_LOGIN,
  LOGIN_CHECKUKEYPASS,
  LOGIN_GETVERIFICATION,
  LOGIN_GETUSERCODE,
  LOGIN_GETLOGININFO
} from './constants'

export const handleGetUserIsAcitveState = actionFactory(LOGIN_GETUSERACTIVESTATUS, 'POST', '/login/getActivateSts', true) // 获取用户状态
export const handleLogin = actionFactory(LOGIN_LOGIN, 'POST', '/login', true) // 登陆
export const handleCheckUkeyPass = actionFactory(LOGIN_CHECKUKEYPASS, 'POST', '/login/validateUkeyPwd') // 校验UKEY密码
export const handleGetVerificationCode = actionFactory(LOGIN_GETVERIFICATION, 'POST', '/generic/getRandomCode', true) // 获取验证码
export const handleGetUserBySerial = actionFactory(LOGIN_GETUSERCODE, 'POST', '/login/getUserCode') // 根据序列号获取用户名
export const handleGetLoginInfo = actionFactory(LOGIN_GETLOGININFO, 'POST', '/curruser/getLoginInfo') // 获取用户登录信息