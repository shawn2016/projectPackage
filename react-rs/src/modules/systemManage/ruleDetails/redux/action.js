import { SMRD_RULEINFO, SMRD_RULEFLOWINFO } from './constants'
/**
 * 获取自定义规则详情
 * @param {*} params 接口入参
 */
export const getRuleInfo = params => ({
  callApi: {
    type: SMRD_RULEINFO,
    path: '/rule/getInfo',
    method: 'POST',
    param: params
  }
})
/**
 * 获取审批（业务）流程
 * @param {*} params 接口入参
 */
export const getRuleFlowInfo = params => ({
  callApi: {
    type: SMRD_RULEFLOWINFO,
    path: '/rule/getFlowList',
    method: 'POST',
    param: params
  }
})

