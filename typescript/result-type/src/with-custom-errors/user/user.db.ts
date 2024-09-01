import type { UserData, UserProps } from './user.entity'

// 간단한 인메모리 데이터베이스
class InMemoryDatabase {
  private users: Map<string, UserData> = new Map()

  async findOne(id: string): Promise<UserData | null> {
    return this.users.get(id) || null
  }

  async save(user: UserProps): Promise<UserData['id']> {
    try {
      if (this.users.has(user.id)) {
        throw new Error('이미 존재하는 사용자 ID입니다.')
      } else if (typeof user.id !== 'string') {
        throw new Error('사용자 ID는 문자열이어야 합니다.')
      }

      const createdAt = new Date()
      const lastLogin = new Date()

      this.users.set(user.id, { ...user, createdAt, lastLogin })

      const savedUser = this.users.get(user.id)

      if (!savedUser) {
        throw new Error('사용자를 저장할 수 없습니다.')
      }

      return savedUser.id
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('데이터베이스 오류: ' + error.message)
      }
      throw new Error('알 수 없는 오류가 발생했습니다.')
    }
  }

  async findAll(): Promise<UserData[]> {
    return Array.from(this.users.values())
  }

  async deleteUser(id: string): Promise<UserData['id'] | null> {
    const errorChance = Math.random()

    if (errorChance < 0.1) {
      throw new Error('데이터베이스 연결 오류: 서버에 연결할 수 없습니다.')
    } else if (errorChance < 0.2) {
      throw new Error('외래 키 제약 조건 위반: 이 사용자와 연관된 데이터가 존재합니다.')
    } else if (errorChance < 0.3) {
      throw new Error('권한 오류: 사용자를 삭제할 권한이 없습니다.')
    } else if (errorChance < 0.4) {
      throw new Error('트랜잭션 오류: 데드락이 발생했습니다.')
    } else if (errorChance < 0.5) {
      throw new Error('리소스 오류: 디스크 공간이 부족합니다.')
    }

    this.users.delete(id)
    return this.users.get(id)?.id ?? null
  }
}

export const database = {
  users: new InMemoryDatabase(),
}

export type Database = typeof database
