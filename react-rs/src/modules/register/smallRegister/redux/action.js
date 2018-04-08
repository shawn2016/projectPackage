import { actionFactory } from 'utils/utils'
import {
    SMALLREGISTER_GETVERIFICATION,
    SMALLREGISTER_CHECKBASEINFO,
    SMALLREGISTER_GETSMSVERIFICATION,
    SMALLREGISTER_SAVEALLINFO,
    SMALLREGISTER_GETCOMPANYINFO
} from './constants'
export const getImgVerficationCode = actionFactory(SMALLREGISTER_GETVERIFICATION, 'POST', '/generic/getRandomCode', true) // 获取验证码
export const smallRegisterSendSmsCode = actionFactory(SMALLREGISTER_GETSMSVERIFICATION, 'POST', '/generic/sendSmsByImgCode') // 获取短信验证码(含图片验证码)
export const handleCheckBaseInfo = actionFactory(SMALLREGISTER_CHECKBASEINFO, 'POST', '/register/validateBasicInfo') // 校验基本信息
export const handleSaveSmallAllInfo = actionFactory(SMALLREGISTER_SAVEALLINFO, 'POST', '/register/saveInfo') // 保存注册信息
export const getSmallRegisterCompanyInfo = actionFactory(SMALLREGISTER_GETCOMPANYINFO, 'POST', '/regProgress/getRegInfo')