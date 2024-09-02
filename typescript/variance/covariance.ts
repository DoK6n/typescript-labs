// 공변성(Cavariance) - 좁은 타입을 넓은 타입에 대입할 수 있다
// 반환값은 공변성을 가진다

// 변수 : 리터럴, 즉 하나의 값이기 때문. `string | number`타입을 string에 대입하려고 할때 컴파일러는 number인지 string인지 모르기 때문에 에러가 발생

type One = (a: string) => string | number

// One의 반환 타입은 2개, func1는 1개로 func1가 더 좁으므로 One에 대입 가능 | One > func1
declare const func1: (a: string) => string
// One의 반환 타입은 2개, func2은 2개로 func2과 동일하므로 One에 대입 가능 | One === func2
declare const func2: (a: string) => string | number
// One의 반환 타입은 2개, func3는 3개로 func3가 더 넓으므로 One에 대입 불가능 | One < func3
declare const func3: (a: string) => string | number | boolean
// 넓은 타입은 좁은 타입에 대입할 수 없음

const one1: One = func1
const one2: One = func2
const one3: One = func3
