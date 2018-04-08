import { SUBMITFORM } from './constants'

export const submitForm = () => ({
  callApi: {
    type: SUBMITFORM,
    path: '/modules/otherInfo/notice/mockData/msgList.json',
    method: 'GET',
    params: {}
  }
})