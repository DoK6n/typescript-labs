import { Elysia, Static, t } from 'elysia'

export const createUserSchema = t.Object({
  name: t.String({ minLength: 2 }),
  email: t.String({ format: 'email' }),
})

export const createUserDto = new Elysia({ name: 'Dto.createUser' }).model({
  'user.create': createUserSchema,
})

export type CreateUserDto = Static<typeof createUserSchema>
