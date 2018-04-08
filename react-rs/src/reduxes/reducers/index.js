/**
 * Created by Aceh on 2017/01/01.
 */
import { combineReducers } from 'redux'
import { clearToken, setToken } from './token'
import api from './api'

let obj = { api, clearToken, setToken },
  _store = null

let rootReducer = combineReducers(obj)

const createReducers = (reducers, key) => {
  let newReducer = {}
  newReducer[key] = reducers
  combineReducers(obj)
  obj = Object.assign(obj, newReducer)
  return combineReducers(obj)
}

export const injectReducer = (reducers, key) => {
  _store.replaceReducer(createReducers(reducers, key))
}

export const injectStore = store => _store = store

export default rootReducer
