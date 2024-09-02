import { Effect, Random } from 'effect'

export class HttpError {
  readonly _tag = 'HttpError'
}

export class ValidationError {
  readonly _tag = 'ValidationError'
}

export const genProgram = () => {
  console.time('genProgram')
  const program = Effect.gen(function* () {
    const n1 = yield* Random.next
    const n2 = yield* Random.next
    const httpResult = n1 > 0.5 ? 'yay!' : yield* Effect.fail(new HttpError())
    const validationResult = n2 > 0.5 ? 'yay!' : yield* Effect.fail(new ValidationError())
    return httpResult + validationResult
  })

  Effect.runPromise(program)
    .then(console.log, console.error)
    .then(() => console.timeEnd('genProgram'))
}
