import {
  SMUS_GETUSERLIST,
  SMUS_UPDATESEARCHINFO,
  SMUS_DELUSER,
  SMUS_APPROVEINFO,
  DESP_GETACCOUNTDATA
} from './constants'
export const SMUS_updateSearchInfo = item => ({
  type: SMUS_UPDATESEARCHINFO,
  value: item
})
export const DESP_getAccountData = () => ({
  callApi: {
    type: DESP_GETACCOUNTDATA,
    path: '/account/balance/getList',
    method: 'POST'
  }
})
export const SMUS_getList = (params) => ({
  callApi: {
    type: SMUS_GETUSERLIST,
    path: '/limit/getList',
    method: 'POST',
    param: params
  }
})
export const SMUS_delUser = (params) => ({
  callApi: {
    type: SMUS_DELUSER,
    path: '/limit/deleteInfo',
    method: 'POST',
    param: params
  }
})
export const SMUS_approveInfo = (params) => ({
  callApi: {
    type: SMUS_APPROVEINFO,
    path: '/limit/approveInfo',
    method: 'POST',
    param: params
  }
})
export const SMUS_reserCurrentPage = () => ({
  type: 'RESETCURRENTPAGE'
})