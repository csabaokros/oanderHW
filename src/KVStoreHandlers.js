'use strict'

const { logError, logWarning, logInfo, logDebug } = require('./logger.js')
const { strToB64, b64ToString } = require('./utils.js')

/**
 * A Factory function that returns a handler using store argument
 * to fetch values from
 * @param { store } The store to be used by the handler
 * @returns The handler function bound to the store
 */
const getKeyFromStoreHandler = ({ getAsync }) => {
  return async (request, response) => {
    const { key } = request.params
    logDebug(`Fetching key: ${key} from the store`)
    const value = b64ToString(await getAsync(key))
    if (!value) {
      logDebug(`Key: ${key} not found, sending error`)
      response.status(404).send(`Value for ${key} not found`)
    } else {
      logDebug(`Key: ${key} found, sending value: ${value}`)
      response.send(value)
    }
  }
}

/**
 * A Factory function that returns a handler using store argument
 * to add values to
 * @param { store } The store to be used by the handler
 * @returns The handler function bound to the store
 */
const addKeyToStoreHandler = ({ setAsync }) => {
  return async (request, response) => {
    const { key } = request.params
    logDebug(`Converting request body to base64...`)
    const jsonString = JSON.stringify(request.body)
    const jsonB64 = strToB64(jsonString)
    try {
      await setAsync(key, jsonB64)
      logDebug(`Successfully added ${key} to the store`)
      response.send('OK')
    } catch (error) {
      logError(`Failed to add ${key} to the store: ${error}`)
      response.status(500).send(`Can not add ${key} to store`)
    }
  }
}

/**
 * A Factory function that returns a handler using store argument
 * to delete values from
 * @param { store } The store to be used by the handler
 * @returns The handler function bound to the store
 */
const deleteKeyFromStoreHandler = ({ delAsync }) => {
  return async (request, response) => {
    await delAsync('oander')
    response.send('ok')
  }
}

/**
 * A Factory function that returns a handler using store argument
 * to update values in
 * @param { store } The store to be used by the handler
 * @returns The handler function bound to the store
 */
const updateKeyInStoreHandler = ({setAsync}) => {
  return async (request, response) => {
    response.send(await getAsync('oander'))
  }
}

module.exports = {
  getKeyFromStoreHandler,
  addKeyToStoreHandler,
  deleteKeyFromStoreHandler,
  updateKeyInStoreHandler
}
