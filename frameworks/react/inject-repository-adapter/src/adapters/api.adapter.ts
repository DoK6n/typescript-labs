import ky, { KyResponse, Options } from 'ky'
import { ApiAdapter } from './api.adapter.type'

export const createKyAdapter = (defaultOptions: Options): ApiAdapter<KyResponse> => {
  const client = ky.create(defaultOptions)

  return {
    get: async (url: string) => {
      return await client.get(url)
    },

    post: async (url: string, { data }: { data: unknown }) => {
      return await client.post(url, { json: data })
    },

    patch: async (url: string, { data }: { data: unknown }) => {
      return await client.patch(url, { json: data })
    },

    put: async (url: string, { data }: { data: unknown }) => {
      return await client.put(url, { json: data })
    },

    delete: async (url: string) => {
      return await client.delete(url)
    },
  }
}
