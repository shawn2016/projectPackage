import { FBQ_GETLIST } from './constants'
export const FBQ_getList = () => ({
  callApi: {
    type: FBQ_GETLIST,
    path: '/account/balance/getList',
    method: 'POST',
  }
})