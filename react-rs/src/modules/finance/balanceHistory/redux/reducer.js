import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { FBH_GETTABLELIST, FBH_UPDATESEARCHINFO, FBH_SETCURRENTPAGEONE } from './constants'

const FBH_tableList = (state = {}, action) => {
  switch (action.type) {
    case FBH_GETTABLELIST:
      return action.data ? action.data : state
    default:
      return state
  }
}

const FBH_setCurrentTigger = (state = false, action) => {
  switch (action.type) {
    case FBH_SETCURRENTPAGEONE:
      return !state
    default:
      return state
  }
}

const FBH_searchInfo = (state = {
  createTimeFrom: null,
  createTimeTo: null,
  page: '1',
  rows: '10',
}, action) => {
  switch (action.type) {
    case FBH_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

const reducers = combineReducers({ FBH_tableList, FBH_searchInfo, FBH_setCurrentTigger })
injectReducer(reducers, 'FBH_clientManage')