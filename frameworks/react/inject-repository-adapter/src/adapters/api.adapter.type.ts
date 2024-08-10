export interface ApiAdapter<ResponseType> {
  get: (url: string) => Promise<ResponseType>
  post: (
    url: string,
    {
      data,
    }: {
      data: unknown
    },
  ) => Promise<ResponseType>
  patch: (
    url: string,
    {
      data,
    }: {
      data: unknown
    },
  ) => Promise<ResponseType>
  put: (
    url: string,
    {
      data,
    }: {
      data: unknown
    },
  ) => Promise<ResponseType>
  delete: (url: string) => Promise<ResponseType>
}
