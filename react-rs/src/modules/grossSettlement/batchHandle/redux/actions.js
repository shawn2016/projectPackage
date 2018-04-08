import { GETBATCHHANDLEPAYERLIST, UPDATEBATCHHANDLEORDERINFO, GETBATCHHANDLEBIZRULELIST } from './constants'
/**
 * 获取付款方账户list
 * 30.10.20
 */
export const getBatchHandlePayerList = params => ({
  callApi: {
    type: GETBATCHHANDLEPAYERLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})
export const updateBatchHandleOrderInfo = params => ({
  type: UPDATEBATCHHANDLEORDERINFO,
  value: params
})
/**
 * 获取业务规则list
 * 70.40.80
 */
export const getBatchHandleBizRuleType = (params = { bizType: '201000' }) => ({
  callApi: {
    type: GETBATCHHANDLEBIZRULELIST,
    path: '/act/getBizFlowList',
    method: 'POST',
    param: params
  }
})