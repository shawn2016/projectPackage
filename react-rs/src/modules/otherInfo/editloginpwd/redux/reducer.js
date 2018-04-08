import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { OIEP_SUBMITFORM } from './constants'

const OIEP_submitFormData = (state = {}, action) => {
  switch (action.type) {
    case OIEP_SUBMITFORM:
      return action.data ? action.data : state
    default:
      return state
  }
}
const submitFormList = combineReducers({ OIEP_submitFormData })
injectReducer(submitFormList, 'OIEP_EditLoginPwdQuery')