import { SENG_GETNOTIFICATIONLIST, SENG_UPDATESEARCHINFO, SENG_TYPEID, SENG_GETLIST } from './constants'
/**
 * tab切换
 */
export const SENG_updateTypeId = item => ({
  type: SENG_TYPEID,
  value: item
})
/**
 * 更新查询信息
 */
export const SENG_updateSearchInfo = item => ({
  type: SENG_UPDATESEARCHINFO,
  value: item
})
/**
 * 获取简单通知信息
 */
export const SENG_getData = (params) => ({
  callApi: {
    type: SENG_GETNOTIFICATIONLIST,
    path: '/notice/simple/getInfo',
    method: 'POST',
    param: params
  }
})
/**
 * 获取通知列表
 */
export const SENG_getList = (params) => ({
  callApi: {
    type: SENG_GETLIST,
    path: '/notice/getList',
    method: 'POST',
    param: params
  }
})
