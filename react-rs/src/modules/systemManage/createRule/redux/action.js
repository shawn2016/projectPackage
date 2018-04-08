import { SMCR_ACCOUNTLIST, SMCR_ACCFLOWLIST, SMCR_USERLIST, SMCR_CREATERESULT, SMCR_FLOWGROUPINFO, SMCR_GETRULEINFO } from './constants'
/**
 * 获取钱包账户列表
 * 70.20.90
 */
export const SMCR_getAccountList = params => ({
  callApi: {
    type: SMCR_ACCOUNTLIST,
    path: '/companyAcc/getAccList',
    method: 'POST',
    param: params
  }
})
/**
 * 获取审批流程列表
 * 70.40.90
 */
export const SMCR_getAccFlowList = params => ({
  callApi: {
    type: SMCR_ACCFLOWLIST,
    path: '/act/getActList',
    method: 'POST',
    param: params
  }
})
/**
 * 获取流程组信息
 * 70.40.90
 */
export const SMCR_getFlowGroupInfo = params => ({
  callApi: {
    type: SMCR_FLOWGROUPINFO,
    path: '/act/getActFlowInfo',
    method: 'POST',
    param: params
  }
})
/**
 * 获取经办人列表
 * 70.40.60
 */
export const SMCR_getUserList = params => ({
  callApi: {
    type: SMCR_USERLIST,
    path: '/rule/getUserList',
    method: 'POST',
    param: params
  }
})
/**
 * 创建规则
 * 70.40.32
 */
export const SMCR_createRule = params => ({
  callApi: {
    type: SMCR_CREATERESULT,
    path: '/rule/saveInfo',
    method: 'POST',
    param: params
  }
})
/**
 * 获取业务规则信息
 * 70.40.39
 */
export const SMCR_getRuleInfo = params => ({
  callApi: {
    type: SMCR_GETRULEINFO,
    path: '/rule/getInfo',
    method: 'POST',
    param: params
  }
})