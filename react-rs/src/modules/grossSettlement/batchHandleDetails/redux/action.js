import { GSBHD_UPDATESEARCHINFO, GSBHD_GETORDERLIST, GSBHD_EXAMINERESULT, GSBHD_ORDERINFO, GSBHD_ORDERFLOWINFO } from './constants'
/**
 * 获取订单信息，返回值包括业务信息和收款方信息
 * @param {*} params 接口入参
 */
export const GSBHD_getOrderInfo = params => ({
  callApi: {
    type: GSBHD_ORDERINFO,
    path: params.from && params.from === 'batchHandle' ? '/payment/batch/getImportInfo' : '/payment/batch/getOrderInfo',
    method: 'POST',
    param: { serialNo: params && params.data.serialNo }
  }
})
/**
 * 获取审批（业务）流程
 * @param {*} params 接口入参
 */
export const GSBHD_getOrderFlowInfo = params => ({
  callApi: {
    type: GSBHD_ORDERFLOWINFO,
    path: '/payment/batch/getFlowList',
    method: 'POST',
    param: params
  }
})
/**
 * 保存审批结果
 * @param {*} params 接口入参
 * 40.40.20
 */
export const GSBHD_saveExamineSesult = params => ({
  callApi: {
    type: GSBHD_EXAMINERESULT,
    path: '/payment/single/approveOrder',
    method: 'POST',
    param: params
  }
})

export const GSBHD_getOrderList = params => ({
  callApi: {
    type: GSBHD_GETORDERLIST,
    path: '/payment/batch/getInfoList',
    method: 'POST',
    param: params
  }
})
export const GSBHD_resetCurrentPage = () => ({
  type: 'GSBHD_RESETCURRENTPAGE'
})
export const GSBHD_updateSearchInfo = item => ({
  type: GSBHD_UPDATESEARCHINFO,
  value: item
})