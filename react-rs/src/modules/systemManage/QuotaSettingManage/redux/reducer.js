import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETACCOUNTNAMELIST, GETTABLELIST, UPDATESEARCHINFO, DELETEINFO } from './constants'

// const accountNameListFilter = (arr) => {
//   let accountNameList = []
//   console.log(arr)
//   for (let i = 0; i < arr.length; i++) {
//     accountNameList.push({
//       text: arr[i].accountName,
//       value: arr[i].accountNo
//     })
//   }
//   return accountNameLists
// }

// const accountNameList = (state = [], action) => {
//   switch (action.type) {
//     case GETACCOUNTNAMELIST:
//       return accountNameListFilter(action.data.body)
//     default:
//       return state
//   }
// }

/**
 *
 *
 * @param {*} 获取账户名称列表
 */
const accountNameList = (state = [], action) => {
  switch (action.type) {
    case GETACCOUNTNAMELIST:
      return action.data ? action.data.body : state
    default:
      return state
  }
}

const tableList = (state = {}, action) => {
  switch (action.type) {
    case GETTABLELIST:
      return action.data ? action.data : state
    default:
      return state
  }
}

const deleteInfo = (state = [], action) => {
  switch (action.type) {
    case DELETEINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}

const searchInfo = (state = {
  payAccountNo: '1',
  productType: null,
  status: '100'
}, action) => {
  switch (action.type) {
    case UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

// const searchInfo = (state, action) => {
//   console.log(state)
//   console.log(action)
//   switch (action.type) {
//     case UPDATESEARCHINFO:
//       return Object.assign({}, state, action.value)
//     default:
//       return state
//   }
// }

const reducers = combineReducers({ accountNameList, tableList, searchInfo, deleteInfo })
injectReducer(reducers, 'quotaSettingManage')