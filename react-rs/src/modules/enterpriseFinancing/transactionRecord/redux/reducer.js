import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { EFTR_GETTABLELIST, EFTR_GETTABLELISTS, EFTR_UPDATESEARCHINFO, EFTR_SETCURRENTPAGEONE } from './constants'

const EFTR_tableList = (state = {}, action) => {
  switch (action.type) {
    case EFTR_GETTABLELIST:
      return action.data ? action.data : state
    default:
      return state
  }
}

const EFTR_tableLists = (state = {}, action) => {
  switch (action.type) {
    case EFTR_GETTABLELISTS:
      return action.data ? action.data : state
    default:
      return state
  }
}

const EFTR_setCurrentTigger = (state = false, action) => {
  switch (action.type) {
    case EFTR_SETCURRENTPAGEONE:
      return !state
    default:
      return state
  }
}

const EFTR_searchInfo = (state = {
  createTimeFrom: null,
  createTimeTo: null,
  transferType: null,
  pageNo: '1',
  rows: '10',
}, action) => {
  switch (action.type) {
    case EFTR_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

const reducers = combineReducers({ EFTR_tableList, EFTR_tableLists, EFTR_searchInfo, EFTR_setCurrentTigger })
injectReducer(reducers, 'EFTR_clientManage')