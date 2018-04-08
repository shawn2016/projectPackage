import { GETSAMLLREGISTERINFO } from './constants'
/**
 * 获取企业注册信息
 */
export const getSmallRegisterInfo = (params) => ({
  callApi: {
    type: GETSAMLLREGISTERINFO,
    path: '/regProgress/getRegInfo',
    method: 'POST',
    param: params
  }
})