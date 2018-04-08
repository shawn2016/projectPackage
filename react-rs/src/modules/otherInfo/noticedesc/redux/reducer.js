import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { OIND_GETDATA } from './constants'

const OIND_noticeDescData = (state = {}, action) => {
  switch (action.type) {
    case OIND_GETDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
const noticeDesc = combineReducers({ OIND_noticeDescData })
injectReducer(noticeDesc, 'OIND_noticeDescQuery')