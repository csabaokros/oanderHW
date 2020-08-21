'use strict'

/**
 * Encodes a plain text string to base64
 * @param { string } string The string to be converted
 * @returns base64 encoded version of the string
 */
const strToB64 = string => {
  if (!string) return
  return Buffer.from(string).toString('base64')
}

/**
 * Decodes a base64 string to plain text
 * @param { string } b64String a base64 encoded string
 * @returns a decoded plain text string
 */
const b64ToString = b64String => {
  if (!b64String) return
  return Buffer.from(b64String, 'base64').toString('utf-8')
}

module.exports = {
  strToB64,
  b64ToString
}
