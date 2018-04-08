import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
// import { reducerFactory } from 'utils/utils'
import cookieStorage from 'utils/cookieStorage'
import { GSESH_GETEXAMINEBATCHORDERLIST, GSESH_EXAMINEBATCHJUMPPAGE, GSESH_EXAMINEBATCHSEARCHINFO, GSESH_GETEXAMINEBATCHCOMPANYLIST, GSESH_ISEXAMINEBATCHSEARCH } from './constant'

const GSESH_isSearch = (state = false, action) => {
  switch (action.type) {
    case GSESH_ISEXAMINEBATCHSEARCH:
      return action.value
    default:
      return state
  }
}

/* 列表*/
const GSESH_orderList = (state = [], action) => {
  switch (action.type) {
    case GSESH_GETEXAMINEBATCHORDERLIST:
      return action.data.body ? action.data.body.values : state
    default:
      return state
  }
}
/* 分页信息*/
const GSESH_pageInfo = (state = { currentPage: 1, pageCount: 10 }, action) => {
  switch (action.type) {
    case GSESH_EXAMINEBATCHJUMPPAGE:
      return action.data.values
    case GSESH_GETEXAMINEBATCHORDERLIST:
      return action.data.body ? action.data.body.pagenation : state
    default:
      return state
  }
}
/* 查询条件*/
const GSESH_queryInfo = (state = { page: 1, rows: 10, oprBizType: '201000' }, action) => {
  switch (action.type) {
    case GSESH_EXAMINEBATCHSEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
/* 审批操作结果 */
// const examineResult = reducerFactory(EXAMINEBATCHRESULT, null)

/**
 * 以下为查询选项数据（下拉框option）
 */
/**
 * 以下为查询选项数据（下拉框option）
 */
/* 对公账户列表*/
const mapCompanyAccList = arr => {
  let curArr = []
  let userInfo = {}
  if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
    userInfo = cookieStorage.getCookie('userInfo')
  }
  if (arr.body && arr.body.accounts) {
    let accoutAry = arr.body.accounts
    for (let i = 0; i < accoutAry.length; i++) {
      let curObj = {}
      if (accoutAry[i].accountName === null) {
        curObj.text = ''
      } else {
        curObj.text = accoutAry[i].accountName
      }
      if (userInfo && userInfo.isCfcaUser === '1') {
        curObj.value = accoutAry[i].virtualAccountNo
        curObj.text = accoutAry[i].umbrellaAccountNo
      } else {
        curObj.value = accoutAry[i].virtualAccountNo
        curObj.text = accoutAry[i].umbrellaAccountNo
      }
      //curObj={'text':'aaa','value':'ss'}
      curArr.push(curObj)
    }
    return curArr
  }
  return curArr
}
const GSESH_companyAccList = (state = [], action) => {
  switch (action.type) {
    case GSESH_GETEXAMINEBATCHCOMPANYLIST:
      return mapCompanyAccList(action.data.body ? action.data : state)
    default:
      return state
  }
}


const batchHandleExamineInfo = combineReducers({ GSESH_orderList, GSESH_pageInfo, GSESH_queryInfo, GSESH_companyAccList, GSESH_isSearch })
injectReducer(batchHandleExamineInfo, 'GSESH_batchHandleExamineInfo')