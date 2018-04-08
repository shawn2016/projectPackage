import { GETLOANPROGRESSLIST, LOANPROGRESSSEARCH, CLEARLOANPROGRESSSEARCH } from './constants'
/* 获取贷款进度数据列表 */
export const getLoanProgressList = (params) => ({
  callApi: {
    type: GETLOANPROGRESSLIST,
    path: '/loans/getScheduleList',
    method: 'POST',
    param: params
  }
})
/* 修改查询参数 */
export const loanProgressSearch = (params) => ({
  type: LOANPROGRESSSEARCH,
  value: params
})
/* 清空查询参数 */
export const clearLoanProgressSearch = () => ({
  type: CLEARLOANPROGRESSSEARCH
})