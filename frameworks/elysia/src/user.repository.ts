import { Elysia } from 'elysia'

type TCreateUserDto = {
  name: string
  email: string
}

const DB = new Elysia({ name: 'Database' }) //
  .derive({ as: 'global' }, () => ({
    db: {
      user: {
        create: async ({ data }: { data: TCreateUserDto }) => {
          return {
            id: crypto.randomUUID(),
            ...data,
            isBlocked: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        },
        findUnique: async ({ where }: { where: { id: string } }) => {
          return {
            id: where.id,
            name: 'John Doe',
            email: 'john.doe@example.com',
            isBlocked: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        },
      },
    },
  }))

export const UserRepository = new Elysia({ name: 'Repository.User' }) //
  .use(DB)
  .derive({ as: 'global' }, ({ db }) => ({
    userRepository: {
      async findById(id: string) {
        return db.user.findUnique({
          where: {
            id,
          },
        })
      },
      async create(data: any) {
        return db.user.create({
          data,
        })
      },
    },
  }))
