import { GETRULEMANAGERBUSSINESSSTATUS, GETRULEMANAGERDATALIST } from './constants'
/**
 * 获取查询条件json
 * 目前定义在reducer中
 */
export const updateBussinessStatus = val => ({
  type: GETRULEMANAGERBUSSINESSSTATUS,
  data: val
})
/* 获取列表数据 */
export const getRuleManagerDataList = params => ({
  callApi: {
    type: GETRULEMANAGERDATALIST,
    path: '/rule/getList',
    method: 'POST',
    param: params
  }
})