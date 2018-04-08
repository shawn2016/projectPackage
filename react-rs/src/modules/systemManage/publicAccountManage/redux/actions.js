import { PAMGETACCOUNTLIST } from './constants'

export const pamgetData = (params) => ({
  callApi: {
    type: PAMGETACCOUNTLIST,
    path: '/companyAcc/getAllList',
    method: 'POST',
    param: params
  }
})
export const pamdelAccount = (params) => ({
  callApi: {
    type: 'DELACCOUNTLIST',
    path: '/companyAcc/delInfo',
    method: 'POST',
    param: params
  }
})
export const pampayTheFees = (params) => ({
  callApi: {
    type: 'payTheFees',
    path: '/payment/recharge/payTheFees',
    method: 'POST',
    param: params
  }
})