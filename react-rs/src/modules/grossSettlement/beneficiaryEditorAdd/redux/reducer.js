import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { SAVEBENEFICIARYEDITORADDDATA, GETBENEFICIARYEDITORDATA } from './constants'
/* 保存用途编辑列表数据 */
const beneficiaryEditorAddData = (state = {}, action) => {
  switch (action.type) {
    case SAVEBENEFICIARYEDITORADDDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}
/* 获取用途编辑列表数据 */
const beneficiaryEditorData = (state = {
  body: {}
}, action) => {
  switch (action.type) {
    case GETBENEFICIARYEDITORDATA:
      return action.data ? action.data : state
    default:
      return state
  }
}

const reducerList = combineReducers({ beneficiaryEditorAddData, beneficiaryEditorData })
injectReducer(reducerList, 'beneficiaryEditorAdd')