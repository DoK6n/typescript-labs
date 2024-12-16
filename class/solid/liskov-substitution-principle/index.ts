class Animal {
  isAnimal() {
    return true
  }
}

class Bird extends Animal {
  fly() {
    return '파닥파닥'
  }

  isBird() {
    return true
  }
}

class Penguin extends Bird {
  override fly() {
    // 부모의 타입을 자식이 정의해버리는 경우 리스코프 치환 원칙 위반
    throw new Error('펭귄은 날지 못합니다.')
  }
}

console.log(new Animal().isAnimal()) // true
console.log(new Bird().fly()) // 파닥파닥
console.log(new Penguin().isAnimal()) // true
console.log(new Penguin().fly()) // throw error

// 부모 클래스(Bird)를 자식 클래스로 교체했을때 타입 에러가 나면 리스코프 치환 원칙 위반
console.log(new Bird().fly().charAt(1)) // 파
console.log(new Penguin().fly().charAt(1)) // 
