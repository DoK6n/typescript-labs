/** 객체 T의 모든 속성 값의 타입을 유니온으로 결합한 타입을 정의합니다. 객체의 모든 값 타입 중 하나가 될 수 있습니다. */
export type ValueOf<T> = T[keyof T]

/** 임의의 인자를 받아서 임의의 타입을 반환할 수 있는 함수의 타입을 정의합니다. */
export type AnyFunction = (...args: any[]) => any

/** 제네릭 타입 T 또는 null을 허용하는 유니온 타입을 정의합니다. 이는 선택적 값 또는 null 허용 값에 사용됩니다. */
export type Maybe<T> = T | null

/** 제네릭 타입 T 또는 undefined 허용하는 유니온 타입을 정의합니다. 이는 선택적 값 또는 undefined 허용 값에 사용됩니다. */
export type Perhaps<T> = T | undefined

/** 제네릭 타입 T 또는 null 또는 undefined를 허용하는 유니온 타입을 정의합니다. 이는 선택적 값 또는 null 또는 undefined 허용 값에 사용됩니다. */
export type Probably<T> = T | null | undefined

/**
 * 객체 T의 배열타입인 속성의 요소 타입을 추출합니다.
 *
 * @example
 * type Order = {
 *   id: number
 *   items: {
 *     name: string
 *     price: number
 *   }[]
 * }
 *
 * type Item = PickArrayValue<Order, 'items'> // { name: string; price: number }
 */
export type PickArrayValue<T, K extends keyof T> = T[K] extends (infer U)[] ? U : never

/**
 * 원시값을 구분하기 위한 브랜딩 타입
 *
 * @example
 * type EUR = Brand<number, 'EUR'>
 * type USD = Brand<number, 'USD'>
 * type KRW = Brand<number, 'KRW'>
 *
 * const eur: EUR = 10 as EUR
 * const usd: USD = 10 as USD
 * const krw: KRW = 1000 as KRW
 *
 * const euroToUsd = (euro: EUR): USD => {
 *   return (euro * 0.99) as USD
 * }
 *
 * const usd1 = euroToUsd(eur) // ok
 * const usd2 = euroToUsd(usd) // type error
 * const usd3 = euroToUsd(krw) // type error
 */
export type Brand<K, T> = K & { __brand: T }

/**
 * 객체 `T`에서 특정 속성(Property)의 타입을 추출합니다. 만약 `T`가 해당 속성을 가지고 있다면,
 * 그 속성의 타입을 추론합니다. `T`가 객체인 경우, 객체의 모든 속성에 대해 재귀적으로 탐색하여 해당 속성의 타입을 추출합니다.
 * 이 타입은 특정 속성의 타입을 조건부 타입과 타입 추론을 사용하여 재귀적으로 추출하는 고급 타입 유틸리티입니다.
 *
 * @example
 *
 * ```typescript
 * export const data = {
 *   item0: {
 *     data: {
 *       name: 'a',
 *     },
 *   },
 *   item1: {
 *     data: {
 *       name: 'b',
 *     },
 *   },
 *   item2: {
 *     data: {
 *       name: 'c',
 *     },
 *   },
 * }as const
 *
 * type Name = ExtractPropertyType<typeof data, 'name'> // "a" | "b" | "c"
 *
 * ```
 */
export type ExtractPropertyType<T, Property extends string> = T extends {
  [K in Property]: infer PropType
}
  ? PropType
  : T extends object
  ? ValueOf<{ [K in keyof T]: ExtractPropertyType<T[K], Property> }>
  : never

export type Nullable<T> = {
  [K in keyof T]: Maybe<T[K]>
}

export type DeepNullable<T> = {
  [K in keyof T]: Maybe<DeepNullable<T[K]>>
}

/**
 * 선택한 속성을 제외한 나머지 속성을 Nullable로 만드는 타입입니다.
 * T는 원본 타입, K는 Nullable에서 제외할 속성들의 유니온 타입입니다.
 */
export type NullableOmit<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] : Maybe<T[P]>
}

/**
 * 선택한 속성을 제외한 나머지 속성을 DeepNullable로 만드는 타입입니다.
 * T는 원본 타입, K는 DeepNullable에서 제외할 속성들의 유니온 타입입니다.
 * 내부적으로 DeepNullable로 전부 Nullable로 만든 후 선택한 속성만 Omit으로 제외한 후 제외했던 키와 타입을 & 키워드로 다시 타입을 합칩니다.
 */
export type DeepNullableOmit<T, K extends keyof T> = Omit<DeepNullable<T>, K> & {
  [P in K]: T[P]
}

/**
 * 선택한 속성만 Nullable로 만드는 타입입니다.
 * T는 원본 타입, K는 Nullable로 만들 속성들의 유니온 타입입니다.
 */
export type NullablePick<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? Maybe<T[P]> : T[P]
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

/**
 * 문자열 리터럴 유니온 타입을 확장하여 다른 문자열도 허용합니다
 *
 * @example
 * type CloudType = 'aws' | 'gcp' | 'azure'
 * const aws: Expand<CloudType> = 'aws' // ok
 * const azure: Expand<CloudType> = 'azure' // ok
 * const oracle: Expand<CloudType> = 'oracle' // ok
 *
 * const oracle: CloudType = 'oracle' // Type '"oracle"' is not assignable to type 'CloudType'.ts(2322)
 */
export type Expand<T> = T | (string & NonNullable<unknown>)

/**
 * 문자열을 숫자로 변환합니다. (정수 또는 소수 지원)
 *
 * @example
 * type Result1 = Numeric<'42'> // 42
 * type Result2 = Numeric<'123abc'> // never
 * type Result3 = Numeric<123> // 123
 * type Result3 = Numeric<42.195> // 42.195
 */
export type Numeric<T extends string | number> = T extends number
  ? T
  : T extends `${infer N extends number}`
  ? N
  : never

/**
 * enum type으로 부터 value를 추출하여 유니온 타입으로 만듭니다.
 * string base, number base, mixed base 전부 지원합니다.
 *
 * @example
 * enum StringBaseColor {
 *   Red = 'Red',
 *   Green = 'Green',
 *   Blue = 'Blue',
 * }
 *
 * enum NumberBaseColor {
 *   Red,
 *   Green,
 *   Blue,
 * }
 *
 * enum MixedBaseColor {
 *   Red = 'Red',
 *   Green = 123,
 *   Blue = 'Blue',
 * }
 *
 * type StringColorValues = EnumValues<StringBaseColor> // "Red" | "Green" | "Blue"
 * type NumberColorValues = EnumValues<NumberBaseColor> // 0 | 1 | 2
 * type MixedColorValues = EnumValues<MixedBaseColor> // "Red" | "Blue" | 123
 */
export type EnumValues<TEnum extends string | number> = `${TEnum}` extends `${infer T extends number}`
  ? T
  : `${TEnum}` extends `${infer T extends string}`
  ? T extends `${number}`
    ? Numeric<T>
    : T
  : never

/**
 * @example
 * type Twoa = { one: number; two: string; three: boolean }
 *
 * type Renamed = Rename<Twoa, 'three', 'four'>
 *
 * const renamedTwoa: Renamed = { one: 1, two: '2', four: true }
 */
export type Rename<T, K extends keyof T, N extends string> = Pick<T, Exclude<keyof T, K>> & {
  [P in N]: T[K]
}

/**
 * @example
 * type Twoa = { one: number; two: string; three: boolean }
 *
 * type RenameByT<Twoa, { one: 'x'; two: 'y'; three: 'z' }>
 *
 * const renamed: RenameXYZ = { x: 1, y: '2', z: true }
 */
export type RenameByT<T, U> = {
  [K in keyof U as K extends keyof T ? (T[K] extends string ? T[K] : never) : K]: K extends keyof U ? U[K] : never
}

export type ReplacePropertyType<T, K extends keyof T, NewType> = Omit<T, K> & {
  [P in K]: NewType
}
