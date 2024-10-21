import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { productQueries } from '../api'
import { Link } from 'react-router-dom'
import { useCallback, useEffect } from 'react'

export function Products() {
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(productQueries.products())

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching ||
      !hasNextPage
    )
      return
    fetchNextPage()
  }, [isFetching, hasNextPage, fetchNextPage])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div style={style.block}>
      <div style={style.content}>
        {products.pages.map(group =>
          group.data.map(product => (
            <div key={product.id} style={style.card}>
              <Link to={`/products/${product.id}`}>
                <h3>{product.title}</h3>
              </Link>
              <p>⭐ {product.rating.rate}</p>
              <p>$ {product.price}</p>
            </div>
          )),
        )}
      </div>
      {isFetchingNextPage && <p>로딩 중...</p>}
      {!hasNextPage && <p>더 이상 상품이 없습니다.</p>}
    </div>
  )
}

const style: Record<'block' | 'content' | 'card', React.CSSProperties> = {
  block: {
    padding: '1rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    height: '200px',
  },
}
