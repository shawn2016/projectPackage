import { GETCANCELBATCHORDERLIST, CANCELBATCHSEARCHINFO, GETCANCELBATCHCOMPANYLIST } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const getCancelBatchOrderList = params => ({
  callApi: {
    type: GETCANCELBATCHORDERLIST,
    path: '/payment/batch/getRevokeList',
    method: 'POST',
    param: params
  }
})
/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const updateCancelBatchSearchInfo = item => ({
  type: CANCELBATCHSEARCHINFO,
  value: item
})
/**
 * 获取对公账户列表
 */
export const getCancelBatchCompanyAccList = params => ({
  callApi: {
    type: GETCANCELBATCHCOMPANYLIST,
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