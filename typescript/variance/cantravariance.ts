// 반공변셩(Contravariance) - 넓은 타입을 좁은 타입에 대입할 수 있다
// 매개변수는 반공변성을 가진다

// 함수 : 함수 자체는 명확한 값이 아니기 때문에 좁은 타입에 대입하면 오히려 타입 추론시 추론 범위를 보다 구체적으로 추론되게 할 수 있음
// 반면 함수의 리턴타입은 함수의 명확한 반환 값을 의미하므로 좁은 타입을 넓은 타입에 대입가능. 따라서 (a: string | number) => string 타입을 (a: string) => string | number 타입에 대입 가능
// 매개변수의 범위가 넓고, 리턴 타입의 범위가 더 좁기 때문, 반대는 불가능

type Two = (a: string | number) => string

declare const func4: (a: string) => string
declare const func5: (a: string | number) => string
declare const func6: (a: string | number | boolean) => string

const two4: Two = func4 // 2 <- 1
const two5: Two = func5 // 2 <- 2
const two6: Two = func6 // 2 <- 3
