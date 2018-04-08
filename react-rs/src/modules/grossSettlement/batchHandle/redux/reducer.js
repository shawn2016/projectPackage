import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETBATCHHANDLEPAYERLIST, UPDATEBATCHHANDLEORDERINFO, GETBATCHHANDLEBIZRULELIST } from './constants'

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
const payerlist = (state = [], action) => {
  switch (action.type) {
    case GETBATCHHANDLEPAYERLIST:
      if (action.data.body) {
        action.data.body.accounts[0].showAccountName = action.data.body.accounts[0].umbrellaAccountNo // eslint-disable-line
        return _formatList(action.data.body.accounts, 'showAccountName', 'umbrellaAccountNo')
      }
      return action.data ? action.data : state
    default:
      return state
  }
}

const orderInfo = (state = {}, action) => {
  switch (action.type) {
    case UPDATEBATCHHANDLEORDERINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

const bizRuleList = (state = [], action) => {
  switch (action.type) {
    case GETBATCHHANDLEBIZRULELIST:
      return action.data.body ? _formatList(action.data.body, 'ruleName', 'ruleCode') : []
    default:
      return state
  }
}

const BatchHandleInfo = combineReducers({ payerlist, orderInfo, bizRuleList })
injectReducer(BatchHandleInfo, 'BatchHandleInfo')