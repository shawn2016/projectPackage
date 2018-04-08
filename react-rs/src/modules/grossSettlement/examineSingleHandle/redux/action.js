import { GSESH_GETEXAMINEBATCHORDERLIST, GSESH_EXAMINEBATCHSEARCHINFO, GSESH_GETEXAMINEBATCHCOMPANYLIST, GSESH_ISEXAMINEBATCHSEARCH } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const GSESH_getBatchExamineOrderList = params => ({
  callApi: {
    type: GSESH_GETEXAMINEBATCHORDERLIST,
    path: '/payment/single/getApproveOrderList',
    method: 'POST',
    param: params
  }
})

// /payment/single/getApproveOrderList
/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const GSESH_updateBatchExamineSearchInfo = item => ({
  type: GSESH_EXAMINEBATCHSEARCHINFO,
  value: item
})

export const GSESH_isBatchExamineSearch = item => ({
  type: GSESH_ISEXAMINEBATCHSEARCH,
  value: item
})
/**
 * 获取对公账户列表
 */
export const GSESH_getBatchExamineCompanyAccList = params => ({
  callApi: {
    type: GSESH_GETEXAMINEBATCHCOMPANYLIST,
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