export type ERROR = {
  type: string
  result: false
  code: number
  data: string
}

export interface ResponseForm<T> {
  result: true
  code: 1000
  data: T
}

export type Merge<F, S> = {
  [K in keyof (F & S)]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never
}

export type Try<T> = ResponseForm<T>
export type TryCatch<T, E extends ERROR> = ResponseForm<T> | E

/**
 * @example
 * // Service
 * async getPlans() {
 *   const plans = [...]
 *
 *   if (plans.length <= 0) {
 *     return Result.fail<Plan[], PLAN_NOT_FOUND>(PLAN_NOT_FOUND)
 *   }
 *
 *   return Result.ok<Plan[]>(plans)
 * }
 *
 * // Controller
 * async getPlans: Promise<TryCatch<Plan[], PLAN_NOT_FOUND>> => {
 *   const result = await planService.getPlans()
 *
 *   if (result.isFailure && Result.isBusinessErrorGuard<PLAN_NOT_FOUND>(result.error)) {
 *     return result.error
 *   }
 *
 *   return Result.createResponse(result.value)
 * }
 */
export class Result<T> {
  isSuccess: boolean
  isFailure: boolean
  error?: ERROR | null
  #_value?: T

  private constructor(isSuccess: boolean, error?: ERROR | null, value?: T) {
    if (isSuccess && error) {
      // throw new Error(`InvalidOperation: A result cannot be successful and contain an error`)
      throw new Error(`유효하지 않은 작업: 결과가 성공적이면서 동시에 오류를 포함할 수 없습니다`)
    }
    if (!isSuccess && !error) {
      // throw new Error(`InvalidOperation: A failing result needs to contain an error message`)
      throw new Error(`유효하지 않은 작업: 실패한 결과는 반드시 오류 메시지를 포함해야 합니다`)
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error
    this.#_value = value

    Object.freeze(this)
  }

  get value(): T {
    if (!this.isSuccess) {
      // throw new Error(`Can't retrieve the value from a failed result.`)
      throw new Error(`실패한 결과에서 값을 가져올 수 없습니다.`)
    }

    return this.#_value as T
  }

  static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value)
  }

  static fail<U, E extends ERROR>(error: E): Result<U> {
    return new Result<U>(false, error)
  }

  static createResponse<T>(data: T): Try<T> {
    return {
      result: true,
      code: 1000,
      data,
    } as const
  }

  isBusinessErrorGuard<E>(obj: any): obj is Merge<E, { type: 'business' }> {
    return this.isErrorGuard(obj) && obj.type === 'business'
  }

  isDatabaseErrorGuard<E>(obj: any): obj is Merge<E, { type: 'database' }> {
    return this.isErrorGuard(obj) && obj.type === 'database'
  }

  isUnknownErrorGuard<E>(obj: any): obj is Merge<E, { type: 'unknown' }> {
    return this.isErrorGuard(obj) && obj.type === 'unknown'
  }

  isErrorGuard(obj: any): obj is ERROR {
    if ((this.isFailure, obj.result === false)) {
      return true
    }
    return false
  }

  isFailureGuard<E>(obj: any): obj is E {
    return this.isErrorGuard(obj)
  }

  static combine<T>(results: Result<T>[]): Result<T[]> {
    const errors: ERROR[] = []
    const values: T[] = []

    for (const result of results) {
      if (result.isFailure) {
        errors.push(result.error!)
      } else {
        values.push(result.value)
      }
    }

    if (errors.length > 0) {
      const combinedError: ERROR = {
        type: 'business',
        result: false,
        code: 4009,
        data: errors.map(e => e.data).join(', '),
      }

      return Result.fail<T[], ERROR>(combinedError)
    }

    return Result.ok<T[]>(values)
  }
}
