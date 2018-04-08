import { FSQ_GETSQLIST, FSQ_UPDATESQSEARCHINFO, FSQ_CLEARSEARCHINFO, FSQ_RESETCURRENTPAGE } from './constants'
export const FSQ_getSqList = params => ({
  callApi: {
    type: FSQ_GETSQLIST,
    path: '/posqr/getList',
    method: 'POST',
    param: params
  }
})

export const FSQ_upDateSQSearchInfo = (item) => {
  console.log(item)
  return {
    type: FSQ_UPDATESQSEARCHINFO,
    value: item
  }
}
export const FSQ_clearSearchInfo = () => {
  console.log('清除参数')
  return {
    type: FSQ_CLEARSEARCHINFO
  }
}
export const FSQ_resetCurrentPage = () => ({
  type: FSQ_RESETCURRENTPAGE
})