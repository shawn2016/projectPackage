import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GSAE_GETAPPLICATIONLIST, GSAE_ADDAPPLICATIONINFO, GSAE_DELAPPLICATIONINFO } from './constants'
/* 获取用途数据列表数据 */
const applicationEditor = (state = {}, action) => {
  switch (action.type) {
    case GSAE_GETAPPLICATIONLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
/* 增加用途 */
const addApplicationEditor = (state = {}, action) => {
  switch (action.type) {
    case GSAE_ADDAPPLICATIONINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}
/* 删除用途 */
const delApplicationEditor = (state = {}, action) => {
  switch (action.type) {
    case GSAE_DELAPPLICATIONINFO:
      return action.data ? action.data : state
    default:
      return state
  }
}

const reducerList = combineReducers({ applicationEditor, addApplicationEditor, delApplicationEditor })
injectReducer(reducerList, 'applicationEditor')