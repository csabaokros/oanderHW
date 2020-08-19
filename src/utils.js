'use strict'

const strToB64 = string => {
  if (!string) return
  return Buffer.from(string).toString('base64')
}

const b64ToString = b64String => {
  if (!b64String) return
  return Buffer.from(b64String, 'base64').toString('utf-8')
}

module.exports = {
  strToB64,
  b64ToString
}
