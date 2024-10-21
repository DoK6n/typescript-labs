import { Elysia } from 'elysia'
import { UserRepository } from './user.repository'

type TCreateUserDto = {
  name: string
  email: string
}

const CreateUserDto = new Elysia({ name: 'DTO.user.create' }) //
  .derive({ as: 'global' }, () => ({
    CreateUserDto: {
      from(dto: TCreateUserDto) {
        return dto
      },
    },
  }))

type TReadUserDto = {
  id: string
  name: string
  email: string
  isBlocked: boolean
  createdAt: Date
  updatedAt: Date
}

const ReadUserDTO = new Elysia({ name: 'DTO.user.read' }) //
  .derive({ as: 'global' }, () => ({
    ReadUserDto: {
      from(dto: TReadUserDto) {
        return dto
      },
    },
  }))

export const UserService = new Elysia({ name: 'Service.user' }) //
  .use(CreateUserDto)
  .use(ReadUserDTO)
  .use(UserRepository)
  .derive({ as: 'global' }, ({ userRepository, CreateUserDto, ReadUserDto }) => ({
    userService: {
      getUserById: async (id: string) => {
        const user = await userRepository.findById(id)
        return ReadUserDto.from(user)
      },
      createUser: async (user: { name: string; email: string }) => {
        const newUser = await userRepository.create(user)
        return CreateUserDto.from(newUser)
      },
    },
  }))
