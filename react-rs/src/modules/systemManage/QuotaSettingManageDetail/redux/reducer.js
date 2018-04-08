import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { getAccountListType, sendDataType } from './constants'

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

// const dataList = (state = [], action) => {
//   switch (action.type) {
//     case getAccountListType:
//       return accountNameListFilter(action.data.body)
//     default:
//       return state
//   }
// }

const dataList = (state = {}, action) => {
  switch (action.type) {
    case getAccountListType:
      return action.data ? action.data : state
    default:
      return state
  }
}

const sendData = (state = [], action) => {
  switch (action.type) {
    case sendDataType:
      return action.data ? action.data : state
    default:
      return state
  }
}


const reducers = combineReducers({ dataList, sendData })
injectReducer(reducers, 'reducers')