import { FCQ_GETCHARGELIST, FCQ_GETCQACCOUNTLIST, FCQ_UPCQDATESEARCHINFO, FCQ_CLEARSEARCHINFO, FCQ_RESETCURRENTPAGE } from './constants'
export const FCQ_getList = params => ({
  callApi: {
    type: FCQ_GETCHARGELIST,
    path: '/account/charge/getList',
    method: 'POST',
    param: params
  }
})
export const FCQ_getCQAccountList = params => ({
  callApi: {
    type: FCQ_GETCQACCOUNTLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params
  }
})
export const FCQ_upCQDateSearchInfo = (item) => ({
  type: FCQ_UPCQDATESEARCHINFO,
  value: item
})
export const FCQ_clearSearchInfo = () => ({
  type: FCQ_CLEARSEARCHINFO
})
export const FCQ_resetCurrentPage = () => ({
  type: FCQ_RESETCURRENTPAGE
})