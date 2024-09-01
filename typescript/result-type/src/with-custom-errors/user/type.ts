export interface Request<Body = any> {
  params?: { id: string }
  body?: Body
}

export interface Response {
  status: (code: number) => Response
  json: (data: any) => void
}
