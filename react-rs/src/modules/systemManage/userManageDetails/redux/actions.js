import { GETUSERINFO, GETUSERPROCESS } from './constants'

export const getUserInfo = (params) => ({
  callApi: {
    type: GETUSERINFO,
    path: '/user/getInfo',
    method: 'POST',
    param: params
  }
})
export const getUserProcess = (params) => ({
  callApi: {
    type: GETUSERPROCESS,
    path: '/user/getFlowRoleInfo',
    method: 'POST',
    param: params
  }
})