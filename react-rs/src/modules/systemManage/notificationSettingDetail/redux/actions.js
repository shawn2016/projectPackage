import { SENL_GETNOTIFICATIONINFO } from './constants'

export const SENL_getNotificationInfo = (params) => ({
  callApi: {
    type: SENL_GETNOTIFICATIONINFO,
    path: '/notice/getInfo',
    method: 'POST',
    param: params
  }
})