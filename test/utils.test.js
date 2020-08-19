const { strictEqual } = require('assert').strict

const define = require('./unitTest.js')

const { strToB64, b64ToString } = require('../src/utils.js')

define('Utility functions', test => {
  
  test('[strToB64] Should convert text to base64', () => {
    strictEqual(strToB64("oanderTestStringToBase64"), 'b2FuZGVyVGVzdFN0cmluZ1RvQmFzZTY0')
  })
  
  test('[strToB64] Should return undefined for empty string', () => {
    strictEqual(strToB64(""), undefined)
  })
  
  test('[b64ToString] Should convert base64 to text', () => {
    strictEqual('oanderTestStringToBase64', b64ToString('b2FuZGVyVGVzdFN0cmluZ1RvQmFzZTY0'))
  })
  
  test('[b64ToString] Should return undefined for empty string', () => {
    strictEqual(b64ToString(""), undefined)
  })
})
