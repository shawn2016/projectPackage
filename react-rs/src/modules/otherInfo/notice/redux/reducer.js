import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { OIOT_GETDATA } from './constants'

const OIOT_noticeData = (state = {}, action) => {
  switch (action.type) {
    case OIOT_GETDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
const noticeList = combineReducers({ OIOT_noticeData })
injectReducer(noticeList, 'OIOT_noticeQuery')