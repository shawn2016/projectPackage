import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { FSD_GETCHARGEDETAL, FSD_EXPORTRECORD } from './constants'

const FSD_singleHandle = (state = { body: {} }, action) => {
  switch (action.type) {
    case FSD_GETCHARGEDETAL:
      return action.data ? action.data : state
    default:
      return state
  }
}
let preAccountList = (arr) => {
  /*let curArr = []
  for (let i = 0; i < arr.length; i++) {
    let curObj = {}
    if (arr[i].accountName === null) {
      curObj.text = ''
    } else {
      curObj.text = arr[i].accountName
    }
    curObj.value = arr[i].accountName
    //curObj={'text':'aaa','value':'ss'}
    curArr.push(curObj)
  }
  return curArr*/
  console.log(arr)
}
const FSD_exportRecord = (state = {}, action) => {
  switch (action.type) {
    case FSD_EXPORTRECORD:
      return action.data ? preAccountList(action.data) : state
    default:
      return state
  }
}
const searchChargeQuery = combineReducers({ FSD_singleHandle, FSD_exportRecord })
injectReducer(searchChargeQuery, 'FSD_chargeQueryData')
//injectReducer(singleHandle, 'chargeDetail')