import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { BagIcon, ChatIcon, CloseIcon, MinusIcon, PlusIcon } from '../components/Icons'
import { formatPrice, WHATSAPP_URL } from '../data/products'
import '../styles/Cart.css'

const deliveryOptions = [
  { id: 'lagos', label: 'Lagos (1–2 days)', fee: 2500 },
  { id: 'outside', label: 'Outside Lagos (2–5 days)', fee: 4500 },
  { id: 'pickup', label: 'Pickup (by appointment)', fee: 0 },
]

const FREE_DELIVERY = 30000

export default function Cart() {
  const { lines, subtotal, updateQty, removeFromCart, clearCart } = useShop()
  const [delivery, setDelivery] = useState('lagos')
  const [placed, setPlaced] = useState(null)

  const option = deliveryOptions.find((d) => d.id === delivery)
  const fee = delivery === 'lagos' && subtotal >= FREE_DELIVERY ? 0 : option.fee
  const total = subtotal + fee

  const placeOrder = () => {
    setPlaced({ ref: `SB-${Math.floor(10000 + Math.random() * 90000)}`, total })
    clearCart()
  }

  if (placed) {
    return (
      <div className="container cart-done">
        <div className="done-card">
          <p className="script">thank you, bestie!</p>
          <h1 className="title">Order received</h1>
          <p className="lead">
            Your order <strong>{placed.ref}</strong> ({formatPrice(placed.total)}) has been saved. In the live site,
            you’d be sent payment details and we’d confirm on WhatsApp.
          </p>
          <div className="done-actions">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
              <ChatIcon /> Confirm on WhatsApp
            </a>
            <Link to="/shop" className="btn btn-outline">
              Keep shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <section className="page-banner">
        <p className="script">almost yours</p>
        <h1 className="title">Your shopping bag</h1>
      </section>

      <div className="container">
        {lines.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">
              <BagIcon />
            </span>
            <p className="script">Your bag is feeling lonely</p>
            <Link to="/shop" className="btn btn-primary">
              Find something cute
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              <div className="cart-row cart-row-head">
                <span>Item</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {lines.map((line) => (
                <div className="cart-row" key={line.key}>
                  <div className="cart-item">
                    <img src={line.product.images[0]} alt={line.product.name} />
                    <div>
                      <Link to={`/product/${line.product.id}`} className="line-name">
                        {line.product.name}
                      </Link>
                      <p className="line-variant">{[line.color, line.size].filter(Boolean).join(' · ')}</p>
                      <p className="line-variant">{formatPrice(line.product.price)} each</p>
                    </div>
                  </div>
                  <div className="qty">
                    <button aria-label="Decrease" onClick={() => updateQty(line.key, line.qty - 1)}>
                      <MinusIcon />
                    </button>
                    <span>{line.qty}</span>
                    <button aria-label="Increase" onClick={() => updateQty(line.key, line.qty + 1)}>
                      <PlusIcon />
                    </button>
                  </div>
                  <div className="cart-line-total">
                    <strong>{formatPrice(line.product.price * line.qty)}</strong>
                    <button aria-label={`Remove ${line.product.name}`} onClick={() => removeFromCart(line.key)}>
                      <CloseIcon />
                    </button>
                  </div>
                </div>
              ))}
              <Link to="/shop" className="link-arrow cart-continue">
                ← Continue shopping
              </Link>
            </div>

            <aside className="summary">
              <h3>Order summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <fieldset className="delivery">
                <legend>Delivery</legend>
                {deliveryOptions.map((d) => (
                  <label key={d.id} className={`delivery-opt ${delivery === d.id ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === d.id}
                      onChange={() => setDelivery(d.id)}
                    />
                    <span>{d.label}</span>
                    <strong>{d.fee ? formatPrice(d.fee) : 'Free'}</strong>
                  </label>
                ))}
              </fieldset>

              <div className="summary-row">
                <span>Delivery fee</span>
                <span>{fee ? formatPrice(fee) : 'Free'}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button className="btn btn-primary btn-block" onClick={placeOrder}>
                Place order
              </button>
              <p className="summary-note">Demo checkout — no payment is taken.</p>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
