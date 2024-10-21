import { Static, t } from 'elysia'

export class ReadUserDto {
  private constructor(
    public name: string,
    public email: string,
    public isBlocked: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  static from({ name, email, isBlocked, createdAt, updatedAt }: TReadUser) {
    return new ReadUserDto(name, email, isBlocked, createdAt, updatedAt)
  }

  static get model() {
    return t.Object({
      name: t.String(),
      email: t.String(),
      isBlocked: t.Boolean(),
      createdAt: t.Date(),
      updatedAt: t.Date(),
    })
  }
}

export type TReadUser = Static<typeof ReadUserDto.model>
