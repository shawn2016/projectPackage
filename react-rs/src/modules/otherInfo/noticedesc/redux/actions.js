import { OIND_GETDATA } from './constants'

export const OIND_getData = (param) => ({
  callApi: {
    type: OIND_GETDATA,
    path: '/dashboard/getNoticeInfo',
    method: 'POST',
    param
  }
})