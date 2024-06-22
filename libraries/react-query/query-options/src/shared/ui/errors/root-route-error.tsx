import { HTTPError } from 'ky'
import { useRouteError } from 'react-router-dom'

export function RootRouteError() {
  const error = useRouteError()

  if (error instanceof HTTPError) {
    return (
      <div>
        <h1>⚠️ {error.response.status}</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>⚠️ 404</h1>
    </div>
  )
}
