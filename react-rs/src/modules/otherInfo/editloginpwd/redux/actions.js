import { OIEP_SUBMITFORM } from './constants'

export const OIEP_submitForm = (param) => ({
  callApi: {
    type: OIEP_SUBMITFORM,
    path: '/curruser/modifyLoginPwd',
    method: 'POST',
    param
  }
})