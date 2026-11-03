import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, ShieldIcon } from '../components/Icons'
import { formatPrice } from '../data/products'
import '../styles/Cart.css'

const deliveryOptions = [
  { id: 'lagos', label: 'Lagos', eta: '1–2 working days', fee: 2500 },
  { id: 'outside', label: 'Outside Lagos', eta: '2–5 working days', fee: 4500 },
  { id: 'pickup', label: 'Pickup', eta: 'We’ll email you a pickup time', fee: 0 },
]

const paymentOptions = [
  { id: 'card', label: 'Debit / credit card', note: 'Visa, Mastercard, Verve' },
  { id: 'transfer', label: 'Bank transfer', note: 'Pay into a one-time account number' },
  { id: 'ussd', label: 'USSD', note: 'Pay with your bank’s USSD code' },
]

const states = [
  'Abia', 'Abuja (FCT)', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River',
  'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
]

const FREE_DELIVERY = 30000

export default function Cart() {
  const { lines, subtotal, count, updateQty, removeFromCart, clearCart } = useShop()
  const [delivery, setDelivery] = useState('lagos')
  const [payment, setPayment] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [order, setOrder] = useState(null)

  const option = deliveryOptions.find((d) => d.id === delivery)
  const fee = delivery === 'lagos' && subtotal >= FREE_DELIVERY ? 0 : option.fee
  const total = subtotal + fee

  const placeOrder = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setProcessing(true)
    setTimeout(() => {
      setOrder({
        ref: `SB-${Math.floor(10000 + Math.random() * 90000)}`,
        total,
        count,
        name: data.firstName,
        email: data.email,
        delivery: option,
        address: delivery === 'pickup' ? null : `${data.address}, ${data.city}, ${data.state}`,
        payment: paymentOptions.find((p) => p.id === payment).label,
      })
      clearCart()
      setProcessing(false)
      window.scrollTo(0, 0)
    }, 1400)
  }

  if (order) {
    return (
      <div className="container cart-done">
        <div className="done-card">
          <span className="done-check" aria-hidden="true">✓</span>
          <p className="script">thank you, {order.name}!</p>
          <h1 className="title">Your order is confirmed</h1>
          <p className="lead">
            We’ve sent a receipt to <strong>{order.email}</strong>. You’ll get email updates when your order ships.
          </p>
          <dl className="done-details">
            <div>
              <dt>Order number</dt>
              <dd>{order.ref}</dd>
            </div>
            <div>
              <dt>Amount paid</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>{order.payment}</dd>
            </div>
            <div>
              <dt>{order.address ? 'Delivering to' : 'Delivery'}</dt>
              <dd>{order.address ?? 'Pickup — we’ll email you a time'}</dd>
            </div>
          </dl>
          <div className="done-actions">
            <Link to="/shop" className="btn btn-primary">
              Keep shopping
            </Link>
          </div>
          <p className="summary-note">Demo checkout — no real payment was taken.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <section className="page-banner">
        <p className="script">almost yours</p>
        <h1 className="title">Checkout</h1>
        <p className="crumbs">
          <Link to="/shop">Shop</Link> / Bag / Checkout
        </p>
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
            <form id="checkout" className="checkout" onSubmit={placeOrder}>
              <section className="co-block">
                <h3>
                  <span className="co-step">1</span> Your bag <small>({count})</small>
                </h3>
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
                      <button type="button" aria-label="Decrease" onClick={() => updateQty(line.key, line.qty - 1)}>
                        <MinusIcon />
                      </button>
                      <span>{line.qty}</span>
                      <button type="button" aria-label="Increase" onClick={() => updateQty(line.key, line.qty + 1)}>
                        <PlusIcon />
                      </button>
                    </div>
                    <div className="cart-line-total">
                      <strong>{formatPrice(line.product.price * line.qty)}</strong>
                      <button
                        type="button"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => removeFromCart(line.key)}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </section>

              <section className="co-block">
                <h3>
                  <span className="co-step">2</span> Contact &amp; delivery
                </h3>
                <div className="co-fields">
                  <label>
                    <span>First name</span>
                    <input name="firstName" required autoComplete="given-name" />
                  </label>
                  <label>
                    <span>Last name</span>
                    <input name="lastName" required autoComplete="family-name" />
                  </label>
                  <label>
                    <span>Email (for your receipt)</span>
                    <input name="email" type="email" required autoComplete="email" />
                  </label>
                  <label>
                    <span>Phone number</span>
                    <input name="phone" type="tel" required autoComplete="tel" placeholder="080..." />
                  </label>
                </div>

                <div className="choice-grid">
                  {deliveryOptions.map((d) => (
                    <label key={d.id} className={`choice ${delivery === d.id ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="delivery"
                        value={d.id}
                        checked={delivery === d.id}
                        onChange={() => setDelivery(d.id)}
                      />
                      <span className="choice-title">
                        {d.label}
                        <strong>
                          {d.id === 'lagos' && subtotal >= FREE_DELIVERY ? 'Free' : d.fee ? formatPrice(d.fee) : 'Free'}
                        </strong>
                      </span>
                      <span className="choice-note">{d.eta}</span>
                    </label>
                  ))}
                </div>

                {delivery !== 'pickup' && (
                  <div className="co-fields">
                    <label className="span-2">
                      <span>Street address</span>
                      <input name="address" required autoComplete="street-address" />
                    </label>
                    <label>
                      <span>City / area</span>
                      <input name="city" required autoComplete="address-level2" />
                    </label>
                    <label>
                      <span>State</span>
                      <select name="state" required key={delivery} defaultValue={delivery === 'lagos' ? 'Lagos' : ''}>
                        {delivery === 'lagos' ? (
                          <option value="Lagos">Lagos</option>
                        ) : (
                          <>
                            <option value="" disabled>
                              Select state
                            </option>
                            {states.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </>
                        )}
                      </select>
                    </label>
                  </div>
                )}
              </section>

              <section className="co-block">
                <h3>
                  <span className="co-step">3</span> Payment
                </h3>
                <div className="choice-grid">
                  {paymentOptions.map((p) => (
                    <label key={p.id} className={`choice ${payment === p.id ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        value={p.id}
                        checked={payment === p.id}
                        onChange={() => setPayment(p.id)}
                      />
                      <span className="choice-title">{p.label}</span>
                      <span className="choice-note">{p.note}</span>
                    </label>
                  ))}
                </div>
                <p className="co-secure">
                  <ShieldIcon /> Payments are processed securely by our payment partner. We never see your card details.
                </p>
              </section>
            </form>

            <aside className="summary">
              <h3>Order summary</h3>
              <div className="summary-row">
                <span>
                  Subtotal ({count} {count === 1 ? 'item' : 'items'})
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery · {option.label}</span>
                <span>{fee ? formatPrice(fee) : 'Free'}</span>
              </div>
              {subtotal < FREE_DELIVERY && delivery === 'lagos' && (
                <p className="summary-hint">Add {formatPrice(FREE_DELIVERY - subtotal)} more for free Lagos delivery ♡</p>
              )}
              <div className="summary-row summary-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>

              <button type="submit" form="checkout" className="btn btn-primary btn-block" disabled={processing}>
                {processing ? 'Processing payment…' : `Pay ${formatPrice(total)}`}
              </button>
              <p className="summary-note">Demo checkout — no real payment is taken.</p>
              <Link to="/shop" className="summary-continue">
                ← Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
