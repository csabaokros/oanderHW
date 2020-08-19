const { strictEqual } = require('assert').strict

const define = require('../testrunner.js')

const {
  getKeyFromStoreHandler,
  addKeyToStoreHandler,
  deleteKeyFromStoreHandler,
  updateKeyInStoreHandler
} = require('../../src/KVStoreHandlers.js')

const { MockStore, MockRequest, MockResponse } = require('../mocks/mocks.js')

const { strToB64 } = require('../../src/utils.js')

/**
 * Test suite for `GET /:key`
 */

define('API End-points GET', test => {
  const store = new MockStore()
  store.store.set('oander', strToB64('test-string'))

  test('[getKeyFromStoreHandler] Gets an entry from the store', async () => {
    const request = new MockRequest()
    const response = new MockResponse()
    request.params.key = 'oander'

    const handler = getKeyFromStoreHandler(store)
    await handler(request, response)

    strictEqual(response.reply, 'test-string')
  })

  test('[getKeyFromStoreHandler] Yields code 204 if no such key exists', async () => {
    const request = new MockRequest()
    const response = new MockResponse()
    request.params.key = 'non-existing-key'

    const handler = getKeyFromStoreHandler(store)
    await handler(request, response)

    strictEqual(response.code, 204)
  })
})

/**
 * Test suite for `POST /:key`
 */

define('API End-points: POST', test => {
  const store = new MockStore()
  store.store.set('existing-key', 'existing-value')

  test('[addKeyToStoreHandler] Yields code 201 when key is created', async () => {
    const request = new MockRequest()
    const response = new MockResponse()
    request.params.key = 'non-existing-key'
    request.body = { asd: 'asd' }

    const handler = addKeyToStoreHandler(store)
    await handler(request, response)

    strictEqual(response.code, 201)
  })

  test('[addKeyToStoreHandler] Yields code 405 with Allow header when key already exists', async () => {
    const request = new MockRequest()
    const response = new MockResponse()

    request.params.key = 'existing-key'

    const handler = addKeyToStoreHandler(store)
    await handler(request, response)

    strictEqual(response.code, 405)
    strictEqual(response.headers.Allow, 'PUT, DELETE')
  })
})

/**
 * Test suite for `DELETE /:key`
 */

define('API End-points: DELETE', test => {
  const store = new MockStore()
  store.store.set('existing-key', 'existing-value')

  test('[deleteKeyFromStoreHandler] Yields code 200 when key is deleted', async () => {
    const request = new MockRequest()
    const response = new MockResponse()
    request.params.key = 'existing-key'

    const handler = deleteKeyFromStoreHandler(store)
    await handler(request, response)

    strictEqual(response.code, 200)
  })

  test('[deleteKeyFromStoreHandler] Yields code 404 when key does not exist', async () => {
    const request = new MockRequest()
    const response = new MockResponse()
    request.params.key = 'non-existing-key'

    const handler = deleteKeyFromStoreHandler(store)
    await handler(request, response)

    strictEqual(response.code, 404)
  })
})

/**
 * Test suite for `PUT /:key`
 */

define('API End-points: PUT', test => {
  const store = new MockStore()
  store.store.set('existing-key', 'existing-value')

  test('[updateKeyInStoreHandler] Yields code 200 when key is updated', async () => {
    const request = new MockRequest()
    const response = new MockResponse()
    request.params.key = 'existing-key'

    const handler = updateKeyInStoreHandler(store)
    await handler(request, response)

    strictEqual(response.code, 200)
  })

  test('[updateKeyInStoreHandler] Yields code 405 with Allow header when key does not exist', async () => {
    const request = new MockRequest()
    const response = new MockResponse()
    request.params.key = 'non-existing-key'

    const handler = updateKeyInStoreHandler(store)
    await handler(request, response)

    strictEqual(response.code, 405)
    strictEqual(response.headers.Allow, 'POST')
  })
})
