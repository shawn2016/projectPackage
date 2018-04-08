import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETENTERPRISEACCOUNTDATA, SUBMITENTERPRISEFORM, GETENTERPRISESTATUS } from './constants'

const accountData = (state = {}, action) => {
  switch (action.type) {
    case GETENTERPRISEACCOUNTDATA:
      console.log(action)
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const submitForm = (state = {}, action) => {
  switch (action.type) {
    case SUBMITENTERPRISEFORM:
      return action.data ? action.data : state
    default:
      return state
  }
}
const enterpriseStatus = (state = {}, action) => {
  switch (action.type) {
    case GETENTERPRISESTATUS:
      return action.data ? action.data : state
    default:
      return state
  }
}
const accountDataList = combineReducers({
  accountData,
  submitForm,
  enterpriseStatus
})
injectReducer(accountDataList, 'enterpriseDeposit')

