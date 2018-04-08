import { DSCS_GETORDERLIST, DSCS_UPDATESEARCHINFO, DSCS_GETCOMPANYACCLIST } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const DSCS_getOrderList = params => ({
  callApi: {
    type: DSCS_GETORDERLIST,
    path: '/statistics/scancode/getList',
    method: 'POST',
    param: params
  }
})
/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const DSCS_updateSearchInfo = item => ({
  type: DSCS_UPDATESEARCHINFO,
  value: item
})
/**
 * 获取对公账户列表
 * 70.20.10
 */
export const DSCS_getCompanyAccList = (params = {}) => ({
  callApi: {
    type: DSCS_GETCOMPANYACCLIST,
    path: '/statistics/scancode/getQrCodeList',
    method: 'POST',
    param: params
  }
})
