import { combineReducers } from 'redux'
import { injectReducer } from 'reduxes/reducers'
import { reducerFactory1 } from 'utils/utils'
import {
  ACTIVATECOMPANY_SAVECOMPANYINFO,
  ACTIVATECOMPANY_GETCOMPANYSTATE
} from './constants'

const saveActivateCompanyInfo = reducerFactory1(ACTIVATECOMPANY_SAVECOMPANYINFO, {}) // 保存激活账户信息
const getActivateCompanyState = reducerFactory1(ACTIVATECOMPANY_GETCOMPANYSTATE, {
  body: {
    state: null
  }
}) // 获取激活账户状态

injectReducer(combineReducers({
  aAC_activateCompanyInfo: saveActivateCompanyInfo,
  aAC_activateCompanyState: getActivateCompanyState
}), 'aAC_activateCompanyState')