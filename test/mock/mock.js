const mockStore = () => {
  const store = new Map()
  store.set('oander', 'asd')
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
  }
}

const mockRequest = {
  params: {
    key: 'oander'
  }
}

const mockResponse = {
  reply: '',
  send (reply) {
    this.reply = reply
  }
}

module.exports = {
  mockStore,
  mockRequest,
  mockResponse
}
