import {
  SMUS_GETUSERLIST,
  SMUS_UPDATESEARCHINFO,
  SMUS_DELUSER,
  SMUS_RESETPWD,
  SMUS_UNLOCKUSER,
  SMUS_LOCKUSER,
  SMUS_APPROVEINFO
} from './constants'
export const SMUS_updateSearchInfo = item => ({
  type: SMUS_UPDATESEARCHINFO,
  value: item
})
export const SMUS_getList = (params) => ({
  callApi: {
    type: SMUS_GETUSERLIST,
    path: '/user/getList',
    method: 'POST',
    param: params
  }
})
export const SMUS_delUser = (params) => ({
  callApi: {
    type: SMUS_DELUSER,
    path: '/user/delInfo',
    method: 'POST',
    param: params
  }
})
export const SMUS_resetPwd = (params) => ({
  callApi: {
    type: SMUS_RESETPWD,
    path: '/user/resetPwd',
    method: 'POST',
    param: params
  }
})
export const SMUS_lockUser = (params) => ({
  callApi: {
    type: SMUS_LOCKUSER,
    path: '/user/lock',
    method: 'POST',
    param: params
  }
})
export const SMUS_unLockUser = (params) => ({
  callApi: {
    type: SMUS_UNLOCKUSER,
    path: '/user/unLock',
    method: 'POST',
    param: params
  }
})
export const SMUS_approveInfo = (params) => ({
  callApi: {
    type: SMUS_APPROVEINFO,
    path: '/user/approveInfo',
    method: 'POST',
    param: params
  }
})
export const SMUS_reserCurrentPage = () => ({
  type: 'RESETCURRENTPAGE'
})