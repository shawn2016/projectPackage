import { GETDETAILSDATA, GETFLOWINFO, COMMITINFO } from './constants'

export const getDetailsData = (obj) => {
  console.log('获取配置额度信息参数', obj)
  return {
    callApi: {
      type: GETDETAILSDATA,
      path: '/modules/systemManage/check/mockData/detail.json',
      method: 'GET',
      params: obj
    }
  }
}

export const getFlowInfo = (obj) => {
  console.log('获取审批流程列表参数', obj)
  return {
    callApi: {
      type: GETFLOWINFO,
      path: '/modules/systemManage/check/mockData/flowInfo.json',
      method: 'GET',
      params: obj
    }
  }
}

export const commitInfo = (obj) => {
  console.log('获取配置额度信息', obj)
  return {
    callApi: {
      type: COMMITINFO,
      path: '/modules/systemManage/check/mockData/flowInfo.json',
      method: 'GET',
      params: obj
    }
  }
}