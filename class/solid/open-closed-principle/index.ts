const main1 = (type: 'car' | 'human' | 'cat' | 'dog') => {
  if (type === 'car') {
  } else if (type === 'human') {
    // 새로운 타입이 추가되면 main1 함수를 수정해야 한다. -> 확장에도 열려있고, 변경에 열려있다.
  } else if (type === 'cat') {
  } else if (type === 'dog') {
  }
}

main1('car')
main1('human')
main1('cat')
main1('dog')

// ----------------------------------------------------

interface Movable {
  go(): void
}

const car: Movable = {
  go() {},
}

const human: Movable = {
  go() {},
}

// 새로운 타입이 추가되어도 main2 함수는 변경되지 않는다. -> 확장에는 열려있고, 변경에는 닫혀있다.
const cat: Movable = {
  go() {},
}

const dog: Movable = {
  go() {},
}

function main2(type: Movable) {
  type.go()
}

main2(car)
main2(human)
main2(cat)
main2(dog)

export {}
