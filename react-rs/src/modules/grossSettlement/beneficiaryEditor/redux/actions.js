import { GETBENEFICIARYEDITORLIST, BENEFICIARYEDITORSEARCH, CLEARBENEFICIARYEDITORSEARCH, DELBENEFICIARYEDITOR } from './constants'
/* 获取收款方编辑列表数据 */
export const getBeneficiaryEditorData = (params) => ({
  callApi: {
    type: GETBENEFICIARYEDITORLIST,
    path: '/payee/getList',
    method: 'POST',
    param: params
  }
})
/* 修改查询参数 */
export const beneficiaryEditorSearch = (params) => ({
  type: BENEFICIARYEDITORSEARCH,
  value: params
})
/* 清空查询参数 */
export const clearBeneficiaryEditorSearch = () => ({
  type: CLEARBENEFICIARYEDITORSEARCH
})
/* 删除收款方编辑列表数据 */
export const delBeneficiaryEditorData = (id) => ({
  callApi: {
    type: DELBENEFICIARYEDITOR,
    path: '/payee/delInfo',
    method: 'POST',
    param: id
  }
})