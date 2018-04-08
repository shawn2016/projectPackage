import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETBENEFICIARYEDITORDETAILLIST } from './constants'
/* 获取用途编辑列表数据 */
const beneficiaryEditorDetailData = (state = {
  body: {}
}, action) => {
  switch (action.type) {
    case GETBENEFICIARYEDITORDETAILLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}

const reducerList = combineReducers({ beneficiaryEditorDetailData })
injectReducer(reducerList, 'beneficiaryEditorDetail')