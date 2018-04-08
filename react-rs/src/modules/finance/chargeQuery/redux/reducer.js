import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import cookieStorage from 'utils/cookieStorage'
import { FCQ_GETCHARGELIST, FCQ_GETCQACCOUNTLIST, FCQ_UPCQDATESEARCHINFO, FCQ_CLEARSEARCHINFO, FCQ_RESETCURRENTPAGE } from './constants'

const FCQ_dataList2 = (state = { body: { values: [], pagenation: { itemCount: 0 } } }, action) => {
  switch (action.type) {
    case FCQ_GETCHARGELIST:
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
const FCQ_accountList2 = (state = [], action) => {
  switch (action.type) {
    case FCQ_GETCQACCOUNTLIST:
      return action.data ? preAccountList(action.data) : state
    default:
      return state
  }
}
const FCQ_upCQDateSearchInfo = (state = { page: 1, rows: 10, }, action) => {
  switch (action.type) {
    case FCQ_UPCQDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    case FCQ_CLEARSEARCHINFO:
      return { page: 1, rows: 10, businessType: ' ' }
    default:
      return state
  }
}
const FCQ_isReserCurrentPage = (state = 0, action) => {
  switch (action.type) {
    case FCQ_RESETCURRENTPAGE:
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
const searchChargeQuery = combineReducers({ FCQ_dataList2, FCQ_accountList2, FCQ_upCQDateSearchInfo, FCQ_isReserCurrentPage })
injectReducer(searchChargeQuery, 'FCQ_chargeQueryData')