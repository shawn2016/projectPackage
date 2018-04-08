import { GSSH_PAYERLIST, GSSH_ORDERINFO, GSSH_ACCBALANCEINFO, GSSH_BIZRULELIST, GSSH_PURPOSELIST, GSSH_PAYEELIST } from './constants'
/**
 * 获取付款方账户list
 * 30.10.20
 */
export const getPayerList = params => ({
  callApi: {
    type: GSSH_PAYERLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})
export const updateOrderInfo = params => ({
  type: GSSH_ORDERINFO,
  value: params
})
/**
 * 获取钱包余额
 * 30.10.10
 */
export const getAccBalanceInfo = params => ({
  callApi: {
    type: GSSH_ACCBALANCEINFO,
    path: '/account/balance/getInfo',
    method: 'POST',
    param: params
  }
})
/**
 * 获取业务规则list
 * 70.40.80
 */
export const getBizRuleType = (params = { bizType: '201000' }) => ({
  callApi: {
    type: GSSH_BIZRULELIST,
    path: '/act/getBizFlowList',
    method: 'POST',
    param: params
  }
})

/**
 * 获取用途列表
 * 40.95.10
 */
export const getPurposeList = (params) => ({
  callApi: {
    type: GSSH_PURPOSELIST,
    path: 'purpose/getPurPoseList',
    method: 'POST',
    param: params
  }
})
/**
 * 获取收款方列表
 *  40.90.10
 */
export const getPayeeList = params => ({
  callApi: {
    type: GSSH_PAYEELIST,
    path: '/payee/getList',
    method: 'POST',
    param: params
  }
})

/**
 * 获取业务类型list
 * 目前写死转账
 */

// /* 付款方账户list */
// export const PAYERLIST = Symbol('PAYERLIST')
// /* 经办表单详情 */
// export const ORDERINFO = Symbol('ORDERINFO')
// /* 付款方账户余额 */
// export const ACCBALANCEINFO = Symbol('ACCBALANCEINFO')

// /* 业务规则list */
// export const BIZRULELIST = Symbol('BIZRULELIST')

// /* 业务类型list */
// export const BIZTYPELIST = Symbol('BIZTYPELIST')

// /* 用途列表 */
// export const PURPOSELIST = Symbol('PURPOSELIST')

// /* 收款方列表 */
// export const PAYEELIST = Symbol('PAYEELIST')