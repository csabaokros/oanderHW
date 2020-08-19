'use strict'

/**
 * A factory function that returns a log function for a prepared log level
 * @param {string} level Takes a string that is usable as a key in LOG_LEVELS constant
 * @returns A log funtion scoped to the requested level
 */

const Logger = (level = 'error') => {
  const LOG_LEVELS = {
    error: '\x1b[31m',
    warning: '\x1b[33m',
    info: '\x1b[0m',
    debug: '\x1b[34m'
  }

  return text => {
    if (!text) return false
    const logLevel = parseInt(process.env.LOG_LEVEL) || 0
    if (logLevel < Object.keys(LOG_LEVELS).indexOf(level)) return false
    const logColor = LOG_LEVELS[level] || '\x1b[31m'
    const date = new Date()
    console.log(`${logColor}[${level.toUpperCase()} - ${date.toISOString()}] ${text}\x1b[0m`)
  }
}

module.exports = {
  logError: Logger(),
  logWarning: Logger('warning'),
  logInfo: Logger('info'),
  logDebug: Logger('debug')
}
