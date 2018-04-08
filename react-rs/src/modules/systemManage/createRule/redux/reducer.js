import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { reducerFactory, reducerFactory1 } from 'utils/utils'
import { SMCR_ACCOUNTLIST, SMCR_ACCFLOWLIST, SMCR_USERLIST, SMCR_CREATERESULT, SMCR_FLOWGROUPINFO, SMCR_GETRULEINFO } from './constants'
const _formatList = (data, textKey, valueKey) => {
  let resList = []
  if (data) {
    data.forEach((item, index) => {
      resList.push(item)
      resList[index].text = item[textKey]
      resList[index].value = item[valueKey]
    })
  }
  return resList
}

const accountList = (state = [], action) => {
  switch (action.type) {
    case SMCR_ACCOUNTLIST:
      if (action.data && action.data.body) {
        action.data.body[0].showAccountName = action.data.body[0].accountName + ' ' + action.data.body[0].umbrellaAccountNo // eslint-disable-line
        return _formatList(action.data.body, 'showAccountName', 'id')
      }
      return action.data ? action.data : state
    default:
      return state
  }
}
const accFlowList = (state = [], action) => {
  switch (action.type) {
    case SMCR_ACCFLOWLIST:
      return action.data.body && _formatList(action.data.body, 'refProcName', 'refProcKey')
    default:
      return state
  }
}
const flowGroupInfo = reducerFactory(SMCR_FLOWGROUPINFO, {})
const userList = (state = [], action) => {
  switch (action.type) {
    case SMCR_USERLIST:
      return action.data.body || []
    default:
      return state
  }
}
const createResult = reducerFactory1(SMCR_CREATERESULT, {})
const ruleInfo = (state = {}, action) => {
  switch (action.type) {
    case SMCR_GETRULEINFO:
      return action.data.body || {}
    default:
      return state
  }
}

const createRuleInfo = combineReducers({ accountList, accFlowList, flowGroupInfo, userList, createResult, ruleInfo })
injectReducer(createRuleInfo, 'SMCR_createRuleInfo')
