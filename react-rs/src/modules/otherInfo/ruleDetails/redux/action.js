import { RULEINFO } from './constants'
/**
 * 获取自定义规则详情
 * @param {*} params 接口入参
 */
export const getRuleInfo = params => ({
  callApi: {
    type: RULEINFO,
    path: '/rule/getInfo',
    method: 'POST',
    param: params
  }
})

