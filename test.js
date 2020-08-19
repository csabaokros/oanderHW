'use strict'
const { readdir } = require('fs').promises

const SOURCE_FOLDER = './test'

;(async () => {
  const files = await readdir(SOURCE_FOLDER)
  files.map(file => {
    if (file.split('.test.js')[0] !== file) require(`${SOURCE_FOLDER}/${file}`)
  })
})()
