import { GETUNDERTAKESCANCELORDERLIST, UNDERTAKESCANCELSEARCHINFO, GETUNDERTAKESCANCELCOMPANYLIST } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const getUndertakesCancelOrderList = params => ({
  callApi: {
    type: GETUNDERTAKESCANCELORDERLIST,
    path: '/payment/agency/getRevokeList',
    method: 'POST',
    param: params
  }
})
/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const updateUndertakesCancelSearchInfo = item => ({
  type: UNDERTAKESCANCELSEARCHINFO,
  value: item
})
/**
 * 获取对公账户列表
 */
export const getUndertakesCancelCompanyAccList = params => ({
  callApi: {
    type: GETUNDERTAKESCANCELCOMPANYLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})