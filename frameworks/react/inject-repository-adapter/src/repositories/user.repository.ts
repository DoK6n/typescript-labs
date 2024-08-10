import { KyResponse } from 'ky'
import { ApiAdapter } from '../adapters/api.adapter.type'

export interface UserRequestDto {
  name: string
  job: string
}

export interface CreateUserResponseDto extends UserRequestDto {}
export interface UpdateUserResponseDto extends UserRequestDto {}

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export interface UserSupport {
  url: string
  text: string
}

export interface UsersResponseDto {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
  support: UserSupport
}

export interface UserResponseDto {
  data: User
  support: UserSupport
}

export const createUserRepository = (httpClient: ApiAdapter<KyResponse>) => ({
  getAllUsers: async () => {
    const response = await httpClient.get('users')
    return response.json<UsersResponseDto>()
  },

  getUserById: async ({ id }: { id: string }) => {
    const response = await httpClient.get(`users/${id}`)
    return response.json<UserResponseDto>()
  },

  createUser: async ({ data }: { data: CreateUserResponseDto }) => {
    const response = await httpClient.post('users', { data })
    return response.json<CreateUserResponseDto>()
  },

  updateUser: async ({ id, data }: { id: string; data: UpdateUserResponseDto }) => {
    const response = await httpClient.put(`users/${id}`, { data })
    return response.json<UpdateUserResponseDto>()
  },

  deleteUser: async ({ id }: { id: string }) => {
    const response = await httpClient.delete(`users/${id}`)
    return response.json<void>()
  },
})
