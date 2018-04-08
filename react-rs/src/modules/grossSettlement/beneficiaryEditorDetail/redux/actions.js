import { GETBENEFICIARYEDITORDETAILLIST } from './constants'
/* 获取用途编辑列表数据 */
export const getBeneficiaryEditorDetailData = (id) => ({
  callApi: {
    type: GETBENEFICIARYEDITORDETAILLIST,
    path: '/payee/getInfo',
    method: 'POST',
    param: id
  }
})