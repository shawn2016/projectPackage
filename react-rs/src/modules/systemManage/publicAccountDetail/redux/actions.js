import { PADGETPULICACCOUNT, PADSAVEPULICACCOUNT, PADUPDATESEARCHINFO } from './constants'

export const padupdateSearchInfo = item => ({
  type: PADUPDATESEARCHINFO,
  value: item
})
export const padgetData = (params) => ({
  callApi: {
    type: PADGETPULICACCOUNT,
    path: '/companyAcc/getInfo',
    method: 'POST',
    param: params
  }
})
export const padsaveData = (params) => ({
  callApi: {
    type: PADSAVEPULICACCOUNT,
    path: '/companyAcc/saveInfo',
    method: 'POST',
    param: params
  }
})
export const padpayTheFees = (params) => ({
  callApi: {
    type: 'payTheFees',
    path: '/payment/recharge/payTheFees',
    method: 'POST',
    param: params
  }
})