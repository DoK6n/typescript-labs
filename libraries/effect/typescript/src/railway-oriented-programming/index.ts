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

// Railway Oriented Programming 예제 함수
class DataService {
  getDataById(id: number) {
    return id > 0
      ? Effect.succeed(`Data for id: ${id}`)
      : Effect.fail(new NotFoundError('ID must be greater than 0'))
  }
}

class DataController {
  constructor(private dataService: DataService) {}

  getDataById(id: number) {
    const program = this.dataService.getDataById(id)

    return program
  }
}

const dataController = new DataController(new DataService())

const result = dataController.getDataById(0)

Effect.runPromise(result)
  .then(data => console.log(data))
  .catch(error => console.error(error))
