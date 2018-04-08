import { DESP_SUBMITFORM } from './constants'

export const DESP_submitForm = (param) => ({
  callApi: {
    type: DESP_SUBMITFORM,
    path: '/fund/operateRiskEvaluation',
    method: 'POST',
    param
  }
})