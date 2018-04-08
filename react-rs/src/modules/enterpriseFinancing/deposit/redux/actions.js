import { GETENTERPRISEACCOUNTDATA, SUBMITENTERPRISEFORM, GETENTERPRISESTATUS } from './constants'

export const getEnterpriseAccountData = () => ({
  callApi: {
    type: GETENTERPRISEACCOUNTDATA,
    path: '/account/balance/getList',
    method: 'POST'
  }
})
export const submitEnterpriseForm = (param) => ({
  callApi: {
    type: SUBMITENTERPRISEFORM,
    path: '/fund/transferFundsTo',
    method: 'POST',
    param
  }
})
export const getEnterpriseStatus = (param) => ({
  callApi: {
    type: GETENTERPRISESTATUS,
    path: '/fund/getFundsToInfo',
    method: 'POST',
    param
  }
})