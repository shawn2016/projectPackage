import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETWITHDRAWACCOUNTDATA, SUBMITWITHDRAWFORM } from './constants'

const accountData = (state = {}, action) => {
  switch (action.type) {
    case GETWITHDRAWACCOUNTDATA:
      console.log(action)
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const submitForm = (state = {}, action) => {
  switch (action.type) {
    case SUBMITWITHDRAWFORM:
      return action.data ? action.data : state
    default:
      return state
  }
}
const accountDataList = combineReducers({
  accountData,
  submitForm
})
injectReducer(accountDataList, 'enterpriseWithdraw')

