import { IUTH_GETORDERLIST, IUTH_UPDATESEARCHINFO, IUTH_GETCOMPANYACCLIST, IUTH_GETSTATUSLIST } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const IUTH_getOrderList = params => ({
  callApi: {
    type: IUTH_GETORDERLIST,
    path: '/payment/agency/getOrderList',
    method: 'POST',
    param: params
  }
})
/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const IUTH_updateSearchInfo = item => ({
  type: IUTH_UPDATESEARCHINFO,
  value: item
})
/**
 * 获取对公账户列表
 * 70.20.10
 */
export const IUTH_getCompanyAccList = (params = {}) => ({
  callApi: {
    type: IUTH_GETCOMPANYACCLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})
/**
 * 获取状态列表
 */
export const IUTH_getStatusList = () => ({
  type: IUTH_GETSTATUSLIST
})
//是否设置分页
export const IUTH_resetCurrentPage = () => ({
  type: 'IUTH_RESETCURRENTPAGE'
})