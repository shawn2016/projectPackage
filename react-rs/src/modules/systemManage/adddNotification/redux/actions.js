import { SENA_GETNOTIFICATION, SENA_UPDATESEARCHINFO, SENA_GETINFO, SENA_GETACCOUNTDATA } from './constants'
/**
 * 获取账户列表
 */
export const SENA_getAccountData = () => ({
  callApi: {
    type: SENA_GETACCOUNTDATA,
    path: '/account/balance/getList',
    method: 'POST'
  }
})

export const SENA_updateSearchInfo = item => ({
  type: SENA_UPDATESEARCHINFO,
  value: item
})
export const SENA_getData = (params) => ({
  callApi: {
    type: SENA_GETNOTIFICATION,
    path: '/notice/getUserList',
    method: 'POST',
    param: params
  }
})
export const SENA_getInfo = (params) => ({
  callApi: {
    type: SENA_GETINFO,
    path: '/notice/getInfo',
    method: 'POST',
    param: params
  }
})

