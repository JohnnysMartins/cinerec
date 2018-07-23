const { EventEmitter } = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/')
const mediator = new EventEmitter()

console.log('--- Movies Service ---')
console.log('Connecting to movies repository...')

process.on('uncaughtException', err => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

mediator.on('db.ready', async db => {
  try {
    let repo = await repository.connect(db)
    console.log('Connected. Starting Server')
    const app = await server.start({
      port: config.serverSettings.port,
      repo
    })
    console.log(
      `Server started succesfully, running on port: ${
        config.serverSettings.port
      }.`
    )
    app.on('close', () => {
      rep.disconnect()
    })
  } catch (error) {
    console.error(error)
  }
})

mediator.on('db.error', err => {
  console.error(err)
})

config.db.connect(mediator)

mediator.emit('boot.ready')
