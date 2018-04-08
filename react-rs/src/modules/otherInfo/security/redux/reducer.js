import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETDATA } from './constants'

const personalInfoData = (state = {}, action) => {
  switch (action.type) {
    case GETDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
const personalInfo = combineReducers({ personalInfoData })
injectReducer(personalInfo, 'personalInfoQuery')