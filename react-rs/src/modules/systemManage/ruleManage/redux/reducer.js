import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { GETRULEMANAGERBUSSINESSSTATUS, GETRULEMANAGERDATALIST } from './constants'

/**
 * 当前筛选条件
 * @param {*} state
 * @param {*} action
 */
const bussinessStatus = (state = {}, action) => {
  switch (action.type) {
    case GETRULEMANAGERBUSSINESSSTATUS:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}
/* 复核通过 */
const ruleManagerDataList = (state = {
  pagenation: {},
  values: []
}, action) => {
  switch (action.type) {
    case GETRULEMANAGERDATALIST:
      console.log(action.data)
      return action.data.body || {}
    default:
      return state
  }
}
const ruleManage = combineReducers({ bussinessStatus, ruleManagerDataList })
injectReducer(ruleManage, 'ruleManage')