// import http from 'http'
// import Koa from 'koa'
// import middlewareRegister from './middlewareRegister'
// import config from './common/config'

// const app = new Koa()
// app.env = 'production'
// middlewareRegister(app)
// const server = http.createServer(app.callback())
// server.listen(config.port, () => {
//   console.log('App started, bind port %d, CTRL + C to terminate', config.port)
// })


import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import configureStore from '../src/reduxes/store'
configureStore()
const App = require('../src/routers/router.js')


createServer((req, res) => {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `)
    res.end()
  }
}).listen(3000)