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

  async getDataById(id: number) {
    const data = this.data.find(d => d.id === id)

    return data ? Effect.succeed(data) : Effect.fail(new NotFoundError('ID는 0보다 커야 합니다'))
  }

  async getDataByName(name: string) {
    const data = this.data.find(d => d.name === name)

    return Effect.gen(function* (_) {
      if (name.length < 2) {
        return yield* _(Effect.fail(new InvalidError('이름은 최소 2글자 이상이어야 합니다')))
      }

      if (name.length > 20) {
        return yield* _(Effect.fail(new InvalidError('이름은 20글자를 초과할 수 없습니다')))
      }

      if (!data) {
        return yield* _(Effect.fail(new NotFoundError('해당 이름의 사용자를 찾을 수 없습니다')))
      }

      return yield* _(Effect.succeed(data))
    })
  }
}

class DataController {
  constructor(private dataService: DataService) {}

  async getDataById(id: number) {
    const program = Effect.runPromiseExit(await this.dataService.getDataById(id))
    return program
  }

  async getDataByName(name: string) {
    const program = Effect.runPromiseExit(await this.dataService.getDataByName(name))
    return program
  }
}

const main = async () => {
  const dataController = new DataController(new DataService())

  const resultById0 = await dataController.getDataById(0) // Exit<User, NotFoundError>
  const resultById2 = await dataController.getDataById(2) // Exit<User, NotFoundError>
  const resultByName = await dataController.getDataByName('John') // Exit<User, InvalidError | NotFoundError>
  const resultByNameOver20 = await dataController.getDataByName('aaaaaaaaaaaaaaaaaaaa') // Exit<User, InvalidError | NotFoundError>
  const resultByNameUnder2 = await dataController.getDataByName('a') // Exit<User, InvalidError | NotFoundError>

  console.log('resultById0', resultById0 + '\n')
  // resultById0 {
  //   "_id": "Exit",
  //   "_tag": "Failure",
  //   "cause": {
  //     "_id": "Cause",
  //     "_tag": "Fail",
  //     "failure": {
  //       "message": "ID는 0보다 커야 합니다",
  //       "_tag": "NotFoundError"
  //     }
  //   }
  // }

  console.log('resultById2', resultById2 + '\n')
  // resultById2 {
  //   "_id": "Exit",
  //   "_tag": "Success",
  //   "value": {
  //     "id": 2,
  //     "name": "Jane"
  //   }
  // }

  console.log('resultByName', resultByName + '\n')
  // resultByName {
  //   "_id": "Exit",
  //   "_tag": "Success",
  //   "value": {
  //     "id": 1,
  //     "name": "John"
  //   }
  // }

  console.log('resultByNameOver20', resultByNameOver20 + '\n')
  // resultByNameOver20 {
  //   "_id": "Exit",
  //   "_tag": "Failure",
  //   "cause": {
  //     "_id": "Cause",
  //     "_tag": "Fail",
  //     "failure": {
  //       "message": "해당 이름의 사용자를 찾을 수 없습니다",
  //       "_tag": "NotFoundError"
  //     }
  //   }
  // }

  console.log('resultByNameUnder2', resultByNameUnder2)
  // resultByNameUnder2 {
  //   _id: 'Exit',
  //   _tag: 'Failure',
  //   cause: {
  //     _id: 'Cause',
  //     _tag: 'Fail',
  //     failure: InvalidError {
  //       message: '이름은 최소 2글자 이상이어야 합니다',
  //       _tag: 'InvalidError'
  //     }
  //   }
  // }
}

main()
