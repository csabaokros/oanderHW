'use strict'
const { readdir } = require('fs').promises

const UNIT_TEST_FOLDER = './test/unit'
const UNIT_TEST_EXTENSION = '.test.js'

// Reads all files with UNIT_TEST_EXTENSION in UNIT_TEST_FOLDER and runs them
;(async () => {
  const files = await readdir(UNIT_TEST_FOLDER)
  files.map(file => {
    if (file.split(UNIT_TEST_EXTENSION)[0] !== file) require(`./unit/${file}`)
  })
})()
