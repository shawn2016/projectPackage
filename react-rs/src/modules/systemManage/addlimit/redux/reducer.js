import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { DESP_GETACCOUNTDATA, DESP_SUBMITFORM } from './constants'

const DESP_accountData = (state = {}, action) => {
  switch (action.type) {
    case DESP_GETACCOUNTDATA:
      console.log(action)
      return action.data ? action.data : state
    default:
      return state
  }
}
const DESP_submitForm = (state = {}, action) => {
  switch (action.type) {
    case DESP_SUBMITFORM:
      return action.data ? action.data : state
    default:
      return state
  }
}
const accountDataList = combineReducers({
  DESP_accountData,
  DESP_submitForm
})
injectReducer(accountDataList, 'DESP_accountDataQuery')