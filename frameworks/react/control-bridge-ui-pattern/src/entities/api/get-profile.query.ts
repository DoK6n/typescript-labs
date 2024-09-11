import useSWR from 'swr'
import { api } from './profile'

export const useGetProfileQuery = (id: string) => {
  const { data, ...swrResponse } = useSWR(['/profile', id], ([_, _id]) => api.getProfile(_id), {
    fallbackData: {
      id: id,
      name: '',
      age: 0,
      gender: '',
      email: '',
      skills: '',
      yearsOfExperience: 0,
      position: '',
      point: 0,
      createdAt: '',
    },
  })

  return {
    profile: data,
    ...swrResponse,
  }
}
