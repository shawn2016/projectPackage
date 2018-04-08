import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { reducerFactory } from 'utils/utils'
import { SMRD_RULEINFO, SMRD_RULEFLOWINFO } from './constants'

const ruleInfo = reducerFactory(SMRD_RULEINFO, {})

const ruleFlowInfo = reducerFactory(SMRD_RULEFLOWINFO, [])


const ruleDetails = combineReducers({ ruleInfo, ruleFlowInfo })
injectReducer(ruleDetails, 'SMRD_ruleDetails')