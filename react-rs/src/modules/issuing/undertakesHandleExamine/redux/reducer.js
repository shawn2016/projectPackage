import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETEXAMINEUNDERTAKESORDERLIST, EXAMINEUNDERTAKESJUMPPAGE, EXAMINEUNDERTAKESSEARCHINFO, GETEXAMINEUNDERTAKESCOMPANYLIST, ISEXAMINEUNDERTAKESSEARCH } from './constant'

const isSearch = (state = false, action) => {
  switch (action.type) {
    case ISEXAMINEUNDERTAKESSEARCH:
      return action.value
    default:
      return state
  }
}

/* 列表*/
const orderList = (state = [], action) => {
  switch (action.type) {
    case GETEXAMINEUNDERTAKESORDERLIST:
      return action.data.body ? action.data.body.values : state
    default:
      return state
  }
}
/* 分页信息*/
const pageInfo = (state = { currentPage: 1, pageCount: 10 }, action) => {
  switch (action.type) {
    case EXAMINEUNDERTAKESJUMPPAGE:
      return action.data.values
    case GETEXAMINEUNDERTAKESORDERLIST:
      return action.data.body ? action.data.body.pagenation : state
    default:
      return state
  }
}
/* 查询条件*/
const queryInfo = (state = { page: 1, rows: 10 }, action) => {
  switch (action.type) {
    case EXAMINEUNDERTAKESSEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

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
    case GETEXAMINEUNDERTAKESCOMPANYLIST:
      return mapCompanyAccList(action.data.body ? action.data : state)
    default:
      return state
  }
}


const undertakesHandleExamineInfo = combineReducers({ orderList, pageInfo, queryInfo, companyAccList, isSearch })
injectReducer(undertakesHandleExamineInfo, 'undertakesHandleExamineInfo')