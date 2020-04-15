const express = require('express');
var reload = require('express-reload')
const next = require('next');
const apiRouter = require('./api');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express()

  // the path to the api router file
  const apiPath = `${__dirname}/api/`

  // hot reloading of the api
  server.use(reload(apiPath));

  // attach the api router
  server.use('/api', apiRouter);

  // let next.js handle any unhandled routes (and serve the app)
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('👂 listening on 3000');
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
