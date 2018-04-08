import { GETCHARGEDETAL } from './constants'
export const getInfo = (paramS) => ({
  callApi: {
    type: GETCHARGEDETAL,
    path: '/account/charge/getInfo',
    method: 'POST',
    param: paramS
  }
})