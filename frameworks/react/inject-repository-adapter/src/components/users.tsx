import { useInject } from '../providers/injectable.provider'
import { useFetch } from '../hooks/use-fetch'
import { useReducer } from 'react'

const initialData = {
  page: 1,
  per_page: 1,
  total: 0,
  total_pages: 1,
  data: [],
  support: {
    url: '',
    text: '',
  },
}

export function Users() {
  const { userRepository } = useInject()

  const {
    data: users,
    isLoading,
    error,
  } = useFetch(userRepository.getAllUsers, { initialData, cacheKey: 'users' })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.data.map(user => (
          <li key={user.id}>
            {user.last_name} {user.first_name}
          </li>
        ))}
      </ul>
      <ToggleFetchCacheTestComponent />
    </div>
  )
}

function ToggleFetchCacheTestComponent() {
  const [isToggle, toggle] = useReducer(state => !state, false)

  return (
    <>
      <button onClick={toggle}>FetchCacheTest</button>
      {isToggle ? <FetchCacheTestComponent /> : null}
    </>
  )
}

function FetchCacheTestComponent() {
  const { userRepository } = useInject()
  const { hit } = useFetch(userRepository.getAllUsers, { cacheKey: 'users' })

  return <div>{hit ? 'hit' : 'not hit'}</div>
}
