'use strict'

const express = require('express')

const { logError, logWarning, logInfo, logDebug } = require('./src/logger.js')

logInfo('Initializing Server')

const PORT = process.env.PORT || 3000
!process.env.PORT && logWarning(`Environment variable 'PORT' is not set, using port ${PORT}`)

// Initialize API
const keyValueStoreApp = express()
keyValueStoreApp.use(express.json())
logDebug('Connecting redis store')
const redisStore = require('./src/redis.js')

const {
  getKeyFromStoreHandler,
  addKeyToStoreHandler,
  deleteKeyFromStoreHandler,
  updateKeyInStoreHandler
} = require('./src/KVStoreHandlers.js')

logDebug('Registering handler: getKeyFromStoreHandler to GET /:key')
keyValueStoreApp.get('/:key', getKeyFromStoreHandler(redisStore))

logDebug('Registering handler: addKeyToStoreHandler to POST /:key')
keyValueStoreApp.post('/:key', addKeyToStoreHandler(redisStore))

logDebug('Registering handler: deleteKeyFromStoreHandler to DELETE /:key')
keyValueStoreApp.delete('/:key', deleteKeyFromStoreHandler(redisStore))

logDebug('Registering handler: updateKeyInStoreHandler to PUT /:key')
keyValueStoreApp.put('/:key', updateKeyInStoreHandler(redisStore))


logDebug('All handlers registered, starting server...')
keyValueStoreApp.listen(PORT, (asdf) => {
  logInfo(`Server started on port ${PORT}`)
})

process.on('uncaughtException', err => {
  logError(err)
})
