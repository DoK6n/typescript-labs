import { Elysia } from 'elysia'
import { UserRepository } from './user.repository'

export const UserService = new Elysia({ name: 'Service.user' })
  .use(UserRepository)

  .derive({ as: 'scoped' }, ({ userRepository }) => ({
    userService: {
      getUserById: async (id: string) => {
        const user = await userRepository.findById(id)
        return user
      },
      createUser: async (user: { name: string; email: string }) => {
        const newUser = await userRepository.create(user)
        return newUser
      },
    },
  }))
