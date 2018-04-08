import { HELN_SEBMITFORMS, HELN_GETNAMEANDTEL } from './constants'
export const sebmitFormsData = (params) => ({
  callApi: {
    type: HELN_SEBMITFORMS,
    path: '/loans/saveApplication',
    method: 'POST',
    param: params
  }
})

export const getNameAndTelData = () => ({
  callApi: {
    type: HELN_GETNAMEANDTEL,
    path: '/curruser/getInfo',
    method: 'POST'
  }
})