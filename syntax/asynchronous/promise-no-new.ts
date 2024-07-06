function _myFunc(isOk: boolean) {
  if (isOk) return
  throw new Error('flubbed it')
}

function myFunc(isOk: boolean) {
  try {
    return Promise.resolve(_myFunc(isOk))
  } catch (e) {
    return Promise.reject(e)
  }
}

function main() {
  // try {
  //   _myFunc(false)
  //   console.log('SUCCESS')
  // } catch (e) {
  //   console.log(`FAILED: ${e.message}`)
  // }

  // try {
  //   myFunc(false)
  //   console.log('SUCCESS')
  // } catch (e) {
  //   console.log(`FAILED: ${e.message}`)
  // }

  myFunc(false)
    .then(() => {
      console.log('1 success')
    })
    .catch(e => {
      console.log(`1 failed: ${e.message}`)
    })

  myFunc(true)
    .then(() => {
      console.log('2 success')
    })
    .catch(e => {
      console.log(`2 failed: ${e.message}`)
    })
}

main()
