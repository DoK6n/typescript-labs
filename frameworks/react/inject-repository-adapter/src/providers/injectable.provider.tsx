import { createContext, useContext } from 'react'
import { createKyAdapter } from '../adapters/api.adapter'
import { createUserRepository } from '../repositories/user.repository'

const apiAdapter = createKyAdapter({
  prefixUrl: 'https://reqres.in/api',
})

const userRepository = createUserRepository(apiAdapter)

const InjectableContext = createContext({
  userRepository,
})

export function InjectableProvider({ children }: { children: React.ReactNode }) {
  return (
    <InjectableContext.Provider value={{ userRepository }}>{children}</InjectableContext.Provider>
  )
}

export const useInject = () => {
  const value = useContext(InjectableContext)
  if (!value) {
    throw new Error('useInject must be used within a InjectableProvider')
  }
  return value
}
