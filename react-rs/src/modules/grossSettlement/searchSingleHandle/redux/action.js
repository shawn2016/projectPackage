import { GSSSH_GETORDERLIST, GSSSH_UPDATESEARCHINFO, GSSSH_GETCOMPANYACCLIST, GSSSH_GETSTATUSLIST } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const GSSSH_getOrderList = params => ({
  callApi: {
    type: GSSSH_GETORDERLIST,
    path: '/payment/single/getOrderList',
    method: 'POST',
    param: params
  }
})
/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const GSSSH_updateSearchInfo = item => ({
  type: GSSSH_UPDATESEARCHINFO,
  value: item
})
/**
 * 获取对公账户列表
 * 70.20.10
 */
export const GSSSH_getCompanyAccList = (params = {}) => ({
  callApi: {
    type: GSSSH_GETCOMPANYACCLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})
/**
 * 获取状态列表
 */
export const GSSSH_getStatusList = () => ({
  type: GSSSH_GETSTATUSLIST
})
//是否设置分页
export const GSSSH_resetCurrentPage = () => ({
  type: 'GSSSH_RESETCURRENTPAGE'
})