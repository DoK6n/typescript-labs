import { Result } from '../result'
import {
  USER_EMAIL_INVALID_ERROR,
  USER_ID_INVALID_TYPE_ERROR,
  USER_ID_REQUIRED_ERROR,
  USER_NAME_INVALID_ERROR,
} from './user.error'

// 타입 정의
export type UserData = {
  id: string
  name: string
  email: string
  createdAt: Date
  lastLogin: Date
}

export type UserProps = Omit<UserData, 'createdAt' | 'lastLogin'>

export class User {
  private constructor(private props: UserProps) {}

  static create(props: UserProps): Result<User> {
    if (!props.id) {
      return Result.fail<User, USER_ID_REQUIRED_ERROR>(USER_ID_REQUIRED_ERROR)
    } else if (typeof props.id !== 'string') {
      return Result.fail<User, USER_ID_INVALID_TYPE_ERROR>(USER_ID_INVALID_TYPE_ERROR)
    } else if (!props.name || props.name.length < 2 || props.name.length > 50) {
      return Result.fail<User, USER_NAME_INVALID_ERROR>(USER_NAME_INVALID_ERROR)
    } else if (!props.email || !props.email.includes('@')) {
      return Result.fail<User, USER_EMAIL_INVALID_ERROR>(USER_EMAIL_INVALID_ERROR)
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

  toJSON(): UserProps {
    return { ...this.props }
  }

  *[Symbol.iterator]() {
    yield* Object.values(this.props)
  }
}
