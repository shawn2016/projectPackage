import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETBENEFICIARYEDITORLIST, BENEFICIARYEDITORSEARCH, CLEARBENEFICIARYEDITORSEARCH, DELBENEFICIARYEDITOR } from './constants'
/* 获取收款方列表数据 */
const beneficiaryEditorData = (state = {
  body: {
    pagenation: {},
    values: []
  }
}, action) => {
  switch (action.type) {
    case GETBENEFICIARYEDITORLIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
/* 修改查询参数 */
const beneficiaryEditorSearch = (state = {}, action) => {
  switch (action.type) {
    case BENEFICIARYEDITORSEARCH:
      return Object.assign({}, state, action.value)
    case CLEARBENEFICIARYEDITORSEARCH:
      return {}
    default:
      return state
  }
}
/* 删除收款方列表数据 */
const delBeneficiaryEditor = (state = {
  code: '',
  message: ''
}, action) => {
  switch (action.type) {
    case DELBENEFICIARYEDITOR:
      return action.data ? action.data : state
    default:
      return state
  }
}

const reducerList = combineReducers({ beneficiaryEditorData, beneficiaryEditorSearch, delBeneficiaryEditor })
injectReducer(reducerList, 'beneficiaryEditor')