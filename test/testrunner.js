'use strict'
/**
 * An awfully simple test runner, because no extra libraries are allowed.
 * @param { string } groupName A name for the unit test batch to run
 * @param {*} tests A function containing the unit tests in the batch
 */

const define = (groupName, tests) => {
  const test = async (name, fn) => {
    try {
      await fn()
      console.log('\t✅', name)
    } catch (error) {
      if (error.code !== 'ERR_ASERTION') {
        console.error(error)
      } else {
        console.error('\t❌', name)
        console.error(`\t\tExpected \x1b[31m${error.expected}\x1b[0m to ${error.operator}() \x1b[32m${error.actual}\x1b[0m`)
      }
    }
  }
  tests(test)
}

module.exports = define
