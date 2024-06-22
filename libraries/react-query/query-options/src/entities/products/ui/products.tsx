import { useSuspenseQuery } from '@tanstack/react-query'
import { productQueries } from '../api'
import { Link } from 'react-router-dom'

export function Products() {
  const { data: products } = useSuspenseQuery(
    productQueries.products({ searchParams: { limit: 10, page: 1 } }),
  )

  return (
    <div style={style.block}>
      <div style={style.content}>
        {products.data.map(product => (
          <div key={product.id} style={style.card}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
            <p>⭐ {product.rating.rate}</p>
            <p>$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const style: Record<'block' | 'content' | 'card', React.CSSProperties> = {
  block: {
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1rem',
    width: 200,
    height: 200,
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
  },
}
