'use strict'
const { promisify } = require('util')

const redis = require('redis')

const { logError, logWarning, logDebug } = require('./logger.js')

const host = process.env.REDIS_HOST || 'localhost'
const port = process.env.REDIS_PORT || 6379

!process.env.REDIS_HOST && logWarning(`Environment 'REDIS_HOST' variable not set, using '${host}'`)
!process.env.REDIS_PORT && logWarning(`Environment 'REDIS_PORT' variable not set, using port ${port}`)

logDebug(`Connecting to redis using '${host}:${port}'`)
const redisClient = redis.createClient({ host, port })

redisClient.on('error', error => {
  logError(error)
})

redisClient.on('ready', () => {
  logDebug(`Redis connection established on '${host}:${port}'`)
})

module.exports = {
  getAsync: promisify(redisClient.get).bind(redisClient),
  setAsync: promisify(redisClient.set).bind(redisClient),
  delAsync: promisify(redisClient.del).bind(redisClient)
}
