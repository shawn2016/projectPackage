import { GETDATA, ADDUSER, GETUSERCODE, GETUSERINFO } from './constants'

export const getData = (params) => ({
  callApi: {
    type: GETDATA,
    path: '/modules/systemManage/userManage/mockData/data999.json',
    method: 'GET',
    param: params
  }
})
export const updateUserInfo = item => ({
  type: ADDUSER,
  value: item
})
export const getUserCode = (params) => ({
  callApi: {
    type: GETUSERCODE,
    path: '/user/getUserCode',
    method: 'POST',
    param: params
  }
})
export const getUserInfo2 = (params) => ({
  callApi: {
    type: GETUSERINFO,
    path: '/user/getInfo',
    method: 'POST',
    param: params
  }
})