import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETBATCHHANDLEIMPORTINFO } from './constants'

const importInfo = (state = {}, action) => {
  switch (action.type) {
    case GETBATCHHANDLEIMPORTINFO:
      return action.data.body ? action.data.body : state
    default:
      return state
  }
}
const batchHandleExcelDetail = combineReducers({ importInfo })
injectReducer(batchHandleExcelDetail, 'batchHandleExcelDetail')