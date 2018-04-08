import { GETBATCHHANDLEIMPORTINFO } from './constants'

/**
 * 获取EXCEL明细
 * 40.50.60
 */
export const getImportInfo = (params) => ({
  callApi: {
    type: GETBATCHHANDLEIMPORTINFO,
    path: `/payment/${params.model}/getImportInfo`,
    method: 'POST',
    param: params.data
  }
})