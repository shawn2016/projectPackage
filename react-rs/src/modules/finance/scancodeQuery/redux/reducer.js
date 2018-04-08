import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { FSQ_GETSQLIST, FSQ_UPDATESQSEARCHINFO, FSQ_CLEARSEARCHINFO, FSQ_RESETCURRENTPAGE } from './constants'

const FSQ_scanQueryDataList = (state = { body: { values: [] } }, action) => {
  switch (action.type) {
    case FSQ_GETSQLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
// let preAccountList = (arr) => {
//   let curArr = []
//   if (arr.body && arr.body.accounts) {
//     let accountsAry = arr.body.accounts
//     for (let i = 0; i < accountsAry.length; i++) {
//       let curObj = {}
//       if (accountsAry[i].accountName === null) {
//         curObj.text = ''
//       } else {
//         curObj.text = accountsAry[i].accountName
//       }
//       curObj.value = accountsAry[i].accountName
//       //curObj={'text':'aaa','value':'ss'}
//       curArr.push(curObj)
//     }
//     return curArr
//   }
//   return curArr
// }
// const accountList = (state = [], action) => {
//   switch (action.type) {
//     case GETACCOUNTLIST:
//       return preAccountList(action.data)
//     default:
//       return state
//   }
// }
const FSQ_upDateSQSearchInfo = (state = { page: 1, rows: 10 }, action) => {
  switch (action.type) {
    case FSQ_UPDATESQSEARCHINFO:
      return Object.assign({}, state, action.value)
    case FSQ_CLEARSEARCHINFO:
      //return { pageNo: 1, pageSize: 10, businessType: ' ' }
      return {}
    default:
      return state
  }
}
const FSQ_isReserCurrentPage = (state = 0, action) => {
  switch (action.type) {
    case FSQ_RESETCURRENTPAGE:
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
const searchChargeQuery = combineReducers({ FSQ_scanQueryDataList, FSQ_upDateSQSearchInfo, FSQ_isReserCurrentPage })
injectReducer(searchChargeQuery, 'FSQ_chargeScanQueryData')