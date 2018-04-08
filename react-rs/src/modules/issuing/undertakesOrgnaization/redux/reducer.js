import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETUNDERTAKESORGPAYERLIST, UPDATEUNDERTAKESORGORDERINFO, GETUNDERTAKESORGBIZRULELIST, GETUNDERTAKESORGPURPOSELIST } from './constants'

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
    case GETUNDERTAKESORGPAYERLIST:
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
    case UPDATEUNDERTAKESORGORDERINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

const bizRuleList = (state = [], action) => {
  switch (action.type) {
    case GETUNDERTAKESORGBIZRULELIST:
      return action.data.body ? _formatList(action.data.body, 'ruleName', 'ruleCode') : []
    default:
      return state
  }
}

const purPoseList = (state = [], action) => {
  switch (action.type) {
    case GETUNDERTAKESORGPURPOSELIST:
      return action.data.body && action.data.body.unshift({ userType: '自定义', id: '' }) && _formatList(action.data.body, 'userType', 'id')
    default:
      return state
  }
}

const UndertakesOrgnaizationInfo = combineReducers({ payerlist, orderInfo, bizRuleList, purPoseList })
injectReducer(UndertakesOrgnaizationInfo, 'UndertakesOrgnaizationInfo')