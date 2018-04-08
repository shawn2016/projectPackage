import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { SMSL_GETTABLELIST, SMSL_GETTABLELISTS, SMSL_UPDATESEARCHINFO, SMSL_SETCURRENTPAGEONE } from './constants'

const SMSL_tableList = (state = {}, action) => {
  switch (action.type) {
    case SMSL_GETTABLELIST:
      return action.data ? action.data : state
    default:
      return state
  }
}

const SMSL_tableLists = (state = {}, action) => {
  switch (action.type) {
    case SMSL_GETTABLELISTS:
      return action.data ? action.data : state
    default:
      return state
  }
}

const SMSL_setCurrentTigger = (state = false, action) => {
  switch (action.type) {
    case SMSL_SETCURRENTPAGEONE:
      return !state
    default:
      return state
  }
}

const SMSL_searchInfo = (state = {
  createTimeFrom: null,
  createTimeTo: null,
  logType: null,
  createName: null,
  page: '1',
  rows: '10',
}, action) => {
  switch (action.type) {
    case SMSL_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

const reducers = combineReducers({ SMSL_tableList, SMSL_tableLists, SMSL_searchInfo, SMSL_setCurrentTigger })
injectReducer(reducers, 'SMSL_clientManage')