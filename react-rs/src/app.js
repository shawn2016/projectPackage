import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from 'reduxes/store'
import router from 'routers'
import './assets/styles/robotUI.css'
import './assets/styles/main.css'
import './assets/styles/demo.css'
const rootElement = document.querySelector('#app')
const renders = Component =>
  render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootElement
)
if (module.hot) {
  module.hot.accept('./routers/index.js', renders(router))
}
renders(router)