import { GETREPAYMENTINFO, GETREPAYMENTDETAILLIST } from './constants'
/* 获取还款详情信息 */
export const getRepaymentInfo = (id) => ({
  callApi: {
    type: GETREPAYMENTINFO,
    path: '/loans/repay/getAmountInfo',
    method: 'POST',
    param: id
  }
})
/* 获取还款明细列表信息 */
export const getRepaymentDetailList = (id) => ({
  callApi: {
    type: GETREPAYMENTDETAILLIST,
    path: '/loans/repay/getDetailList',
    method: 'POST',
    param: id
  }
})