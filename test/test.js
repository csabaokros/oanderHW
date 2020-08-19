'use strict'
const { readdir } = require('fs').promises

const SOURCE_FOLDER = './test/unit'

;(async () => {
  const files = await readdir(SOURCE_FOLDER)
  files.map(file => {
    if (file.split('.test.js')[0] !== file) require(`./unit/${file}`)
  })
})()
