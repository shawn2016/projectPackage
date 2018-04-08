import { FSD_GETCHARGEDETAL } from './constants'
export const FSD_getInfo = (params) => ({
  callApi: {
    type: FSD_GETCHARGEDETAL,
    path: '/posqr/getInfo',
    method: 'POST',
    param: params
  }
})