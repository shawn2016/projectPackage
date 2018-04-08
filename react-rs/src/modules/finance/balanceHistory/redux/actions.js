import { FBH_GETTABLELIST, FBH_UPDATESEARCHINFO, FBH_SETCURRENTPAGEONE } from './constants'

export const FBH_getTableList = (obj) => {
  console.log('获取列表数据请求参数', obj)
  return {
    callApi: {
      type: FBH_GETTABLELIST,
      path: '/account/balance/getHistoryList',
      method: 'POST',
      param: obj
    }
  }
}

export const FBH_updateSearchInfo = (obj) => ({
  type: FBH_UPDATESEARCHINFO,
  value: obj
})

export const FBH_setCurrentPageOne = (obj) => ({
  type: FBH_SETCURRENTPAGEONE,
  value: obj
})