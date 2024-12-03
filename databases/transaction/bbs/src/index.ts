import { Elysia } from 'elysia'
import { pgModule } from './database'
import { pool } from './pg-client'

const app = new Elysia()
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

      console.log('GET /now ', now.toISOString())

      return now.toISOString()
    } finally {
      db.release()
    }
  })
  .listen(3000, ({ hostname, port }) => {
    console.log(`🦊 Elysia is running at ${hostname}:${port}`)
  })

process.on('SIGINT', async () => {
  await app.stop()
  await pool.end()
  console.log('Server is stopping...')
  process.exit()
})
