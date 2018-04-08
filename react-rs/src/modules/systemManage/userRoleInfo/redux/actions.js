import { GETROLEMMENU, GETBIZRULEINFO } from './constants'

export const getRoleMenu = (params) => ({
  callApi: {
    type: GETROLEMMENU,
    path: '/user/getMenuRuleInfo',
    method: 'POST',
    param: params
  }
})
export const getBizRuleInfo = (params) => ({
  callApi: {
    type: GETBIZRULEINFO,
    path: '/user/getBizRuleInfo',
    method: 'POST',
    param: params
  }
})
