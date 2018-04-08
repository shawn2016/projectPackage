import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { WDAW_GETACCOUNTDATA, WDAW_SUBMITFORM, WDAW_GETLISTGONG } from './constants'

const WDAW_accountData = (state = {}, action) => {
  switch (action.type) {
    case WDAW_GETACCOUNTDATA:
      console.log(action)
      return action.data ? action.data : state
    default:
      return state
  }
}
const WDAW_submitForm = (state = {}, action) => {
  switch (action.type) {
    case WDAW_SUBMITFORM:
      return action.data ? action.data : state
    default:
      return state
  }
}
const WDAW_getListGong = (state = {}, action) => {
  switch (action.type) {
    case WDAW_GETLISTGONG:
      return action.data ? action.data : state
    default:
      return state
  }
}
const accountDataList = combineReducers({
  WDAW_accountData,
  WDAW_submitForm,
  WDAW_getListGong
})
injectReducer(accountDataList, 'WDAW_accountDataQuery')

