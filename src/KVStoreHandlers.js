'use strict'

const { logError, logDebug } = require('./logger.js')
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
      response.status(204).send(`Value for ${key} not found`)
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
const addKeyToStoreHandler = ({ getAsync, setAsync }) => {
  return async (request, response) => {
    const { key } = request.params
    logDebug('Converting request body to base64...')
    const jsonString = JSON.stringify(request.body)
    const jsonB64 = strToB64(jsonString)
    try {
      const keyExists = (await getAsync(key))
      if (keyExists) {
        logDebug(`Data already exists under ${key}, sending 405`)
        response.set({
          Allow: 'PUT, DELETE'
        })
        response.status(405).end()
        return
      }
      await setAsync(key, jsonB64)
      logDebug(`Successfully added ${key} to the store`)
      response.status(201).end()
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
const deleteKeyFromStoreHandler = ({ getAsync, delAsync }) => {
  return async (request, response) => {
    const { key } = request.params
    try {
      const keyExists = (await getAsync(key))
      if (!keyExists) {
        logDebug(`Data does not exists under ${key}, sending 404`)
        response.status(404).send(`No entry under ${key}`)
        return
      }
      await delAsync(key)
      logDebug(`Successfully deleted ${key} from the store`)
      response.status(200).end()
    } catch (error) {
      logError(`Failed to delete ${key} from the store: ${error}`)
      response.status(500).send(`Can not remove ${key} from store`)
    }
  }
}

/**
 * A Factory function that returns a handler using store argument
 * to update values in
 * @param { store } The store to be used by the handler
 * @returns The handler function bound to the store
 */
const updateKeyInStoreHandler = ({ getAsync, setAsync }) => {
  return async (request, response) => {
    const { key } = request.params
    logDebug('Converting request body to base64...')
    const jsonString = JSON.stringify(request.body)
    const jsonB64 = strToB64(jsonString)
    try {
      const keyExists = (await getAsync(key))
      if (!keyExists) {
        logDebug(`Data does not exists under ${key}, sending 405`)
        response.set({
          Allow: 'POST'
        })
        response.status(405).end()
        return
      }
      await setAsync(key, jsonB64)
      logDebug(`Successfully modified ${key}`)
      response.status(200).send('OK')
    } catch (error) {
      logError(`Failed to modify ${key}: ${error}`)
      response.status(500).send(`Can not modify ${key}`)
    }
  }
}

module.exports = {
  getKeyFromStoreHandler,
  addKeyToStoreHandler,
  deleteKeyFromStoreHandler,
  updateKeyInStoreHandler
}
