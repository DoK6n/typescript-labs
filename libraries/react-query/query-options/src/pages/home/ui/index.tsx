import { Link, type RouteObject } from 'react-router-dom'

export const HomeRoute: RouteObject = {
  path: '/',
  element: <HomePage />,
}

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/products">Products</Link>
    </div>
  )
}
