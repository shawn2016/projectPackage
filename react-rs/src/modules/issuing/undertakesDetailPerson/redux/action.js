import { GSSHD_ORDERINFO, GSSHD_ORDERFLOWINFO, GSSHD_EXAMINERESULT } from './constants'
/**
 * 获取订单信息，返回值包括业务信息和收款方信息
 * @param {*} params 接口入参
 */
export const GSSHD_getOrderInfo = params => ({
  callApi: {
    type: GSSHD_ORDERINFO,
    path: '/payment/single/getOrderInfo',
    method: 'POST',
    param: params
  }
})
/**
 * 获取审批（业务）流程
 * @param {*} params 接口入参
 */
export const GSSHD_getOrderFlowInfo = params => ({
  callApi: {
    type: GSSHD_ORDERFLOWINFO,
    path: '/payment/single/getOrderFlowInfo',
    method: 'POST',
    param: params
  }
})

/**
 * 保存审批结果
 * @param {*} params 接口入参
 * 40.40.20
 */
export const GSSHD_saveExamineSesult = params => ({
  callApi: {
    type: GSSHD_EXAMINERESULT,
    path: '/payment/single/approveOrder',
    method: 'POST',
    param: params
  }
})