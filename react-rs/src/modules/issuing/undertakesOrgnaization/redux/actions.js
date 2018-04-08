import { GETUNDERTAKESORGPAYERLIST, UPDATEUNDERTAKESORGORDERINFO, GETUNDERTAKESORGBIZRULELIST, GETUNDERTAKESORGPURPOSELIST } from './constants'
/**
 * 获取付款方账户list
 * 30.10.20
 */
export const getUndertakesOrgPayerList = params => ({
  callApi: {
    type: GETUNDERTAKESORGPAYERLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})
export const updateUndertakesOrgOrderInfo = params => ({
  type: UPDATEUNDERTAKESORGORDERINFO,
  value: params
})
/**
 * 获取业务规则list
 * 70.40.80
 */
export const getUndertakesOrgBizRuleType = (params = { bizType: '251000' }) => ({
  callApi: {
    type: GETUNDERTAKESORGBIZRULELIST,
    path: '/act/getBizFlowList',
    method: 'POST',
    param: params
  }
})
/**
 * 获取用途列表
 * 40.95.10
 */
export const getUndertakesOrgPurposeList = (params) => ({
  callApi: {
    type: GETUNDERTAKESORGPURPOSELIST,
    path: '/purpose/getPurPoseList',
    method: 'POST',
    param: params
  }
})