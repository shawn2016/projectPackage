import { OIOT_GETDATA, OIOT_DELDATA } from './constants'

export const OIOT_getData = (param) => ({
  callApi: {
    type: OIOT_GETDATA,
    path: '/dashboard/getNoticeInfoList',
    method: 'POST',
    param
  }
})
export const OIOT_delData = () => ({
  callApi: {
    type: OIOT_DELDATA,
    path: '/modules/otherInfo/notice/mockData/msgList.json',
    method: 'POST',
    params: {}
  }
})