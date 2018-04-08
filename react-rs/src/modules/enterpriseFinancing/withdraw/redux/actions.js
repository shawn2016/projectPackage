import { GETWITHDRAWACCOUNTDATA, SUBMITWITHDRAWFORM } from './constants'

export const getWithdrawAccountData = () => ({
  callApi: {
    type: GETWITHDRAWACCOUNTDATA,
    path: '/fund/getFundsOutInfo',
    method: 'POST'
  }
})
export const submitWithdrawForm = (param) => ({
  callApi: {
    type: SUBMITWITHDRAWFORM,
    path: '/fund/transferFundsOut',
    method: 'POST',
    param
  }
})
