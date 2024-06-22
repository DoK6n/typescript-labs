import ky from 'ky'

export const apiClient = ky.create({
  prefixUrl: 'http://localhost:5173',
  retry: {
    limit: 3,
  },
})
