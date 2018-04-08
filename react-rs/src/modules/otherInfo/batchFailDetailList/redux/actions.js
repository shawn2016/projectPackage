import { GETFAILURELIST } from './constants'

/**
 * 获取EXCEL明细
 * 40.50.60
 */
export const getImportInfo = (params) => ({
  callApi: {
    type: GETFAILURELIST,
    path: `payment/${params.from}/get${params.type}FailureList`,
    method: 'POST',
    param: { failureList: params.list }
  }
})