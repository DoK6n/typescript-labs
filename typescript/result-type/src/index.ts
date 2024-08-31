import { Result } from './result'
import * as readline from 'readline'

// 타입 정의
interface UserProps {
  id: string
  name: string
  email: string
}

interface UserDetails extends UserProps {
  createdAt: Date
  lastLogin: Date
}

class User {
  private constructor(private props: UserProps) {}

  static create(props: UserProps): Result<User> {
    if (!props.name || props.name.length < 2 || props.name.length > 50) {
      return Result.fail<User>('이름은 2-50자 사이여야 합니다.')
    }
    if (!props.email || !props.email.includes('@')) {
      return Result.fail<User>('유효한 이메일 주소가 필요합니다.')
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
}

// 간단한 인메모리 데이터베이스
class InMemoryDatabase {
  private users: Map<string, UserProps> = new Map()

  async findOne(id: string): Promise<UserProps | null> {
    return this.users.get(id) || null
  }

  async save(user: UserProps): Promise<void> {
    this.users.set(user.id, user)
  }

  async findAll(): Promise<UserProps[]> {
    return Array.from(this.users.values())
  }
}

const database = {
  users: new InMemoryDatabase(),
}

// 레포지토리 레이어
class UserRepository {
  async findById(id: string): Promise<Result<User>> {
    try {
      const userData = await database.users.findOne(id)
      if (!userData) {
        return Result.fail<User>('사용자를 찾을 수 없습니다.')
      }
      const userResult = User.create(userData)
      if (userResult.isFailure) {
        return Result.fail<User>('유효하지 않은 사용자 데이터: ' + userResult.error)
      }
      return Result.ok<User>(userResult.value)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return Result.fail<User>('데이터베이스 오류: ' + error.message)
      }
      return Result.fail<User>('알 수 없는 오류가 발생했습니다.')
    }
  }
}

// 서비스 레이어
class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserDetails(id: string): Promise<Result<UserDetails>> {
    const userResult = await this.userRepository.findById(id)
    if (userResult.isFailure) {
      return Result.fail<UserDetails>(userResult.error!)
    }

    const user = userResult.value
    const userDetails: UserDetails = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(), // 실제로는 DB에서 가져와야 함
      lastLogin: new Date(), // 실제로는 DB에서 가져와야 함
    }
    return Result.ok<UserDetails>(userDetails)
  }
}

// 컨트롤러 레이어
interface Request {
  params: { id: string }
}

interface Response {
  status: (code: number) => Response
  json: (data: any) => void
}

class UserController {
  constructor(private userService: UserService) {}

  async getUser(req: Request, res: Response) {
    const result = await this.userService.getUserDetails(req.params.id)
    if (result.isFailure) {
      return res.status(400).json({ error: result.error })
    }
    res.json(result.value)
  }
}

// 사용 예시
async function main() {
  const userRepo = new UserRepository()
  const userService = new UserService(userRepo)
  const userController = new UserController(userService)

  // 테스트 데이터 추가
  await database.users.save({ id: '1', name: '홍길동', email: 'hong@example.com' })
  await database.users.save({ id: '2', name: '김철수', email: 'kimexample.com' })
  await database.users.save({ id: '3', name: '철', email: 'strongiron@example.com' })

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

  try {
    while (true) {
      const userId = await getUserInput('사용자 ID를 입력하세요: ')

      if (userId.toLowerCase() === 'q') {
        console.log('프로그램을 종료합니다.')
        break
      }

      // 컨트롤러 테스트
      const req: Request = { params: { id: userId } }
      const res: Response = {
        status: (code: number) => ({
          json: (data: any) => console.log('Status:', code, 'Data:', data),
          status: (code: number) => res,
        }),
        json: (data: any) => console.log('Response:', data),
      }

      await userController.getUser(req, res)

      console.log()
    }
  } finally {
    rl.close()
  }
}

main().catch(console.error)
