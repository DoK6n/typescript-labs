import { Result } from '../result'
import { User, UserData, UserProps } from './user.entity'
import {
  DATABASE_ERROR,
  UNKNOWN_ERROR,
  USER_EMAIL_INVALID_ERROR,
  USER_ID_INVALID_TYPE_ERROR,
  USER_ID_REQUIRED_ERROR,
  USER_NAME_INVALID_ERROR,
  USER_NOT_FOUND_ERROR,
} from './user.error'
import { UserRepository } from './user.repository'

// 서비스 레이어
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserDetails(id: string): Promise<Result<UserData>> {
    const result = await this.userRepository.findById(id)
    if (result.isBusinessErrorGuard<USER_NOT_FOUND_ERROR>(result.error)) {
      return Result.fail<UserData, USER_NOT_FOUND_ERROR>(result.error!)
    }

    return Result.ok<UserData>(result.value)
  }

  async save(user: UserProps) {
    const newUserResult = User.create(user)

    if (
      newUserResult.isFailureGuard<
        | DATABASE_ERROR
        | UNKNOWN_ERROR
        | USER_ID_REQUIRED_ERROR
        | USER_ID_INVALID_TYPE_ERROR
        | USER_NAME_INVALID_ERROR
        | USER_EMAIL_INVALID_ERROR
      >(newUserResult.error)
    ) {
      return Result.fail<
        string,
        | DATABASE_ERROR
        | UNKNOWN_ERROR
        | USER_ID_REQUIRED_ERROR
        | USER_ID_INVALID_TYPE_ERROR
        | USER_NAME_INVALID_ERROR
        | USER_EMAIL_INVALID_ERROR
      >(newUserResult.error!)
    }

    const result = await this.userRepository.save(newUserResult.value.toJSON())

    if (result.isFailureGuard<DATABASE_ERROR | UNKNOWN_ERROR>(result.error)) {
      return Result.fail<string, DATABASE_ERROR | UNKNOWN_ERROR>(result.error!)
    }

    return Result.ok<string>(result.value)
  }
}
