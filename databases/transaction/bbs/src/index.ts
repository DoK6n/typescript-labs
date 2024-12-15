import { Elysia } from 'elysia'
import { pgModule } from './database'
import { pool } from './pg-client'
import { UserController } from './users/user.controller'

const app = new Elysia()
  .use(UserController)
  .use(pgModule)
  .get('/', async ({ db }) => {
    try {
      const res = await db.query('SELECT $1::text as message', ['Hello world!'])
      const message = res.rows[0].message

      console.log('GET / ', message)

      return message
    } finally {
      db.release()
    }
  })
  .get('/now', async ({ db }) => {
    try {
      const res = await db.query<{ now: Date }>('SELECT NOW()')
      const now = res.rows[0].now
      const random = Math.floor(Math.random() * 9) + 1

      const response = { now: now.toISOString(), random }
      console.log('GET /now ', response)

      return response
    } finally {
      db.release()
    }
  })
  .listen(3000, ({ hostname, port }) => {
    console.log(`🦊 Elysia is running at http://${hostname}:${port}`)
  })

process.on('SIGINT', async () => {
  await pool.end()
  console.log('Server is stopping...')
  process.exit()
})
