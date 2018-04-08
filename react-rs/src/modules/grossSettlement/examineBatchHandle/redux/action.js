import { GETEXAMINEBATCHORDERLIST, EXAMINEBATCHSEARCHINFO, GETEXAMINEBATCHCOMPANYLIST, ISEXAMINEBATCHSEARCH } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const getBatchExamineOrderList = params => ({
  callApi: {
    type: GETEXAMINEBATCHORDERLIST,
    path: '/payment/batch/getApproveList',
    method: 'POST',
    param: params
  }
})

// /payment/single/getApproveOrderList
/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const updateBatchExamineSearchInfo = item => ({
  type: EXAMINEBATCHSEARCHINFO,
  value: item
})

export const isBatchExamineSearch = item => ({
  type: ISEXAMINEBATCHSEARCH,
  value: item
})
/**
 * 获取对公账户列表
 */
export const getBatchExamineCompanyAccList = params => ({
  callApi: {
    type: GETEXAMINEBATCHCOMPANYLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})
/* 保存审批结果 */
// export const saveBatchExamineResult = (params = {}) => ({
//   callApi: {
//     type: EXAMINEBATCHRESULT,
//     path: '/payment/single/approveOrder',
//     method: 'POST',
//     param: params
//   }
// })