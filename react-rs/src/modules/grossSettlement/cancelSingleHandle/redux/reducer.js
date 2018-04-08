import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
// import { reducerFactory } from 'utils/utils'
import cookieStorage from 'utils/cookieStorage'
import { GSCSH_GETCANCELBATCHORDERLIST, GSCSH_CANCELBATCHJUMPPAGE, GSCSH_CANCELBATCHSEARCHINFO, GSCSH_GETCANCELBATCHCOMPANYLIST } from './constant'

/* 列表*/
const GSCSH_orderList = (state = [], action) => {
  switch (action.type) {
    case GSCSH_GETCANCELBATCHORDERLIST:
      console.log(action.data)
      return action.data.body ? action.data.body.values : state
    default:
      return state
  }
}
/* 分页信息*/
const GSCSH_pageInfo = (state = { currentPage: 1, pageCount: 10 }, action) => {
  switch (action.type) {
    case GSCSH_CANCELBATCHJUMPPAGE:
      return action.data.values
    case GSCSH_GETCANCELBATCHORDERLIST:
      return action.data.body ? action.data.body.pagenation : state
    default:
      return state
  }
}
/* 查询条件*/
const GSCSH_queryInfo = (state = { page: 1, rows: 10, oprBizType: '201000' }, action) => {
  switch (action.type) {
    case GSCSH_CANCELBATCHSEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
/* 审批操作结果 */
// const examineResult = reducerFactory(CANCELBATCHRESULT, null)

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
const GSCSH_companyAccList = (state = [], action) => {
  switch (action.type) {
    case GSCSH_GETCANCELBATCHCOMPANYLIST:
      console.log(action.data.body ? action.data.body.values : state)
      return mapCompanyAccList(action.data.body ? action.data : state)
    default:
      return state
  }
}


const batchHandleCancelInfo = combineReducers({ GSCSH_orderList, GSCSH_pageInfo, GSCSH_queryInfo, GSCSH_companyAccList })
injectReducer(batchHandleCancelInfo, 'GSCSH_batchHandleCancelInfo')