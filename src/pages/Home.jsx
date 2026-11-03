import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { ArrowIcon, Bow, ChatIcon, Heart, InstagramIcon, RefreshIcon, ShieldIcon, SparkleIcon, TruckIcon } from '../components/Icons'
import { categories, formatPrice, getProduct, INSTAGRAM_URL, products, WHATSAPP_URL } from '../data/products'
import '../styles/ProductCard.css'
import '../styles/Home.css'

const highlights = [
  ...categories.filter((c) => c.id !== 'all').map((c) => ({ label: c.name, to: `/shop?category=${c.id}`, image: c.image })),
  { label: 'Love notes', to: '/#reviews', image: '/images/polka-red-model.jpg' },
]

const perks = [
  { icon: TruckIcon, title: 'Nationwide delivery', text: 'Fast dispatch to every state in Nigeria' },
  { icon: ShieldIcon, title: 'Quality checked', text: 'Every piece inspected before it ships' },
  { icon: RefreshIcon, title: 'Easy exchanges', text: 'Wrong size? We’ll sort you out' },
  { icon: ChatIcon, title: 'Order on WhatsApp', text: 'Real humans, fast replies' },
]

const reviews = [
  { name: 'Tolu A.', item: 'Eyelet Halter Top', text: 'The fit is so snatched!! I got the brown one and I’m coming back for the butter yellow 😍', tilt: '-2deg' },
  { name: 'Adaeze O.', item: 'Polka Bubble 2-Piece', text: 'Packaging was so cute, delivery was quick and the set is exactly like the pictures. Shoptee never disappoints.', tilt: '1.5deg' },
  { name: 'Mariam B.', item: 'Vintage Gold Watch', text: 'Gifted myself the square one and I get compliments every single day. Customer service was a sweetheart too.', tilt: '-1deg' },
]

const instaShots = ['brazil-street', 'eyelet-black-model', 'open-back', 'trim-tank-brown', 'star-tee', 'eyelet-yellow-model']

export default function Home() {
  const newIn = products.slice(0, 8)
  const polka = getProduct('polka-bubble-set')

  return (
    <div className="home">
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <Heart className="float-deco deco-heart-1" />
        <Heart className="float-deco deco-heart-2" />
        <Bow className="float-deco deco-bow" />

        <div className="container hero-grid">
          <div className="hero-copy fade-up">
            <p className="script hero-hi">Hi besties!</p>
            <h1 className="hero-title">
              Your one-stop <em>fashion</em> plug
            </h1>
            <p className="hero-text">
              Bodycon tops, skirts, dresses, jewelries, glasses &amp; more — curated for the girls who love to look
              good and feel even better.
            </p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-primary">
                Shop new in <ArrowIcon />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-outline">
                Order on WhatsApp
              </a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars">
                {['la-tank', 'white-tee', 'camo-skirt'].map((n) => (
                  <img key={n} src={`/images/${n}.jpg`} alt="" />
                ))}
              </div>
              <p>
                <strong>5,000+</strong> happy customers &amp; <strong>8k</strong> besties on Instagram
              </p>
            </div>
          </div>

          <div className="hero-visual fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="arch arch-main">
              <img src="/images/eyelet-jumpsuit.jpg" alt="Model in the black eyelet halter jumpsuit" />
            </div>
            <div className="arch arch-small arch-a">
              <img src="/images/polka-red-model.jpg" alt="Red polka bubble set" />
            </div>
            <div className="arch arch-small arch-b">
              <img src="/images/eyelet-tops.jpg" alt="Eyelet halter tops in white, brown and butter" />
            </div>
            <div className="hero-sticker">
              <span className="script">new</span>
              <span>Eyelet</span>
              <span>Collection</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Story-style category highlights ---------- */}
      <section className="highlights container" aria-label="Shop by category">
        {highlights.map((h) => (
          <Link key={h.label} to={h.to} className="highlight">
            <span className="highlight-ring">
              <img src={h.image} alt="" />
            </span>
            <span className="highlight-label">
              <Heart className="highlight-heart" /> {h.label}
            </span>
          </Link>
        ))}
      </section>

      {/* ---------- New in ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head row-head">
            <div>
              <span className="eyebrow">Just landed</span>
              <h2 className="title">
                New <em>in</em> this week
              </h2>
            </div>
            <Link to="/shop" className="link-arrow">
              View all <ArrowIcon />
            </Link>
          </div>
          <div className="product-grid">
            {newIn.map((p, i) => (
              <ProductCard key={p.id} product={p} style={{ animationDelay: `${i * 0.06}s` }} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Feature: Polka Bubble ---------- */}
      <section className="feature">
        <div className="container feature-grid">
          <div className="feature-images">
            <img src="/images/polka-light-promo.jpg" alt="Light polka bubble set" className="feature-img-1" />
            <img src="/images/polka-dark-promo.jpg" alt="Dark polka bubble set" className="feature-img-2" />
            <span className="feature-save">
              Save
              <strong>₦2k</strong>
            </span>
          </div>
          <div className="feature-copy">
            <span className="eyebrow">The set everyone’s asking for</span>
            <h2 className="title">
              Polka dot <em>Bubble</em> 2-piece
            </h2>
            <p>
              Stylish, versatile and bubble perfect. Wear the halter top with pants, skirts or shorts — or go full
              matchy-matchy with the bubble skirt.
            </p>
            <ul className="price-list">
              <li>
                <span>Top only</span>
                <strong>{formatPrice(5500)}</strong>
              </li>
              <li>
                <span>Skirt only</span>
                <strong>{formatPrice(7000)}</strong>
              </li>
              <li className="combo">
                <span>Combo price</span>
                <strong>
                  {formatPrice(polka.price)} <s>{formatPrice(polka.compareAt)}</s>
                </strong>
              </li>
            </ul>
            <div className="feature-colors">
              {polka.colors.map((c) => (
                <span key={c.name}>
                  <i style={{ background: c.hex }} /> {c.name}
                </span>
              ))}
            </div>
            <Link to={`/product/${polka.id}`} className="btn btn-primary">
              Shop the set <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Perks ---------- */}
      <section className="perks container">
        {perks.map(({ icon: Icon, title, text }) => (
          <div key={title} className="perk">
            <span className="perk-icon">
              <Icon />
            </span>
            <div>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ---------- Shop by category tiles ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Find your vibe</span>
            <h2 className="title">
              Shop by <em>category</em>
            </h2>
          </div>
          <div className="cat-grid">
            {categories
              .filter((c) => c.id !== 'all')
              .slice(0, 4)
              .map((c, i) => (
                <Link key={c.id} to={`/shop?category=${c.id}`} className={`cat-tile cat-tile-${i}`}>
                  <img src={c.image} alt="" />
                  <span className="cat-label">
                    {c.name}
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <section className="section reviews" id="reviews">
        <div className="container">
          <div className="section-head">
            <p className="script reviews-script">love notes</p>
            <h2 className="title">
              From our <em>besties</em>
            </h2>
          </div>
          <div className="notes">
            {reviews.map((r) => (
              <figure key={r.name} className="note" style={{ '--tilt': r.tilt }}>
                <span className="tape" aria-hidden="true" />
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  <span>bought {r.item}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Instagram ---------- */}
      <section className="section insta">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">@shoptee.brand</span>
            <h2 className="title">
              Join <em>8,000+</em> besties on Instagram
            </h2>
          </div>
          <div className="insta-grid">
            {instaShots.map((n) => (
              <a key={n} href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="insta-tile">
                <img src={`/images/${n}.jpg`} alt="Shoptee Brand Instagram post" loading="lazy" />
                <span className="insta-overlay">
                  <InstagramIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Newsletter ---------- */}
      <section className="container">
        <div className="newsletter">
          <Bow className="newsletter-bow" />
          <SparkleIcon className="newsletter-sparkle" />
          <p className="script">join the bestie list</p>
          <h2 className="title">First dibs on drops &amp; restocks</h2>
          <p className="lead">Be the first to know when new pieces land — and get 10% off your first order.</p>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault()
              e.currentTarget.reset()
              e.currentTarget.querySelector('button').textContent = 'You’re in ♡'
            }}
          >
            <input type="email" required placeholder="Your email address" aria-label="Email address" />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
