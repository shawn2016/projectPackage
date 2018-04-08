import { GSCSH_GETCANCELBATCHORDERLIST, GSCSH_CANCELBATCHSEARCHINFO, GSCSH_GETCANCELBATCHCOMPANYLIST } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const GSCSH_getCancelBatchOrderList = params => ({
  callApi: {
    type: GSCSH_GETCANCELBATCHORDERLIST,
    path: '/payment/single/getRevokeOrderList',
    method: 'POST',
    param: params
  }
})
/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const GSCSH_updateCancelBatchSearchInfo = item => ({
  type: GSCSH_CANCELBATCHSEARCHINFO,
  value: item
})
/**
 * 获取对公账户列表
 */
export const GSCSH_getCancelBatchCompanyAccList = params => ({
  callApi: {
    type: GSCSH_GETCANCELBATCHCOMPANYLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})
/* 保存审批结果 */
// export const saveCancelBatchResult = (params = {}) => ({
//   callApi: {
//     type: CANCELBATCHRESULT,
//     path: '/payment/single/revokeOrder',
//     method: 'POST',
//     param: params
//   }
// })