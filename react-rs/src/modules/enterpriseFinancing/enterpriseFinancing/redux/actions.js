import { EFEF_GETDATA, EFEF_ORDERINFO, EFEF_GETNUM, EFEF_GETLOANINTENTION1, EFEF_GETLOGININFO } from './constants'

export const EFEF_getData = () => ({
  callApi: {
    type: EFEF_GETDATA,
    path: '/fund/getChartData',
    method: 'POST',
    params: {}
  }
})
export const EFEF_getNum = () => ({
  callApi: {
    type: EFEF_GETNUM,
    path: '/fund/getFinanceProfit',
    method: 'POST',
    params: {}
  }
})
export const EFEF_updateOrderInfo = params => ({
  type: EFEF_ORDERINFO,
  value: params
})
export const EFEF_getLoanIntention1 = () => ({
  callApi: {
    type: EFEF_GETLOANINTENTION1,
    path: '/transStats/getWeek',
    method: 'POST',
    params: {}
  }
})
export const EFEF_getLoginInfo = () => ({
  callApi: {
    type: EFEF_GETLOGININFO,
    path: '/curruser/getInfo',
    method: 'POST',
    params: {}
  }
})