import { GSAE_GETAPPLICATIONLIST, GSAE_ADDAPPLICATIONINFO, GSAE_DELAPPLICATIONINFO } from './constants'
/* 获取用途编辑列表数据 */
export const getApplicationEditorData = (params) => ({
  callApi: {
    type: GSAE_GETAPPLICATIONLIST,
    path: '/purpose/getList',
    method: 'POST',
    param: params
  }
})
/* 添加用途 */
export const addApplicationEditorData = (params) => ({
  callApi: {
    type: GSAE_ADDAPPLICATIONINFO,
    path: '/purpose/saveInfo',
    method: 'POST',
    param: params
  }
})
/* 删除用途 */
export const delApplicationEditorData = (id) => ({
  callApi: {
    type: GSAE_DELAPPLICATIONINFO,
    path: '/purpose/delInfo',
    method: 'POST',
    param: id
  }
})