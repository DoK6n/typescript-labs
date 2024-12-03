import { Pool } from 'pg'

export const pool = new Pool({
  user: 'dbuser',
  host: 'localhost',
  database: 'mydb',
  password: 'secretpassword',
  port: 5432,

  max: 20, // 최대 클라이언트 수
  idleTimeoutMillis: 30000, // 유휴 연결 타임아웃
  connectionTimeoutMillis: 2000, // 연결 타임아웃

  // 쿼리 로깅 추가
  query_timeout: 10000,
  statement_timeout: 10000,
  // log: (msg: string) => console.log(`PG | [${new Date().toLocaleString()}] ${msg}`),
  // 모든 쿼리를 로깅하기 위한 이벤트 리스너
})

pool.connect(err => {
  if (err) {
    console.log('Failed to connect db ' + err)
  } else {
    console.log('Connect to db done!')
  }
})
