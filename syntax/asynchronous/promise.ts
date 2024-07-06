const coffeeMachine = (coin: number) =>
  new Promise((resolve, reject) => {
    console.log('곧 커피가 나옵니다...')

    if (coin < 2500) {
      setTimeout(() => {
        reject(`금액이 부족합니다. ${2500 - coin}원을 더 넣어주세요. (투입된 금액: ${coin}원)`)
      }, 1000)
    }

    setTimeout(() => {
      resolve({ name: '아메리카노', price: 2500 })
    }, 1000)
  })

coffeeMachine(2400)
  .then(data => console.log(data))
  .catch(error => console.log(error))

// ------------------------------------------------------------------------------------

const coffeeMachineCallback = (
  coin: number,
  callback: (error: string | null, result?: { name: string; price: number }) => void,
) => {
  console.log('곧 커피가 나옵니다...')

  if (coin < 2500) {
    setTimeout(() => {
      callback(`금액이 부족합니다. ${2500 - coin}원을 더 넣어주세요. (투입된 금액: ${coin}원)`)
    }, 1000)
  } else {
    setTimeout(() => {
      callback(null, { name: '아메리카노', price: 2500 })
    }, 1000)
  }
}

coffeeMachineCallback(2500, (error, result) => {
  if (error) {
    console.log(error)
  } else {
    console.log(result)
  }
})
