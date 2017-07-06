const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)
const express = require('express')
const namespace = require('express-namespace');

const handle = app.getRequestHandler()



// Without express.js
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://192.168.90.12:3000')
  })
})


// app.prepare()
//     .then(() => {
//         const server = express()
//         const router  = express.Router()
//
//
//         server.namespace('/myapp/', function() {
//             server.get('/', (req, res) => {
//                 return handle(req, res)
//             })
//         });
//
//
//         server.listen(3000, (err) => {
//             if (err) throw err
//             console.log('> Ready on http://localhost:3000')
//         })
//     })