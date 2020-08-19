const define = (groupName, tests) => {
  const test = async (name, fn) => {
    try {
      await fn()
      console.log('\t✅', name)
		} catch (error) {
      if( error.code !== 'ERR_ASERTION') {
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
