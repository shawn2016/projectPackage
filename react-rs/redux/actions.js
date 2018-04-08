import { injectActions } from 'reduxes/actions'
import { ADD, SUBTRACT, RIDE, DIVIDE } from './constants'

export const add = () => ({
  type: ADD,
  value: 1
})

export const subtract = () => ({
  type: SUBTRACT,
  value: 1
})
export const ride = () => ({
  type: RIDE,
  value: 1
})

export const divide = () => ({
  type: DIVIDE,
  value: 1
})
let singleHanle = {
  add,
  subtract,
  ride,
  divide
}
injectActions(singleHanle)