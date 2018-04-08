import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETUSERINFO, GETUSERPROCESS } from './constants'

const userListData = (state = {}, action) => {
  switch (action.type) {
    case GETUSERINFO:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const userProcess = (state = [], action) => {
  switch (action.type) {
    case GETUSERPROCESS:
      return action.data ? action.data.body : state
    default:
      return state
  }
}


const reducerList = combineReducers({ userListData, userProcess })
injectReducer(reducerList, 'userInfoDataQuery')