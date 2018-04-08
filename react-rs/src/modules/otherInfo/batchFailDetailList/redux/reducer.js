import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETFAILURELIST } from './constants'

const importInfo = (state = {}, action) => {
  switch (action.type) {
    case GETFAILURELIST:
      return action.data ? action.data : state
    default:
      return state
  }
}
const underakesExcelDetail = combineReducers({ importInfo })
injectReducer(underakesExcelDetail, 'failureDataList')