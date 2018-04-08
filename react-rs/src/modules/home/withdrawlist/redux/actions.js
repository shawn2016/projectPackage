import { WDWL_GETDATA, WDWL_GETACCOUNTDATA } from './constants'

export const WDWL_getData = (params) => ({
  callApi: {
    type: WDWL_GETDATA,
    path: '/payment/withdraw/getList',
    method: 'POST',
    param: params
  }
})
export const WDWL_getAccountData = () => ({
  callApi: {
    type: WDWL_GETACCOUNTDATA,
    path: '/account/balance/getList',
    method: 'POST'
  }
})
export const WDWL_reserCurrentPage = () => ({
  type: 'RESETCURRENTPAGE'
})