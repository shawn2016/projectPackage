import { actionFactory } from 'utils/utils'
import { AHPR_GETTQLIST, AHPR_UPDATESEARCHINFO, AHPR_CLEARSEARCHINFO, AHPR_RESETCURRENTPAGE, AHPR_EXPORTRECORD } from './constants'
export const AHPR_getTqList = params => ({
  callApi: {
    type: AHPR_GETTQLIST,
    path: '/anthr/detail/getDetailList',
    method: 'POST',
    param: params
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
export const AHPR_exportRecord = actionFactory(AHPR_EXPORTRECORD, 'POST', '/payment/order/exportList', true) // 文件

export const AHPR_upDateSearchInfo = (item) => {
  console.log(item)
  return {
    type: AHPR_UPDATESEARCHINFO,
    value: item
  }
}
export const AHPR_clearSearchInfo = (value) => {
  console.log('清除参数', value)
  return {
    type: AHPR_CLEARSEARCHINFO,
    value
  }
}
export const AHPR_resetCurrentPage = () => ({
  type: AHPR_RESETCURRENTPAGE
})