import { Elysia, t } from 'elysia'
import { UserService } from './user.service'
import { createUserDto } from './dto/create-user.dto'
import { idParamDto } from './dto/id-param.dto'

export const UserController = new Elysia({ name: 'Controller.user' }).group('/user', app =>
  app
    .use(UserService)

    .use(idParamDto)
    .get(
      '/:id',
      async ({ userService, params }) => {
        return await userService.getUserById(params.id)
      },
      {
        params: 'param.id',
      },
    )

    .use(createUserDto)
    .post(
      '/',
      async ({ userService, body }) => {
        return await userService.createUser(body)
      },
      {
        body: 'user.create',
      },
    ),
)
