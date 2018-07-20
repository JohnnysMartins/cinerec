const { serverSettings } = require('./config')
const db = require('./mongo')

module.exports = Object.assign({}, { serverSettings, db })