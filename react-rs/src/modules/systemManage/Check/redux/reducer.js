import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETDETAILSDATA, GETFLOWINFO, COMMITINFO } from './constants'

const detailInfo = (state = {
  body: {}
}, action) => {
  switch (action.type) {
    case GETDETAILSDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}

const flowInfo = (state = {}, action) => {
  switch (action.type) {
    case GETFLOWINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}

const callBackInfo = (state = {
  body: {}
}, action) => {
  switch (action.type) {
    case COMMITINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}

const reducers = combineReducers({ detailInfo, flowInfo, callBackInfo })
injectReducer(reducers, 'check')