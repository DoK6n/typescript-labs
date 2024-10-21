import { Elysia } from 'elysia'
import { UserService } from './user.service'

export const UserController = new Elysia({ name: 'Controller.user' }) //
  .group('/user', app =>
    app //
      .use(UserService)
      .get('/:id', async ({ userService, params }) => {
        return await userService.getUserById(params.id)
      })
      .post('/', async ({ userService }) => {
        return await userService.createUser({
          name: 'John Doe',
          email: 'john.doe@example.com',
        })
      }),
  )
