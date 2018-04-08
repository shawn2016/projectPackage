import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { HHGETCREDITLIMIT, HHGETREMAININGSUM, HHGETTODOINFO, HHGETRECENTLIST, HHGETLOGININFO } from './constants'
const hhhomeCreditlimit = (state = {}, action) => {
  switch (action.type) {
    case HHGETCREDITLIMIT:
      return action.data ? action.data.body : state
    default:
      return state
  }
}

const hhhomeRemainingsum = (state = {}, action) => {
  switch (action.type) {
    case HHGETREMAININGSUM:
      return action.data ? action.data.body : state
    default:
      return state
  }
}

const hhhomeTodoinfo = (state = {}, action) => {
  switch (action.type) {
    case HHGETTODOINFO:
      return action.data ? action.data.body : state
    default:
      return state
  }
}

const hhhomeRecentlist = (state = {}, action) => {
  switch (action.type) {
    case HHGETRECENTLIST:
      return action.data.body
    default:
      return state
  }
}

const hhhomeLoginInfo = (state = {}, action) => {
  switch (action.type) {
    case HHGETLOGININFO:
      return action.data.body
    default:
      return state
  }
}
const homeInfo = combineReducers({ hhhomeCreditlimit, hhhomeRemainingsum, hhhomeTodoinfo, hhhomeRecentlist, hhhomeLoginInfo })
injectReducer(homeInfo, 'hhhomeData')