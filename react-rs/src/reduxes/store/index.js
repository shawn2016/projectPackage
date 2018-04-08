import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import middleware from 'reduxes/middleware'

import reducers, { injectStore } from 'reduxes/reducers'


const finalCreateStore = compose(
  applyMiddleware(thunk, ...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)
let store

store = finalCreateStore(reducers)
store.subscribe(() => {
  console.log('[LOG--]', store.getState())
})
if (module.hot) {
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('reduxes/reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}
// 注入到reducer中
injectStore(store)
export default store