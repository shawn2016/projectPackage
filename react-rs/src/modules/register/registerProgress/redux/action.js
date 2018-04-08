import { actionFactory2 } from 'utils/utils'
import {
  REGISTERPROGRESS_GETIMGVERIFICATION,
  REGISTERPROGRESS_GETMESSAGECODE,
  REGISTERPROGRESS_GETSESSIONID
} from './constants'
const getImgVerficationCode = actionFactory2(REGISTERPROGRESS_GETIMGVERIFICATION, 'POST', '/generic/getRandomCode', true) // 获取验证码
const getVerificationCode = actionFactory2(REGISTERPROGRESS_GETMESSAGECODE, 'POST', '/generic/sendSmsByImgCode') // 获取短息验证码
const handleCheckSessionIdInfo = actionFactory2(REGISTERPROGRESS_GETSESSIONID, 'POST', '/regProgress/validateIndentity') //验证身份 获取sessionid

export {
  getImgVerficationCode,
  getVerificationCode,
  handleCheckSessionIdInfo
}