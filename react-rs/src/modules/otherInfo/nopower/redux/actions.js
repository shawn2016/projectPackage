import { GETDATA } from './constants'

export const getData = () => ({
  callApi: {
    type: GETDATA,
    path: '/modules/otherInfo/personalinfo/mockData/msgList.json',
    method: 'GET',
    params: {}
  }
})