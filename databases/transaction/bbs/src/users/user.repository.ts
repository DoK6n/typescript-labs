import Elysia from 'elysia'
import { pgModule } from '../database'
import { CreateUserDto } from './dto/create-user.dto'

type UserEntity = {
  id: string
  name: string
  email: string
}

export const UserRepository = new Elysia({ name: 'Repository.User' })
  .use(pgModule)
  .derive({ as: 'global' }, ({ db }) => ({
    userRepository: {
      async findById(id: string): Promise<UserEntity | null> {
        try {
          const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
          return user.rows[0]
        } finally {
          db.release()
        }
      },
      async create(data: CreateUserDto): Promise<UserEntity> {
        try {
          const user = await db.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [
            data.name,
            data.email,
          ])
          return user.rows[0]
        } finally {
          db.release()
        }
      },
    },
  }))
