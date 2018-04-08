import { SMCM_GETLIST, SMCM_DELUSER, SMCM_UNLOCKUSER, SMCM_LOCKUSER } from './constants'
export const SMCM_getList = () => ({
  callApi: {
    type: SMCM_GETLIST,
    path: '/qrcode/getList',
    method: 'POST',
  }
})
/*export const delUser = (params) => ({
  callApi: {
    type: DELUSER,
    path: '/user/delInfo',
    method: 'POST',
    param: params
  }
})*/
export const SMCM_delUser = (params) => ({
  callApi: {
    type: SMCM_DELUSER,
    path: '/qrcode/delInfo',
    method: 'POST',
    param: params
  }
})
export const SMCM_lockUser = (params) => ({
  callApi: {
    type: SMCM_LOCKUSER,
    path: '/qrcode/lock',
    method: 'POST',
    param: params
  }
})
export const SMCM_unLockUser = (params) => ({
  callApi: {
    type: SMCM_UNLOCKUSER,
    path: '/qrcode/unLock',
    method: 'POST',
    param: params
  }
})