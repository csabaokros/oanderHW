'use strict'

/**
 * A fake store to test express handlers.
 */
const MockStore = function () {
  const store = new Map()

  return {
    async getAsync (key) {
      return store.get(key)
    },
    async setAsync (key, value) {
      return store.set(key, value)
    },
    async delAsync (key, value) {
      return store.delete(key, value)
    },
    store
  }
}

/**
 * An object used as a makeshift request to be passed to the express handlers
 */
const MockRequest = function () {
  return {
    params: {
      key: ''
    },
    body: ''
  }
}

/**
 * An object used as a makeshift response for the express handlers to modify
 */
const MockResponse = function () {
  return {
    reply: '',
    code: '',
    headers: {},
    send (reply) {
      this.reply = reply
    },
    status (code) {
      this.code = code
      return this
    },
    set (headers) {
      this.headers = headers
    },
    end () {
      return this.send
    }
  }
}

module.exports = {
  MockStore,
  MockRequest,
  MockResponse
}
