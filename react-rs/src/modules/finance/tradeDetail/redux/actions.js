import { GETCHARGEDETAL, EXPORTRECORD } from './constants'
export const getInfo = (params) => ({
  callApi: {
    type: GETCHARGEDETAL,
    path: '/payment/order/getInfo',
    method: 'POST',
    param: params
  }
})
export const exportRecord = params => ({
  callApi: {
    type: EXPORTRECORD,
    path: '/payment/order/exportReceipt',
    method: 'POST',
    param: params
  }
})