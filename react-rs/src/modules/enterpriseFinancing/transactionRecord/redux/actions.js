import { EFTR_GETTABLELIST, EFTR_GETTABLELISTS, EFTR_UPDATESEARCHINFO, EFTR_SETCURRENTPAGEONE } from './constants'

export const EFTR_getTableList = (obj) => {
  console.log('��ȡ�б������������', obj)
  return {
    callApi: {
      type: EFTR_GETTABLELIST,
      path: '/fund/getList',
      method: 'POST',
      param: obj
    }
  }
}

export const EFTR_getTableLists = (obj) => {
  console.log('��ȡ�б������������', obj)
  return {
    callApi: {
      type: EFTR_GETTABLELISTS,
      path: '/syslog/getLogTypeList',
      method: 'POST',
      param: obj
    }
  }
}

export const EFTR_updateSearchInfo = (obj) => ({
  type: EFTR_UPDATESEARCHINFO,
  value: obj
})

export const EFTR_setCurrentPageOne = (obj) => ({
  type: EFTR_SETCURRENTPAGEONE,
  value: obj
})