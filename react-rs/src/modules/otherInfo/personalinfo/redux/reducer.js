import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { PIQY_GETDATA } from './constants'

const PIQY_personalInfoData = (state = {}, action) => {
  switch (action.type) {
    case PIQY_GETDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
const personalInfo = combineReducers({ PIQY_personalInfoData })
injectReducer(personalInfo, 'PIQY_personalInfoQuery')