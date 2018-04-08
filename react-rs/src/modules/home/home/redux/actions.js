import { HHGETCREDITLIMIT, HHGETREMAININGSUM, HHGETTODOINFO, HHGETRECENTLIST, HHGETLOGININFO } from './constants'

export const hhgetCreditLimit = (params) => ({
  callApi: {
    type: HHGETCREDITLIMIT,
    path: 'loans/getCreditLimit',
    method: 'POST',
    param: params,
    isHideLoading: true,
  }
})

export const hhgetRemainingSum = (params) => ({
  callApi: {
    type: HHGETREMAININGSUM,
    path: 'account/balance/getInfo',
    method: 'POST',
    param: params,
    isHideLoading: true,
  }
})

export const hhgetTodoInfo = (params) => ({
  callApi: {
    type: HHGETTODOINFO,
    path: 'dashboard/getTodoInfo',
    method: 'POST',
    param: params,
    isHideLoading: true,
  }
})

export const hhgetRecentList = () => ({
  callApi: {
    type: HHGETRECENTLIST,
    path: 'payment/order/getSuccList',
    method: 'POST',
    param: {
      rows: 5,
      page: 1
    },
    isHideLoading: true,
  }
})

export const hhgetLoginInfo = (params) => ({
  callApi: {
    type: HHGETLOGININFO,
    path: 'curruser/getLoginInfo',
    method: 'POST',
    param: params,
    isHideLoading: true,
  }
})