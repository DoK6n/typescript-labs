import { Outlet, createBrowserRouter } from 'react-router-dom'
import { HomeRoute } from '~/pages/home/ui'
import { ProductRoute } from '~/pages/product/ui'
import { ProductsRoute } from '~/pages/products/ui'
import { RootRouteError } from '~/shared/ui'

export const router = createBrowserRouter([
  {
    // element: <Layout />,
    children: [
      {
        path: '',
        element: <Outlet />,
        errorElement: <RootRouteError />,
        children: [HomeRoute, ProductsRoute, ProductRoute],
      },
    ],
  },
])
