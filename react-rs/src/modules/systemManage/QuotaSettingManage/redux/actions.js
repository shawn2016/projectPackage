import { GETACCOUNTNAMELIST, GETTABLELIST, UPDATESEARCHINFO, CLEAR, DELETEINFO } from './constants'

export const getAccountNameList = (obj) => {
  console.log('获取账号名称请求参数', obj)
  return {
    callApi: {
      type: GETACCOUNTNAMELIST,
      path: '/companyAcc/getList',
      method: 'POST',
      params: obj
    }
  }
}

export const getTableList = (obj) => {
  console.log('获取列表数据请求参数', obj)
  return {
    callApi: {
      type: GETTABLELIST,
      path: '/limit/getList',
      method: 'POST',
      params: obj
    }
  }
}

export const deleteInfo = (obj) => {
  console.log('删除额度设置信息请求参数', obj)
  return {
    callApi: {
      type: DELETEINFO,
      path: '/limit/deleteInfo',
      method: 'POST',
      params: obj
    }
  }
}

export const updateSearchInfo = (obj) => ({
  type: UPDATESEARCHINFO,
  value: obj
})

export const clear = (obj) => ({
  type: CLEAR,
  value: obj
})