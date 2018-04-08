import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { reducerFactory } from 'utils/utils'
import { RULEINFO } from './constants'

const ruleInfo = reducerFactory(RULEINFO, {})

const ruleDetails = combineReducers({ ruleInfo })
injectReducer(ruleDetails, 'ruleDetails')