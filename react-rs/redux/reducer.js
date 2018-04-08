import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import { ADD, SUBTRACT, RIDE, DIVIDE } from './constants'

const singleHandle = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return state + action.value
    case SUBTRACT:
      return state - action.value
    case RIDE:
      return state * action.value
    case DIVIDE:
      return state / action.value
    default:
      return state
  }
}

const singleData = combineReducers({ singleHandle })
injectReducer(singleData, 'singleHandle')