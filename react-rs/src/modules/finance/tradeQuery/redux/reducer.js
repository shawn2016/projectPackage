import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import cookieStorage from 'utils/cookieStorage'
import { FTQ_GETTQLIST, FTQ_GETACCOUNTLIST, FTQ_UPDATESEARCHINFO, FTQ_CLEARSEARCHINFO, FTQ_RESETCURRENTPAGE, FTQ_EXPORTRECORD } from './constants'

const FTQ_tradeDataList1 = (state = { body: { values: [], pagenation: {} } }, action) => {
  switch (action.type) {
    case FTQ_GETTQLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
let preAccountList = (arr) => {
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
const FTQ_accountList1 = (state = [], action) => {
  switch (action.type) {
    case FTQ_GETACCOUNTLIST:
      return action.data ? preAccountList(action.data) : state
    default:
      return state
  }
}
const FTQ_exportRecord = (state = {}, action) => {
  switch (action.type) {
    case FTQ_EXPORTRECORD:
      return action.data ? action.data : state
    default:
      return state
  }
}
const FTQ_upDateSearchInfo = (state = { page: 1, rows: 10, accountNo: '', payType: '' }, action) => {
  switch (action.type) {
    case FTQ_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    case FTQ_CLEARSEARCHINFO:
      return { page: 1, rows: 10, accountNo: action.value, payType: '' }
    default:
      return state
  }
}
const FTQ_isReserCurrentPage1 = (state = 0, action) => {
  switch (action.type) {
    case FTQ_RESETCURRENTPAGE:
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
const searchChargeQuery = combineReducers({ FTQ_tradeDataList1, FTQ_accountList1, FTQ_upDateSearchInfo, FTQ_isReserCurrentPage1, FTQ_exportRecord })
injectReducer(searchChargeQuery, 'FTQ_tradeQueryData')