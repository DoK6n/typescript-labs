/* eslint-disable @typescript-eslint/ban-types */

import type { ValueOf } from './types'

type TupleEntry<T extends readonly unknown[], I extends unknown[] = [], R = never> = T extends readonly [
  infer Head,
  ...infer Tail,
]
  ? TupleEntry<Tail, [...I, unknown], R | [`${I['length']}`, Head]>
  : R

type ObjectEntry<T extends {}> = T extends object
  ? { [K in keyof T]: [K, Required<T>[K]] }[keyof T] extends infer E
    ? E extends [infer K, infer V]
      ? K extends string | number
        ? [`${K}`, V]
        : never
      : never
    : never
  : never

export type Entry<T extends {}> = T extends readonly [unknown, ...unknown[]]
  ? TupleEntry<T>
  : T extends readonly (infer U)[]
  ? [`${number}`, U]
  : ObjectEntry<T>

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }
type Cast<X, Y> = X extends Y ? X : Y
type FromEntries<T> = T extends [infer Key, unknown][]
  ? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, unknown]>[1] }
  : { [key in string]: unknown }

export type FromEntriesWithReadOnly<T> = FromEntries<DeepWriteable<T>>

export namespace TypedObject {
  /**
   * Type Safety Object.keys
   *
   * @author dkkim
   */
  export function keys<O extends object>(obj: O): (keyof O)[] {
    return Object.keys(obj) as (keyof O)[]
  }

  /**
   * Type Safety Object.values
   *
   * @author dkkim
   */
  export function values<O extends object>(obj: O): ValueOf<O>[] {
    return Object.values(obj) as ValueOf<O>[]
  }

  /**
   * Type Safety Object.entries
   *
   * @author dkkim
   */
  export function entries<T extends {}>(object: T): readonly Entry<T>[] {
    return Object.entries(object) as unknown as readonly Entry<T>[]
  }

  /**
   * Type Safety Object.fromEntries
   *
   * @author dkkim
   */
  export function fromEntries<T extends Iterable<readonly [PropertyKey, unknown]>>(
    object: T,
  ): FromEntriesWithReadOnly<T> {
    return Object.fromEntries(object) as unknown as FromEntriesWithReadOnly<T>
  }
}
