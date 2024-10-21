import { Static, t } from 'elysia'
import { User } from './user'

export class CreateUserDto {
  private constructor(public id: string, public name: string, public email: string) {}

  static from(entity: User) {
    return new CreateUserDto(entity.id, entity.name, entity.email)
  }

  static get model() {
    return t.Object({
      id: t.String(),
      name: t.String(),
      email: t.String(),
    })
  }
}

export type TCreateUser = Static<typeof CreateUserDto.model>
