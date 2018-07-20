const MongoClient = require('mongodb')

const connect = mediator => {
  mediator.once('boot.ready', () => {
    MongoClient.connect('mongodb://localhost:27017', (err, db) => {
        if (err) {
          mediator.emit('db.error', err)
        }
        mediator.emit('db.ready', db)
      }
    )
  })
}

module.exports = Object.assign({}, { connect })
