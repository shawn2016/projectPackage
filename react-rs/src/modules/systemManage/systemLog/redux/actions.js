import { SMSL_GETTABLELIST, SMSL_GETTABLELISTS, SMSL_UPDATESEARCHINFO, SMSL_SETCURRENTPAGEONE } from './constants'

export const SMSL_getTableList = (obj) => {
  console.log('��ȡ�б������������', obj)
  return {
    callApi: {
      type: SMSL_GETTABLELIST,
      path: '/syslog/getList',
      method: 'POST',
      param: obj
    }
  }
}

export const SMSL_getTableLists = (obj) => {
  console.log('��ȡ�б������������', obj)
  return {
    callApi: {
      type: SMSL_GETTABLELISTS,
      path: '/syslog/getLogTypeList',
      method: 'POST',
      param: obj
    }
  }
}

export const SMSL_updateSearchInfo = (obj) => ({
  type: SMSL_UPDATESEARCHINFO,
  value: obj
})

export const SMSL_setCurrentPageOne = (obj) => ({
  type: SMSL_SETCURRENTPAGEONE,
  value: obj
})