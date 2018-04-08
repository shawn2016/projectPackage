import { injectReducer } from 'reduxes/reducers'
// import { combineReducers } from 'redux'
import { FBQ_GETLIST } from './constants'

const FBQ_singleHandle = (state = { body: { accounts: [], pagenation: {} } }, action) => {
  switch (action.type) {
    case FBQ_GETLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
// const singleData = combineReducers({ singleHandle })
injectReducer(FBQ_singleHandle, 'FBQ_balanceQList')