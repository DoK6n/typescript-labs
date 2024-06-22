export interface Pagination<T> {
  data: T
  total: number
  totalPages: number
  skip: number
  limit: number
}

export interface RequestOptions<Q = unknown, B = unknown, P = unknown> {
  query: Q
  body: B
  pathParams: P
}

export interface RequestOptionSearchParams<Q> {
  searchParams: Q
}

export interface RequestOptionBody<B> {
  body: B
}

export interface RequestOptionPathParams<P> {
  pathParams: P
}
