import { GETLOANINTENTIONLIST, LOANINTENTIONSEARCH, CLEARLOANINTENTIONSEARCH } from './constants'
/* 获取贷款意向数据列表 */
export const getLoanIntentionList = (params) => ({
  callApi: {
    type: GETLOANINTENTIONLIST,
    path: '/loans/getIntentList',
    method: 'POST',
    param: params
  }
})
/* 修改查询参数 */
export const loanIntentionSearch = (params) => ({
  type: LOANINTENTIONSEARCH,
  value: params
})
/* 清空查询参数 */
export const clearLoanIntentionSearch = () => ({
  type: CLEARLOANINTENTIONSEARCH
})