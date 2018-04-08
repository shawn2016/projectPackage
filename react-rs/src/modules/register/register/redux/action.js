import { actionFactory, actionFactory2 } from 'utils/utils'
import {
  REGISTER_CHECKBASEINFO,
  REGISTER_CHECKSYSTEMINFO,
  REGISTER_SAVEREGISTERINFO,
  REGISTER_GETMESSAGECODE,
  GETONESTEP,
  GETTWOSTEP,
  REGISTER_GETPROVINCE,
  REGISTER_GFILEURL,
  SENDSMSCODE,
  BIGREGISTER_GETVERIFICATION,
  GETBIGREGISTERCOMPANYINFO
} from './constants'

export const handleCheckBaseInfo = actionFactory(REGISTER_CHECKBASEINFO, 'POST', '/register/validateBasicInfo') // 校验基本信息
export const handleCheckSystemInfo = actionFactory(REGISTER_CHECKSYSTEMINFO, 'POST', '/register/validateAdminInfo') // 校验系统管理员信息
export const handleCheckSaveInfo = actionFactory(REGISTER_SAVEREGISTERINFO, 'POST', '/register/saveInfo') // 保存注册信息
export const getImgVerficationCode = actionFactory(BIGREGISTER_GETVERIFICATION, 'POST', '/generic/getRandomCode', true) // 获取验证码
export const handleMessageCode = actionFactory(REGISTER_GETMESSAGECODE, 'POST', '/register/validateBasicInfo') // 获取短信验证码
export const getProvince = actionFactory(REGISTER_GETPROVINCE, 'POST', '/generic/getRegionList') // 省
export const getFileUrl = actionFactory2(REGISTER_GFILEURL, 'POST', '/generic/getUploadFile/url', true) // 文件
export const sendSmsCode = actionFactory(SENDSMSCODE, 'POST', '/generic/sendSmsByImgCode') // duanxin
export const getBigCompanyInfo = actionFactory2(GETBIGREGISTERCOMPANYINFO, 'POST', '/regProgress/getRegInfo') // 获取企业注册信息
export const getOneStep = (oneStepParam) => ({
  type: GETONESTEP,
  oneStepParam
})
export const getTwoStep = (twoStepParam) => ({
  type: GETTWOSTEP,
  twoStepParam
})