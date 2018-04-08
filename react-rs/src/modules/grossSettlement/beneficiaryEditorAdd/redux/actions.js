import { SAVEBENEFICIARYEDITORADDDATA, GETBENEFICIARYEDITORDATA } from './constants'
/* 保存用途编辑列表数据 */
export const saveBeneficiaryEditorAddData = (params) => ({
  callApi: {
    type: SAVEBENEFICIARYEDITORADDDATA,
    path: '/payee/saveInfo',
    method: 'POST',
    param: params
  }
})
/* 获取用途编辑列表数据 */
export const getBeneficiaryEditorData = (id) => ({
  callApi: {
    type: GETBENEFICIARYEDITORDATA,
    path: '/payee/getInfo',
    method: 'POST',
    param: id
  }
})