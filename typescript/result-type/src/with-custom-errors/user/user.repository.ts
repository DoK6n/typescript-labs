import { Result } from '../result'
import { Database } from './user.db'
import { User, UserData, UserProps } from './user.entity'
import {
  DATABASE_ERROR,
  UNKNOWN_ERROR,
  USER_INVALID_DATA_ERROR,
  USER_NOT_FOUND_ERROR,
} from './user.error'

// 레포지토리 레이어
export class UserRepository {
  constructor(private database: Database) {}

  async findById(id: string): Promise<Result<UserData>> {
    try {
      const userData = await this.database.users.findOne(id)
      if (!userData) {
        return Result.fail<UserData, USER_NOT_FOUND_ERROR>(USER_NOT_FOUND_ERROR)
      }
      return Result.ok<UserData>(userData)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return Result.fail<UserData, DATABASE_ERROR>(DATABASE_ERROR)
      }

      return Result.fail<UserData, UNKNOWN_ERROR>(UNKNOWN_ERROR)
    }
  }

  async save(user: UserProps): Promise<Result<string>> {
    try {
      const id = await this.database.users.save(user)
      return Result.ok<string>(id)
    } catch (error) {
      if (error instanceof Error) {
        return Result.fail<string, DATABASE_ERROR>(DATABASE_ERROR)
      }
      return Result.fail<string, UNKNOWN_ERROR>(UNKNOWN_ERROR)
    }
  }
}
