import { DESP_GETACCOUNTDATA, DESP_SUBMITFORM } from './constants'

export const DESP_getAccountData = () => ({
  callApi: {
    type: DESP_GETACCOUNTDATA,
    path: '/account/balance/getList',
    method: 'POST'
  }
})
export const DESP_submitForm = (param) => ({
  callApi: {
    type: DESP_SUBMITFORM,
    path: '/limit/saveInfo',
    method: 'POST',
    param
  }
})