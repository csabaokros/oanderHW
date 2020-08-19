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

// Register handlers for / endpoint

keyValueStoreApp.get('/:key', getKeyFromStoreHandler(redisStore))
keyValueStoreApp.post('/:key', addKeyToStoreHandler(redisStore))
keyValueStoreApp.delete('/:key', deleteKeyFromStoreHandler(redisStore))
keyValueStoreApp.put('/:key', updateKeyInStoreHandler(redisStore))

logDebug('All handlers registered, starting server...')
keyValueStoreApp.listen(PORT, (asdf) => {
  !redisStore.connected && logWarning('App is listening, but Redis is not connected, yet')
  logInfo(`Server started on port ${PORT}`)
})

process.on('uncaughtException', err => {
  logError(err)
})
