import { Elysia } from 'elysia'
import { pool } from './pg-client'

export const pgModule = new Elysia({ name: 'DB.pg' }) //
  .derive({ as: 'global' }, async () => {
    const db = await pool.connect()

    return {
      db,
    }
  })
  .onAfterHandle(({ db }) => {
    console.log('onAfterHandle')
    // db.release() // 커넥션 반환
  })
