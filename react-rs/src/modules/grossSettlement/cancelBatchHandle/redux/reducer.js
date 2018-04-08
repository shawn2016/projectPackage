import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETCANCELBATCHORDERLIST, CANCELBATCHJUMPPAGE, CANCELBATCHSEARCHINFO, GETCANCELBATCHCOMPANYLIST } from './constant'

/* 列表*/
const orderList = (state = [], action) => {
  switch (action.type) {
    case GETCANCELBATCHORDERLIST:
      console.log(action.data)
      return action.data.body ? action.data.body.values : state
    default:
      return state
  }
}
/* 分页信息*/
const pageInfo = (state = { currentPage: 1, pageCount: 10 }, action) => {
  switch (action.type) {
    case CANCELBATCHJUMPPAGE:
      return action.data.values
    case GETCANCELBATCHORDERLIST:
      return action.data.body ? action.data.body.pagenation : state
    default:
      return state
  }
}
/* 查询条件*/
const queryInfo = (state = { page: 1, rows: 10 }, action) => {
  switch (action.type) {
    case CANCELBATCHSEARCHINFO:
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
  if (arr.body && arr.body.accounts) {
    let accoutAry = arr.body.accounts
    for (let i = 0; i < accoutAry.length; i++) {
      let curObj = {}
      if (accoutAry[i].accountName === null) {
        curObj.text = ''
      } else {
        curObj.text = accoutAry[i].accountName
      }
      curObj.value = accoutAry[i].virtualAccountNo
      curObj.text = accoutAry[i].umbrellaAccountNo
      curArr.push(curObj)
    }
    return curArr
  }
  return curArr
}
const companyAccList = (state = [], action) => {
  switch (action.type) {
    case GETCANCELBATCHCOMPANYLIST:
      console.log(action.data.body ? action.data.body.values : state)
      return mapCompanyAccList(action.data.body ? action.data : state)
    default:
      return state
  }
}


const batchHandleCancelInfo = combineReducers({ orderList, pageInfo, queryInfo, companyAccList })
injectReducer(batchHandleCancelInfo, 'batchHandleCancelInfo')