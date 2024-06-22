import { useSuspenseQuery } from '@tanstack/react-query'
import { productQueries } from '../api'
import { Link } from 'react-router-dom'

interface ProductProps {
  productId: string
}
export function Product({ productId }: ProductProps) {
  const { data: product } = useSuspenseQuery(productQueries.product({ productId }))

  return (
    <div style={style.container}>
      <div style={style.navbar}>
        <Link to='..' relative='path' style={{ color: 'inherit' }}>
          ←
        </Link>
        <p>{product.title}</p>
        <p />
      </div>
      <div style={style.imageContainer}>
        <img src={product.image} alt={product.title} width={200} />
      </div>
      <p>{product.description}</p>
      <p>$ {product.price}</p>
      <p>⭐ {product.rating.rate}</p>
    </div>
  )
}

const style: Record<'container' | 'navbar' | 'imageContainer', React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}
