import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GSSH_PAYERLIST, GSSH_ORDERINFO, GSSH_ACCBALANCEINFO, GSSH_BIZRULELIST, GSSH_BIZTYPELIST, GSSH_PURPOSELIST, GSSH_PAYEELIST } from './constants'

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
    case GSSH_PAYERLIST:
      if (action.data.body) {
        action.data.body.accounts[0].showAccountName = action.data.body.accounts[0].umbrellaAccountNo // eslint-disable-line
        return _formatList(action.data.body.accounts, 'showAccountName', 'umbrellaAccountNo')
      }
      return action.data ? action.data : state
    default:
      return state
  }
}

const orderInfo = (state = { autosave: 0, oprBizType: '201000' }, action) => {
  switch (action.type) {
    case GSSH_ORDERINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}

const accBalanceInfo = (state = {}, action) => {
  switch (action.type) {
    case GSSH_ACCBALANCEINFO:
      return action.data ? action.data.body : state
    default:
      return state
  }
}

const bizRuleList = (state = [], action) => {
  switch (action.type) {
    case GSSH_BIZRULELIST:
      return action.data.body ? _formatList(action.data.body, 'ruleName', 'ruleCode') : []
    default:
      return state
  }
}
const bizTypeList = (state = [{ text: '转账', value: '100' }], action) => {
  switch (action.type) {
    case GSSH_BIZTYPELIST:
      return action.data ? action.data : state
    default:
      return state
  }
}

const purPoseList = (state = [], action) => {
  switch (action.type) {
    case GSSH_PURPOSELIST:
      return action.data.body && action.data.body.unshift({ userType: '自定义', id: '' }) && _formatList(action.data.body, 'userType', 'id')
    default:
      return state
  }
}

const payeeList = (state = {
  body: {
    pagenation: {},
    values: []
  }
}, action) => {
  switch (action.type) {
    case GSSH_PAYEELIST:
      return action.data ? action.data.body : state
    default:
      return state
  }
}

const singleHandleInfo = combineReducers({ payerlist, orderInfo, accBalanceInfo, bizRuleList, bizTypeList, purPoseList, payeeList })
injectReducer(singleHandleInfo, 'singleHandleInfo')