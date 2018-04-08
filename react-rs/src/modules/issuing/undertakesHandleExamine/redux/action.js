import { GETEXAMINEUNDERTAKESORDERLIST, EXAMINEUNDERTAKESSEARCHINFO, GETEXAMINEUNDERTAKESCOMPANYLIST, ISEXAMINEUNDERTAKESSEARCH } from './constant'
/**
 * 获取列表
 * @param{*} params
 */
export const getUndertakesExamineOrderList = params => ({
  callApi: {
    type: GETEXAMINEUNDERTAKESORDERLIST,
    path: '/payment/agency/getApproveList',
    method: 'POST',
    param: params
  }
})

/**
 * 更新筛选条件，输入或选择触发
 * @param {*} item
 */
export const updateUndertakesExamineSearchInfo = item => ({
  type: EXAMINEUNDERTAKESSEARCHINFO,
  value: item
})

export const isUndertakesExamineSearch = item => ({
  type: ISEXAMINEUNDERTAKESSEARCH,
  value: item
})
/**
 * 获取对公账户列表
 */
export const getUndertakesExamineCompanyAccList = params => ({
  callApi: {
    type: GETEXAMINEUNDERTAKESCOMPANYLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})