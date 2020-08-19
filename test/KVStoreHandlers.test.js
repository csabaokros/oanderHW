const { strictEqual } = require('assert').strict

const define = require('./unitTest.js')

const { getKeyFromStoreHandler } = require('../src/KVStoreHandlers.js')

const { mockStore, mockRequest, mockResponse } = require('./mock/mock.js')

define('API End-points', test => {

  test('[getKeyFromStoreHandler] Should get an entry from the store', async () => {
    const handler = getKeyFromStoreHandler(mockStore())
    await handler(mockRequest, mockResponse)
    
    strictEqual(mockResponse.reply, 'asd')
  })
})
