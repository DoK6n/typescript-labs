import { Effect } from 'effect'

interface IError {
  readonly _tag: string
  readonly message: string
}

class NotFoundError implements IError {
  readonly _tag = 'NotFoundError'
  constructor(public message: string) {}
}

class InvalidError implements IError {
  readonly _tag = 'InvalidError'
  constructor(public message: string) {}
}

type User = {
  id: number
  name: string
}

// Railway Oriented Programming 예제 함수
class DataService {
  private data: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Doe' },
  ]

  getDataById(id: number) {
    const data = this.data.find(d => d.id === id)

    return data ? Effect.succeed(data) : Effect.fail(new NotFoundError('ID must be greater than 0'))
  }

  getDataByName(name: string) {
    const data = this.data.find(d => d.name === name)

    return Effect.gen(function* (_) {
      if (name.length < 3) {
        return yield* _(Effect.fail(new InvalidError('Name must be at least 3 characters long')))
      }

      if (name.length > 10) {
        return { id: 1, name: 'John' } as User
      }

      return data
        ? `Data for name: ${name}`
        : yield* _(Effect.fail(new NotFoundError('Name not found')))
    })
  }
}

class DataController {
  constructor(private dataService: DataService) {}

  getDataById(id: number) {
    const program = this.dataService.getDataById(id)
    return program
  }

  getDataByName(name: string) {
    const program = this.dataService.getDataByName(name)
    return program
  }
}

const dataController = new DataController(new DataService())

const resultById = dataController.getDataById(0)
const responseById = Effect.runPromiseExit(resultById) // Promise<Exit<string, NotFoundError>>

const resultByName = dataController.getDataByName('John')
const responseByName = Effect.runPromiseExit(resultByName) // Promise<Exit<string | User, NotFoundError | InvalidError>>
