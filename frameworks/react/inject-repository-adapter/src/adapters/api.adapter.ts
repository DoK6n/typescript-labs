import ky, { KyResponse, Options } from 'ky'
import { ApiAdapter } from './api.adapter.type'

export const createKyAdapter = (defaultOptions: Options): ApiAdapter<KyResponse, Options> => {
  const client = ky.create(defaultOptions)

  return {
    get: async (url: string, options?: Options) => {
      return await client.get(url, options)
    },

    post: async (url: string, { data }: { data: unknown }, options?: Options) => {
      return await client.post(url, { json: data, ...options })
    },

    patch: async (url: string, { data }: { data: unknown }, options?: Options) => {
      return await client.patch(url, { json: data, ...options })
    },

    put: async (url: string, { data }: { data: unknown }, options?: Options) => {
      return await client.put(url, { json: data, ...options })
    },

    delete: async (url: string, options?: Options) => {
      return await client.delete(url, options)
    },
  }
}

export type KyApiAdapter = ReturnType<typeof createKyAdapter>
