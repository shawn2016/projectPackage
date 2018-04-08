import { OICI_GETDATA } from './constants'

export const OICI_getData = () => ({
  callApi: {
    type: OICI_GETDATA,
    path: '/curruser/getCompanyInfo',
    method: 'POST',
    params: {}
  }
})