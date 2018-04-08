import { GETREPAYMENTLIST, REPAYMENTSEARCH, CLEARREPAYMENTSEARCH } from './constants'
/* 获取还款查询数据列表 */
export const getRepaymentList = (params) => ({
  callApi: {
    type: GETREPAYMENTLIST,
    path: '/loans/repay/getList',
    method: 'POST',
    param: params
  }
})
/* 修改查询参数 */
export const repaymentSearch = (params) => ({
  type: REPAYMENTSEARCH,
  value: params
})
/* 清空查询参数 */
export const clearRepaymentSearch = () => ({
  type: CLEARREPAYMENTSEARCH
})