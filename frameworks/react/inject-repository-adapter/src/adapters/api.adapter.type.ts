export interface ApiAdapter<ResponseType, Options = Record<string, unknown>> {
  get: (url: string, options?: Options) => Promise<ResponseType>
  post: (
    url: string,
    {
      data,
    }: {
      data: unknown
    },
    options?: Options,
  ) => Promise<ResponseType>
  patch: (
    url: string,
    {
      data,
    }: {
      data: unknown
    },
    options?: Options,
  ) => Promise<ResponseType>
  put: (
    url: string,
    {
      data,
    }: {
      data: unknown
    },
    options?: Options,
  ) => Promise<ResponseType>
  delete: (url: string, options?: Options) => Promise<ResponseType>
}
