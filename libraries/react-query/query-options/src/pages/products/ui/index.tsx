import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type RouteObject } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { Products } from '~/entities/products/ui'
import { PageError } from '~/shared/ui'

export const ProductsRoute: RouteObject = {
  path: '/products',
  element: <ProductsPage />,
}

function ProductsPage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <PageError resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <Suspense fallback={<h2>Loading...</h2>}>
            <Products />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
