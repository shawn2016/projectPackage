import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { SENL_GETNOTIFICATIONINFO } from './constants'

const SENL_notificationData = (state = {}, action) => {
  switch (action.type) {
    case SENL_GETNOTIFICATIONINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}

const reducerList = combineReducers({ SENL_notificationData })
injectReducer(reducerList, 'SENL_notificationDataQuery')