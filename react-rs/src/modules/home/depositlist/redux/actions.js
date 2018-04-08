import { DESL_GETDATA, DESL_GETACCOUNTDATA } from './constants'

export const DESL_getData = (params) => ({
  callApi: {
    type: DESL_GETDATA,
    path: '/payment/recharge/getList',
    method: 'POST',
    param: params
  }
})
export const DESL_getAccountData = () => ({
  callApi: {
    type: DESL_GETACCOUNTDATA,
    path: '/account/balance/getList',
    method: 'POST'
  }
})
export const DESL_reserCurrentPage = () => ({
  type: 'RESETCURRENTPAGE'
})