import { Result, TryCatch } from '../result'
import { Request } from './type'
import { UserData, UserProps } from './user.entity'
import {
  DATABASE_ERROR,
  UNKNOWN_ERROR,
  USER_EMAIL_INVALID_ERROR,
  USER_ID_INVALID_TYPE_ERROR,
  USER_ID_REQUIRED_ERROR,
  USER_NAME_INVALID_ERROR,
  USER_NOT_FOUND_ERROR,
} from './user.error'
import { UserService } from './user.service'

// 컨트롤러 레이어
export class UserController {
  constructor(private userService: UserService) {}

  async getUser(
    req: Request,
  ): Promise<TryCatch<UserData, USER_NOT_FOUND_ERROR | USER_ID_REQUIRED_ERROR>> {
    const id = req.params?.id

    if (!id) {
      return USER_ID_REQUIRED_ERROR
    }

    const result = await this.userService.getUserDetails(id)

    if (result.isBusinessErrorGuard<USER_NOT_FOUND_ERROR>(result.error)) {
      return result.error
    }

    return Result.createResponse(result.value)
  }

  async saveUser(
    req: Request<UserProps>,
  ): Promise<
    TryCatch<
      string,
      | DATABASE_ERROR
      | UNKNOWN_ERROR
      | USER_ID_REQUIRED_ERROR
      | USER_ID_INVALID_TYPE_ERROR
      | USER_NAME_INVALID_ERROR
      | USER_EMAIL_INVALID_ERROR
    >
  > {
    const body = req.body

    if (!body) {
      return USER_ID_REQUIRED_ERROR
    }

    const result = await this.userService.save(body)

    if (
      result.isFailureGuard<
        | DATABASE_ERROR
        | UNKNOWN_ERROR
        | USER_ID_REQUIRED_ERROR
        | USER_ID_INVALID_TYPE_ERROR
        | USER_NAME_INVALID_ERROR
        | USER_EMAIL_INVALID_ERROR
      >(result.error)
    ) {
      return result.error
    }

    return Result.createResponse(result.value)
  }
}
