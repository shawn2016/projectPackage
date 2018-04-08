import { injectReducer } from 'reduxes/reducers'
import { GETCHARGEDETAL } from './constants'

const singleHandle = (state = { body: {} }, action) => {
  switch (action.type) {
    case GETCHARGEDETAL:
      return action.data ? action.data : state
    default:
      return state
  }
}
injectReducer(singleHandle, 'chargeDetail')