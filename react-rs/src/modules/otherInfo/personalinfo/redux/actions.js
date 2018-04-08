import { PIQY_GETDATA } from './constants'

export const PIQY_getData = () => ({
  callApi: {
    type: PIQY_GETDATA,
    path: '/curruser/getInfo',
    method: 'POST',
    params: {}
  }
})