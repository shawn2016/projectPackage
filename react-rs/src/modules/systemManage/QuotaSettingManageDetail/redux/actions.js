import { getAccountListType, sendDataType } from './constants'

export const getAccountList = (obj) => ({
  callApi: {
    type: getAccountListType,
    path: '/modules/systemManage/QuotaSettingManageDetail/mockData/json.json',
    method: 'GET',
    params: obj
  }
})

// export const sendData = (obj) => ({
//   callApi: {
//     type: sendDataType,
//     path: '/modules/systemManage/QuotaSettingManageDetail/mockData/json.json',
//     method: 'GET',
//     params: obj
//   }
// })

export const sendData = (obj) => {
  console.log('发送数据参数', obj)
  return {
    callApi: {
      type: sendDataType,
      path: '/modules/systemManage/QuotaSettingManageDetail/mockData/json.json',
      method: 'GET',
      params: obj
    }
  }
}