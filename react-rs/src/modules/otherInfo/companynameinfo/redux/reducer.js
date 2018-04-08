import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { OICI_GETDATA } from './constants'

const OICI_personalInfoData = (state = {}, action) => {
  switch (action.type) {
    case OICI_GETDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
const personalInfo = combineReducers({ OICI_personalInfoData })
injectReducer(personalInfo, 'OICI_personalInfoQuery')