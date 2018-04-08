import { WDAW_GETACCOUNTDATA, WDAW_SUBMITFORM, WDAW_GETLISTGONG } from './constants'

export const WDAW_getAccountData = () => ({
  callApi: {
    type: WDAW_GETACCOUNTDATA,
    path: '/account/balance/getList',
    method: 'POST'
  }
})
export const WDAW_submitForm = (param) => ({
  callApi: {
    type: WDAW_SUBMITFORM,
    path: '/payment/withdraw/saveOrder',
    method: 'POST',
    param
  }
})
export const WDAW_getListGong = (param) => ({
  callApi: {
    type: WDAW_GETLISTGONG,
    path: 'companyAcc/getList',
    method: 'POST',
    param
  }
})
