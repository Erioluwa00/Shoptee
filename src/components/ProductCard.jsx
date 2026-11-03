import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../data/products'
import { HeartIcon, PlusIcon } from './Icons'
import '../styles/ProductCard.css'

export default function ProductCard({ product, style }) {
  const { toggleWishlist, isWished, addToCart } = useShop()
  const wished = isWished(product.id)
  const [first, second] = product.images

  const quickAdd = () =>
    addToCart(product.id, {
      color: product.colors[0]?.name,
      size: product.sizes ? product.sizes[1] : null,
    })

  return (
    <article className="pcard fade-up" style={style}>
      <div className="pcard-media">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <img src={first} alt={product.name} className="pcard-img" loading="lazy" />
          {second && <img src={second} alt="" className="pcard-img pcard-img-alt" loading="lazy" />}
        </Link>

        {product.badge && <span className="pcard-badge">{product.badge}</span>}

        <button
          className={`pcard-wish ${wished ? 'is-wished' : ''}`}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
          onClick={() => toggleWishlist(product.id)}
        >
          <HeartIcon filled={wished} />
        </button>

        <button className="pcard-quick" onClick={quickAdd}>
          <PlusIcon /> Quick add
        </button>
      </div>

      <div className="pcard-body">
        <Link to={`/product/${product.id}`} className="pcard-name">
          {product.name}
        </Link>
        <div className="pcard-meta">
          <span className="pcard-price">
            {formatPrice(product.price)}
            {product.compareAt && <s>{formatPrice(product.compareAt)}</s>}
          </span>
          <span className="pcard-swatches" aria-label={`${product.colors.length} colours`}>
            {product.colors.map((c) => (
              <span key={c.name} className="swatch-dot" style={{ background: c.hex }} title={c.name} />
            ))}
          </span>
        </div>
      </div>
    </article>
  )
}
