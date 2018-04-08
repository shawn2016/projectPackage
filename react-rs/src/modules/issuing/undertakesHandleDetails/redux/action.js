import { IUTHD_UPDATESEARCHINFO, IUTHD_GETORDERLIST, IUTHD_EXAMINERESULT, IUTHD_ORDERINFO, IUTHD_ORDERFLOWINFO } from './constants'
/**
 * 获取订单信息，返回值包括业务信息和收款方信息
 * @param {*} params 接口入参
 */
export const IUTHD_getOrderInfo = params => ({
  callApi: {
    type: IUTHD_ORDERINFO,
    path: params.from && params.from === 'undertakesHandle' ? '/payment/agency/getImportInfo' : '/payment/agency/getOrderInfo',
    method: 'POST',
    param: { serialNo: params && params.data.serialNo }
  }
})
/**
 * 获取审批（业务）流程
 * @param {*} params 接口入参
 */
export const IUTHD_getOrderFlowInfo = params => ({
  callApi: {
    type: IUTHD_ORDERFLOWINFO,
    path: 'payment/agency/getFlowList',
    method: 'POST',
    param: params
  }
})
/**
 * 保存审批结果
 * @param {*} params 接口入参
 * 40.40.20
 */
export const IUTHD_saveExamineSesult = params => ({
  callApi: {
    type: IUTHD_EXAMINERESULT,
    path: '/payment/single/approveOrder',
    method: 'POST',
    param: params
  }
})

export const IUTHD_getOrderList = params => ({
  callApi: {
    type: IUTHD_GETORDERLIST,
    path: '/payment/agency/getInfoList',
    method: 'POST',
    param: params
  }
})
export const IUTHD_resetCurrentPage = () => ({
  type: 'IUTHD_RESETCURRENTPAGE'
})
export const IUTHD_updateSearchInfo = item => ({
  type: IUTHD_UPDATESEARCHINFO,
  value: item
})