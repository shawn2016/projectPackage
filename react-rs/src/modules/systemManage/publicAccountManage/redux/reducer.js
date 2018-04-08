import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { PAMGETACCOUNTLIST } from './constants'

const pamAccountListData = (state = { values: [], pagenation: {} }, action) => {
  switch (action.type) {
    case PAMGETACCOUNTLIST:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const reducerList = combineReducers({ pamAccountListData })
injectReducer(reducerList, 'pamAccountListDataQuery')