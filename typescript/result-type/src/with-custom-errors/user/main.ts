import { database } from './user.db'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { Request, Response } from './type'
import { User } from './user.entity'
import { createRl, createRlAction } from '../../helpers'

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

  const rl = createRl()

  try {
    const userController = new UserController(new UserService(new UserRepository(database)))

    while (true) {
      const action = createRlAction(rl)
      const input = await action.getUserInput(
        '어떤 작업을 하시겠습니까? (1: 사용자 조회, 2: 새로운 사용자 저장, q: 종료): ',
      )

      if (input.toLowerCase() === 'q') {
        console.log('프로그램을 종료합니다.')
        break
      }

      if (input === '1') {
        const userId = await action.getUserInput('조회할 사용자 ID를 입력하세요: ')
        const req: Request = { params: { id: userId } }
        const response = await userController.getUser(req)
        console.log(response)
      } else if (input === '2') {
        const body = await action.inputCreateUser('저장할 사용자 정보를 입력하세요: ')
        const req: Request = { body }
        const response = await userController.saveUser(req)
        console.log(response)
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
