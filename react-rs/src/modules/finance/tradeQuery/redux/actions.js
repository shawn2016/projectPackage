import { actionFactory } from 'utils/utils'
import { FTQ_GETTQLIST, FTQ_GETACCOUNTLIST, FTQ_UPDATESEARCHINFO, FTQ_CLEARSEARCHINFO, FTQ_RESETCURRENTPAGE, FTQ_EXPORTRECORD } from './constants'
export const FTQ_getTqList = params => ({
  callApi: {
    type: FTQ_GETTQLIST,
    path: '/payment/order/getSuccList',
    method: 'POST',
    param: params
  }
})
export const FTQ_getAccountList = params => ({
  callApi: {
    type: FTQ_GETACCOUNTLIST,
    path: '/account/balance/getList',
    method: 'POST',
    param: params,

  }
})
/*export const exportRecord = params => ({
  callApi: {
    type: EXPORTRECORD,
    path: '/payment/order/exportList',
    method: 'POST',
    param: params,
    dataType: 'blob',
    isHideLoading: true

  }
})*/
export const FTQ_exportRecord = actionFactory(FTQ_EXPORTRECORD, 'POST', '/payment/order/exportList', true) // 文件

export const FTQ_upDateSearchInfo = (item) => {
  console.log(item)
  return {
    type: FTQ_UPDATESEARCHINFO,
    value: item
  }
}
export const FTQ_clearSearchInfo = (value) => {
  console.log('清除参数', value)
  return {
    type: FTQ_CLEARSEARCHINFO,
    value
  }
}
export const FTQ_resetCurrentPage = () => ({
  type: FTQ_RESETCURRENTPAGE
})