import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { type RouteObject, type LoaderFunctionArgs, useNavigate } from 'react-router-dom'
import { typedjson, useTypedLoaderData } from 'remix-typedjson'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import { PageError } from '~/shared/ui'
import { Product } from '~/entities/products/ui'

export const ProductRoute: RouteObject = {
  path: '/products/:productId',
  loader,
  element: <ProductPage />,
}

async function loader({ params }: LoaderFunctionArgs) {
  return typedjson({ productId: params.productId ?? '' })
}

function ProductPage() {
  const { productId } = useTypedLoaderData<typeof loader>()
  const navigate = useNavigate()

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <PageError
              resetErrorBoundary={resetErrorBoundary}
              buttons={
                <button onClick={() => navigate('..', { relative: 'path' })}>Go to Back</button>
              }
            />
          )}
        >
          <Suspense fallback={<h2>Loading...</h2>}>
            <Product productId={productId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
