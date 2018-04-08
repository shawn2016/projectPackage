import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { PADGETPULICACCOUNT } from './constants'

const padpublicAccountData = (state = {}, action) => {
  switch (action.type) {
    case PADGETPULICACCOUNT:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const reducerList = combineReducers({ padpublicAccountData })
injectReducer(reducerList, 'padpublicAccountDataQuery')