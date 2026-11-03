import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import { getProduct } from '../data/products'
import '../styles/ProductCard.css'

export default function Wishlist() {
  const { wishlist } = useShop()
  const items = wishlist.map(getProduct).filter(Boolean)

  return (
    <div>
      <section className="page-banner">
        <p className="script">saved for later</p>
        <h1 className="title">Your wishlist</h1>
      </section>
      <div className="container section">
        {items.length ? (
          <div className="product-grid">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="empty" style={{ textAlign: 'center' }}>
            <p className="script" style={{ fontSize: '2.4rem', color: 'var(--rose-deep)', fontFamily: 'var(--font-script)' }}>
              no favourites yet
            </p>
            <p style={{ color: 'var(--muted)', margin: '8px 0 24px' }}>Tap the heart on any piece to save it here.</p>
            <Link to="/shop" className="btn btn-primary">
              Browse the shop
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
