import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import ProductCard from '../components/ProductCard'
import { BagIcon, ChatIcon, ChevronIcon, HeartIcon, MinusIcon, PlusIcon, RefreshIcon, TruckIcon } from '../components/Icons'
import { categories, formatPrice, getProduct, products, WHATSAPP_URL } from '../data/products'
import NotFound from './NotFound'
import '../styles/ProductCard.css'
import '../styles/ProductDetail.css'

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`acc ${open ? 'open' : ''}`}>
      <button className="acc-head" aria-expanded={open} onClick={() => setOpen(!open)}>
        {title}
        <ChevronIcon />
      </button>
      <div className="acc-body">
        <div>{children}</div>
      </div>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  if (!product) return <NotFound />
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }) {
  const { addToCart, toggleWishlist, isWished, setToast } = useShop()
  const [active, setActive] = useState(0)
  const [color, setColor] = useState(product.colors[0]?.name)
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState(false)

  const wished = isWished(product.id)
  const catName = categories.find((c) => c.id === product.category)?.name
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)
  const fillers = products.filter((p) => p.id !== product.id && !related.includes(p))
  const youMayLike = [...related, ...fillers].slice(0, 4)

  const add = () => {
    if (product.sizes && !size) {
      setSizeError(true)
      setToast('Please pick a size first ♡')
      return
    }
    addToCart(product.id, { color, size, qty })
  }

  return (
    <div className="pdp">
      <div className="container">
        <p className="crumbs pdp-crumbs">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> /{' '}
          <Link to={`/shop?category=${product.category}`}>{catName}</Link> / <span>{product.name}</span>
        </p>

        <div className="pdp-grid">
          <div className="gallery">
            <div className="gallery-thumbs">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  className={`thumb ${i === active ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
            <div className="gallery-main">
              <img key={active} src={product.images[active]} alt={product.name} />
              {product.badge && <span className="pcard-badge">{product.badge}</span>}
            </div>
          </div>

          <div className="pdp-info">
            <span className="eyebrow">{catName}</span>
            <h1 className="pdp-title">{product.name}</h1>
            <div className="pdp-price">
              <strong>{formatPrice(product.price)}</strong>
              {product.compareAt && (
                <>
                  <s>{formatPrice(product.compareAt)}</s>
                  <span className="save-chip">Save {formatPrice(product.compareAt - product.price)}</span>
                </>
              )}
            </div>
            {product.note && <p className="pdp-note">{product.note}</p>}
            <p className="pdp-desc">{product.description}</p>

            <div className="opt">
              <div className="opt-label">
                Colour: <strong>{color}</strong>
              </div>
              <div className="swatches">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    className={`swatch ${color === c.name ? 'active' : ''}`}
                    style={{ '--sw': c.hex }}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                  />
                ))}
              </div>
            </div>

            {product.sizes && (
              <div className="opt">
                <div className="opt-label">
                  Size: <strong>{size ?? 'Select'}</strong>
                  <a href="#size-guide" className="size-guide-link">
                    Size guide
                  </a>
                </div>
                <div className={`sizes ${sizeError ? 'shake' : ''}`} onAnimationEnd={() => setSizeError(false)}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`size ${size === s ? 'active' : ''}`}
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pdp-actions">
              <div className="qty">
                <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <MinusIcon />
                </button>
                <span>{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)}>
                  <PlusIcon />
                </button>
              </div>
              <button className="btn btn-primary pdp-add" onClick={add}>
                <BagIcon /> Add to bag
              </button>
              <button
                className={`pdp-wish ${wished ? 'is-wished' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={wished}
              >
                <HeartIcon filled={wished} />
              </button>
            </div>

            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-outline btn-block">
              <ChatIcon /> Order this on WhatsApp
            </a>

            <div className="pdp-perks">
              <span>
                <TruckIcon /> Dispatched in 24–48hrs
              </span>
              <span>
                <RefreshIcon /> Easy size exchange
              </span>
            </div>

            <div className="accordions">
              <Accordion title="Details & fit" defaultOpen>
                <ul>
                  <li>Stretchy, body-hugging fabric</li>
                  <li>True to size — size up for a relaxed fit</li>
                  <li>Model is wearing size M</li>
                </ul>
              </Accordion>
              <Accordion title="Delivery">
                <p>
                  Lagos: 1–2 working days. Other states: 2–5 working days. Orders are dispatched within 24–48hrs after
                  payment is confirmed.
                </p>
              </Accordion>
              <Accordion title="Shopping policy">
                <p>
                  Please confirm your size before ordering. Exchanges are accepted within 3 days of delivery for
                  unworn items with tags intact. We do not offer refunds on sale items.
                </p>
              </Accordion>
              <div id="size-guide">
                <Accordion title="Size guide">
                  <table className="size-table">
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>UK</th>
                        <th>Bust</th>
                        <th>Waist</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['S', '6–8', '32–34"', '26–28"'],
                        ['M', '10', '35–36"', '29–30"'],
                        ['L', '12', '37–38"', '31–32"'],
                        ['XL', '14', '39–41"', '33–35"'],
                      ].map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell) => (
                            <td key={cell}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        <section className="section related">
          <div className="section-head">
            <span className="eyebrow">Complete the look</span>
            <h2 className="title">
              You may also <em>love</em>
            </h2>
          </div>
          <div className="product-grid">
            {youMayLike.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
