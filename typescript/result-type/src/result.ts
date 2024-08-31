/**
 * @example
 * class User {
 *   private props: UserProps
 *   get name(): string {
 *     return this.props.name
 *   }
 *   private constructor(props: UserProps) {
 *     this.props = props
 *   }
 *   public static create(props: UserProps): Result<User> {
 *     const guardResult = Guard.againstNullOrUndefined(props.name, 'name')
 *     const isAppropriateLength =
 *       TextUtils.isAtLeast(2, props.name) && TextUtils.isAtMost(31, props.name)
 *     // Fail with reason
 *     if (!guardResult.success) {
 *       return Result.fail<User>(guardResult.message)
 *     }
 *     // Fail with reason
 *     if (!isAppropriateLength) {
 *       return Result.fail<User>('Must be between 2 and 31 characters')
 *     }
 *     // Static method can access the constructor
 *     return Result.ok<User>(new User(props))
 *   }
 * }
 */
export class Result<T> {
  public isSuccess: boolean
  public isFailure: boolean
  public error?: string | null
  #_value?: T

  private constructor(isSuccess: boolean, error?: string | null, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be 
        successful and contain an error`)
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result 
        needs to contain an error message`)
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error
    this.#_value = value

    Object.freeze(this)
  }

  get value(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`)
    }

    return this.#_value as T
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value)
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error)
  }

  public static combine<T>(results: Result<T>[]): Result<T[]> {
    const errors: string[] = []
    const values: T[] = []

    for (const result of results) {
      if (result.isFailure) {
        errors.push(result.error!)
      } else {
        values.push(result.value)
      }
    }

    if (errors.length > 0) {
      return Result.fail<T[]>(errors.join(', '))
    }

    return Result.ok<T[]>(values)
  }
}
