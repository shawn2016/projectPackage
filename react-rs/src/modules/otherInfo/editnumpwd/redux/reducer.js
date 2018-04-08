import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { SUBMITFORM } from './constants'

const submitFormData = (state = {}, action) => {
  switch (action.type) {
    case SUBMITFORM:
      return action.data ? action.data : state
    default:
      return state
  }
}
const submitFormList = combineReducers({ submitFormData })
injectReducer(submitFormList, 'EditNumPwdQuery')