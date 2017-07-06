const next = require('next')
const routes = require('./routes')
const app = next()
const handler = routes.getRequestHandler(app)

// Without express.js
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(4000, err => {
    if (err) throw err
    console.log('> Ready on http://192.168.90.12:4000')
  })
})
// app.prepare()
//     .then(() => {
//         const server = express()
//
//         server.get('/a', (req, res) => {
//             return app.render(req, res, '/', req.query)
//         })
//
//         server.listen(4000, (err) => {
//             if (err) throw err
//             console.log('> Ready on http://localhost:3000')
//         })
//     })