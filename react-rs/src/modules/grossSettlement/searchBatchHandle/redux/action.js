import { GSSBH_GETORDERLIST, GSSBH_UPDATESEARCHINFO, GSSBH_GETCOMPANYACCLIST, GSSBH_GETSTATUSLIST } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const GSSBH_getOrderList = params => ({
  callApi: {
    type: GSSBH_GETORDERLIST,
    path: 'payment/batch/getOrderList',
    method: 'POST',
    param: params
  }
})
/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const GSSBH_updateSearchInfo = item => ({
  type: GSSBH_UPDATESEARCHINFO,
  value: item
})
/**
 * 获取对公账户列表
 * 70.20.10
 */
export const GSSBH_getCompanyAccList = (params = {}) => ({
  callApi: {
    type: GSSBH_GETCOMPANYACCLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})
/**
 * 获取状态列表
 */
export const GSSBH_getStatusList = () => ({
  type: GSSBH_GETSTATUSLIST
})
//是否设置分页
export const GSSBH_resetCurrentPage = () => ({
  type: 'GSSBH_RESETCURRENTPAGE'
})