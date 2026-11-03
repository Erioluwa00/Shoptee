import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../data/products'
import { BagIcon, CloseIcon, MinusIcon, PlusIcon } from './Icons'
import '../styles/CartDrawer.css'

const FREE_DELIVERY = 30000

export default function CartDrawer() {
  const { lines, subtotal, updateQty, removeFromCart, cartOpen, setCartOpen } = useShop()
  const progress = Math.min(100, (subtotal / FREE_DELIVERY) * 100)
  const close = () => setCartOpen(false)

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className={`drawer ${cartOpen ? 'open' : ''}`} aria-hidden={!cartOpen}>
      <div className="drawer-backdrop" onClick={close} />
      <aside className="drawer-panel" role="dialog" aria-label="Shopping bag">
        <div className="drawer-head">
          <h3>
            Your bag <span className="script">xoxo</span>
          </h3>
          <button className="icon-btn" aria-label="Close bag" onClick={close}>
            <CloseIcon />
          </button>
        </div>

        {lines.length > 0 && (
          <div className="drawer-progress">
            <p>
              {subtotal >= FREE_DELIVERY
                ? 'Yay! You unlocked free Lagos delivery ♡'
                : `You're ${formatPrice(FREE_DELIVERY - subtotal)} away from free Lagos delivery`}
            </p>
            <div className="bar">
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="drawer-body">
          {lines.length === 0 ? (
            <div className="drawer-empty">
              <div className="drawer-empty-icon">
                <BagIcon />
              </div>
              <p className="script">Your bag is empty, bestie</p>
              <Link to="/shop" className="btn btn-primary" onClick={close}>
                Start shopping
              </Link>
            </div>
          ) : (
            lines.map((line) => (
              <div className="line" key={line.key}>
                <img src={line.product.images[0]} alt={line.product.name} />
                <div className="line-info">
                  <Link to={`/product/${line.product.id}`} onClick={close} className="line-name">
                    {line.product.name}
                  </Link>
                  <span className="line-variant">
                    {[line.color, line.size].filter(Boolean).join(' · ')}
                  </span>
                  <div className="line-row">
                    <div className="qty qty-sm">
                      <button aria-label="Decrease" onClick={() => updateQty(line.key, line.qty - 1)}>
                        <MinusIcon />
                      </button>
                      <span>{line.qty}</span>
                      <button aria-label="Increase" onClick={() => updateQty(line.key, line.qty + 1)}>
                        <PlusIcon />
                      </button>
                    </div>
                    <span className="line-price">{formatPrice(line.product.price * line.qty)}</span>
                  </div>
                  <button className="line-remove" onClick={() => removeFromCart(line.key)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-total">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className="drawer-note">Delivery fee calculated at checkout.</p>
            <Link to="/cart" className="btn btn-primary btn-block" onClick={close}>
              Checkout
            </Link>
            <button className="drawer-continue" onClick={close}>
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
