import { combineReducers } from 'redux'
import { injectReducer } from 'reduxes/reducers'
import { reducerFactory1, reducerFactory2 } from 'utils/utils'
import {
  REGISTER_CHECKBASEINFO,
  REGISTER_CHECKSYSTEMINFO,
  REGISTER_SAVEREGISTERINFO,
  REGISTER_UPLOAD,
  REGISTER_GETMESSAGECODE,
  REGISTER_GETPROVINCE,
  REGISTER_GETCITY,
  REGISTER_GETDISTRICT,
  GETONESTEP,
  GETTWOSTEP,
  REGISTER_GFILEURL,
  SENDSMSCODE,
  BIGREGISTER_GETVERIFICATION,
  GETBIGREGISTERCOMPANYINFO
} from './constants'

const handleCheckBaseInfo = reducerFactory1(REGISTER_CHECKBASEINFO, {}) // 校验基本信息
const handleCheckSystemInfo = reducerFactory1(REGISTER_CHECKSYSTEMINFO, {}) // 校验系统管理员信息
const handleCheckSaveInfo = reducerFactory1(REGISTER_SAVEREGISTERINFO, {}) // 保存注册信息
const handleUploadFile = reducerFactory1(REGISTER_UPLOAD, {}) // 文件上传
const handleMessageCode = reducerFactory1(REGISTER_GETMESSAGECODE, {}) // 保存注册信息
const handleGetProvince = reducerFactory1(REGISTER_GETPROVINCE, {}) // 获得省
const handleGetCity = reducerFactory1(REGISTER_GETCITY, {}) // 获得市
const handleGetDistrict = reducerFactory1(REGISTER_GETDISTRICT, {}) // 获得区
const getFileUrl = reducerFactory2(REGISTER_GFILEURL, {}) // 获得文件地址
const sendSmsCode = reducerFactory1(SENDSMSCODE, {}) // 短信
const imgVerificationCode = reducerFactory1(BIGREGISTER_GETVERIFICATION, {}) // 图形验证码
const bigRegisterCompanyInfo = reducerFactory1(GETBIGREGISTERCOMPANYINFO, {})

const getOneStep = (state = {}, action) => {
  switch (action.type) {
    case GETONESTEP:
      return {
        ...state,
        oneStepParam: action.oneStepParam,
      }
    case GETTWOSTEP:
      return {
        ...state,
        oneStepParam: action.twoStepParam,
      }

    default:
      return state
  }
}
injectReducer(combineReducers({
  baseInfo: handleCheckBaseInfo,
  getOneStep,
  getFileUrl,
  systemInfo: handleCheckSystemInfo,
  saveInfo: handleCheckSaveInfo,
  upload: handleUploadFile,
  messageCode: handleMessageCode,
  provinces: handleGetProvince,
  citys: handleGetCity,
  district: handleGetDistrict,
  sendSmsCode,
  imgVerificationCode,
  bigRegisterCompanyInfo
}), 'registerState')