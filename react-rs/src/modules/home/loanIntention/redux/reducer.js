import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { HELN_SEBMITFORMS, HELN_GETNAMEANDTEL } from './constants'

const sebmitForms = (state = {}, action) => {
  switch (action.type) {
    case HELN_SEBMITFORMS:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const getNameAndTel = (state = {}, action) => {
  switch (action.type) {
    case HELN_GETNAMEANDTEL:
      return action.data ? action.data.body : state
    default:
      return state
  }
}
const sebmitformskey = combineReducers({ sebmitForms, getNameAndTel })
injectReducer(sebmitformskey, 'HELN_sebmitformvalue')