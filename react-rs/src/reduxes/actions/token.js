import {
  SETTOKEN,
  CLEARTOEKN
} from 'reduxes/constants'

export const setToken = (token) => ({
  type: SETTOKEN,
  token
})
export const claerToekn = () => ({
  type: CLEARTOEKN
})