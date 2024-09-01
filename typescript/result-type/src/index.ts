import { Result } from './result'
import * as readline from 'readline'

const ERROR_MESSAGES = {
  USER_ID_REQUIRED: '사용자 ID가 필요합니다.',
  USER_ID_STRING: '사용자 ID는 문자열이어야 합니다.',
  USER_NAME_LENGTH: '이름은 2-50자 사이여야 합니다.',
  USER_EMAIL_VALID: '유효한 이메일 주소가 필요합니다.',
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  DATABASE_ERROR: '데이터베이스 오류: ',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  USER_ID_EXISTS: '이미 존재하는 사용자 ID입니다.',
  USER_SAVE_FAILED: '사용자를 저장할 수 없습니다.',
}

// 타입 정의
type UserData = {
  id: string
  name: string
  email: string
  createdAt: Date
  lastLogin: Date
}

export type UserInput = Omit<UserData, 'createdAt' | 'lastLogin'>

class User {
  private constructor(private props: UserInput) {}

  static create(props: UserInput): Result<User> {
    if (!props.id) {
      return Result.fail<User>(ERROR_MESSAGES.USER_ID_REQUIRED)
    } else if (typeof props.id !== 'string') {
      return Result.fail<User>(ERROR_MESSAGES.USER_ID_STRING)
    } else if (!props.name || props.name.length < 2 || props.name.length > 50) {
      return Result.fail<User>(ERROR_MESSAGES.USER_NAME_LENGTH)
    } else if (!props.email || !props.email.includes('@')) {
      return Result.fail<User>(ERROR_MESSAGES.USER_EMAIL_VALID)
    }

    return Result.ok<User>(new User(props))
  }

  get id(): string {
    return this.props.id
  }
  get name(): string {
    return this.props.name
  }
  get email(): string {
    return this.props.email
  }

  toJSON(): UserInput {
    return { ...this.props }
  }

  *[Symbol.iterator]() {
    yield* Object.values(this.props)
  }
}

// 간단한 인메모리 데이터베이스
class InMemoryDatabase {
  private users: Map<string, UserData> = new Map()

  async findOne(id: string): Promise<UserData | null> {
    return this.users.get(id) || null
  }

  async save(user: UserInput): Promise<string> {
    try {
      if (this.users.has(user.id)) {
        throw new Error(ERROR_MESSAGES.USER_ID_EXISTS)
      } else if (typeof user.id !== 'string') {
        throw new Error(ERROR_MESSAGES.USER_ID_STRING)
      }

      const createdAt = new Date()
      const lastLogin = new Date()

      this.users.set(user.id, { ...user, createdAt, lastLogin })

      const savedUser = this.users.get(user.id)

      if (!savedUser) {
        throw new Error(ERROR_MESSAGES.USER_SAVE_FAILED)
      }

      return savedUser.id
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(ERROR_MESSAGES.DATABASE_ERROR + error.message)
      }
      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR)
    }
  }

  async findAll(): Promise<UserData[]> {
    return Array.from(this.users.values())
  }
}

const database = {
  users: new InMemoryDatabase(),
}

type Database = typeof database

// 레포지토리 레이어
class UserRepository {
  constructor(private database: Database) {}

  async findById(id: string): Promise<Result<UserData>> {
    try {
      const userData = await this.database.users.findOne(id)
      if (!userData) {
        return Result.fail<UserData>(ERROR_MESSAGES.USER_NOT_FOUND)
      }
      return Result.ok<UserData>(userData)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return Result.fail<UserData>(ERROR_MESSAGES.DATABASE_ERROR + error.message)
      }
      return Result.fail<UserData>(ERROR_MESSAGES.UNKNOWN_ERROR)
    }
  }

  async save(user: User): Promise<Result<string>> {
    try {
      const id = await this.database.users.save(user.toJSON())
      return Result.ok<string>(id)
    } catch (error) {
      if (error instanceof Error) {
        return Result.fail<string>(ERROR_MESSAGES.DATABASE_ERROR + error.message)
      }
      return Result.fail<string>(ERROR_MESSAGES.UNKNOWN_ERROR)
    }
  }
}

// 서비스 레이어
class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserDetails(id: string): Promise<Result<UserData>> {
    const result = await this.userRepository.findById(id)
    if (result.isFailure) {
      return Result.fail<UserData>(result.error!)
    }

    return Result.ok<UserData>(result.value)
  }

  async save(user: UserInput): Promise<Result<string>> {
    const newUser = User.create(user)

    if (newUser.isFailure) {
      return Result.fail<string>(newUser.error!)
    }

    const result = await this.userRepository.save(newUser.value)

    if (result.isFailure) {
      return Result.fail<string>(result.error!)
    }

    return Result.ok<string>(result.value)
  }
}

// 컨트롤러 레이어
interface Request<Body = any> {
  params?: { id: string }
  body?: Body
}

interface Response {
  status: (code: number) => Response
  json: (data: any) => void
}

class UserController {
  constructor(private userService: UserService) {}

  async getUser(req: Request, res: Response) {
    const id = req.params?.id

    if (!id) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_ID_REQUIRED })
    }

    const result = await this.userService.getUserDetails(id)
    if (result.isFailure) {
      return res.status(400).json({ error: result.error })
    }
    res.json(result.value)
  }

  async saveUser(req: Request<UserInput>, res: Response) {
    const body = req.body

    if (!body) {
      return res.status(400).json({ error: ERROR_MESSAGES.USER_ID_REQUIRED })
    }

    const result = await this.userService.save(body)
    if (result.isFailure) {
      return res.status(400).json({ error: result.error })
    }
    res.json(result.value)
  }
}

// 사용 예시
async function main() {
  // 테스트 데이터 추가
  const seed = [
    { id: '0', name: '홍길동', email: 'hong@gmail.com' },
    { id: '1', name: '김철수', email: 'iron@gmail.com' },
    { id: '2', name: '오영택', email: 'wak@gmail.com' },
  ]
  await Promise.all(
    seed.map(async user => {
      const createdUser = User.create(user)
      if (createdUser.isSuccess) {
        await database.users.save(createdUser.value.toJSON())
      }
    }),
  )

  console.log('테스트 데이터 저장')
  console.log(await database.users.findAll())
  console.log()

  // 사용자 ID 입력 받기
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const getUserInput = (prompt: string): Promise<string> => {
    return new Promise(resolve => {
      rl.question(prompt, answer => {
        resolve(answer)
      })
    })
  }

  const inputCreateUser = (prompt: string): Promise<UserInput> => {
    return new Promise(resolve => {
      const userInfo: UserInput = { id: '', name: '', email: '' }

      const askId = () => {
        rl.question('id: ', id => {
          userInfo.id = id
          askName()
        })
      }

      const askName = () => {
        rl.question('name: ', name => {
          userInfo.name = name
          askEmail()
        })
      }

      const askEmail = () => {
        rl.question('email: ', email => {
          userInfo.email = email
          resolve(userInfo)
        })
      }

      console.log(prompt)
      askId()
    })
  }

  try {
    const userController = new UserController(new UserService(new UserRepository(database)))

    while (true) {
      const action = await getUserInput(
        '어떤 작업을 하시겠습니까? (1: 사용자 조회, 2: 새로운 사용자 저장, q: 종료): ',
      )

      if (action.toLowerCase() === 'q') {
        console.log('프로그램을 종료합니다.')
        break
      }

      const res: Response = {
        status: (code: number) => ({
          json: (data: any) => console.log('statusCode:', code, 'data:', data),
          status: (code: number) => res,
        }),
        json: (data: any) => console.log('\nresponse:', data),
      }

      if (action === '1') {
        const userId = await getUserInput('조회할 사용자 ID를 입력하세요: ')
        const req: Request = { params: { id: userId } }
        await userController.getUser(req, res)
      } else if (action === '2') {
        const body = await inputCreateUser('저장할 사용자 정보를 입력하세요: ')
        const req: Request = { body }
        await userController.saveUser(req, res)
      } else {
        console.log('잘못된 입력입니다. 다시 시도해주세요.')
      }

      console.log()
    }
  } finally {
    rl.close()
  }
}

main().catch(console.error)
