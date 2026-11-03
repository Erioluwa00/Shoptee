import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BagIcon, ChevronIcon, InstagramIcon, SparkleIcon } from '../components/Icons'
import { BACKUP_INSTAGRAM_URL, INSTAGRAM_URL } from '../data/products'
import '../styles/Contact.css'

const faqs = [
  {
    q: 'Do you have a walk-in store?',
    a: 'We’re an online store for now, which keeps our prices sweet! You can choose “Pickup” at checkout and we’ll email you a pickup time.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are dispatched within 24–48 hours after payment is confirmed. Lagos deliveries take 1–2 working days, other states 2–5 working days.',
  },
  {
    q: 'How do I know my size?',
    a: 'Check the size guide on each product page. Still unsure? Send us your measurements and we’ll recommend the perfect fit.',
  },
  {
    q: 'Can I exchange an item?',
    a: 'Yes — size exchanges are accepted within 3 days of delivery for unworn items with tags intact. Delivery fees for exchanges are covered by the customer.',
  },
  {
    q: 'How do I pay?',
    a: 'Right at checkout — pay by card, bank transfer or USSD. Your order is confirmed instantly and a receipt is sent to your email.',
  },
  {
    q: 'Do you restock sold-out items?',
    a: 'Most of our bestsellers get restocked! Follow @shoptee.brand and turn on post notifications so you never miss a drop.',
  },
]

const policy = [
  'Kindly check the size guide and confirm your size and colour before checking out.',
  'Orders are processed as soon as online payment is confirmed.',
  'Exchanges within 3 days of delivery — items must be unworn with tags on.',
  'We do not offer refunds, but store credit is available.',
  'Colours may vary slightly due to lighting and screen settings.',
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq ${open ? 'open' : ''}`}>
      <button className="faq-q" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>Q. {q}</span>
        <ChevronIcon />
      </button>
      <div className="faq-a">
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="contact">
      <section className="page-banner">
        <p className="script">hey bestie</p>
        <h1 className="title">Let’s talk</h1>
        <p className="lead">Questions about sizing, an existing order or a custom request? We reply fast — promise.</p>
      </section>

      <div className="container contact-grid">
        <div className="contact-cards">
          <Link to="/shop" className="ccard ccard-wa">
            <span className="ccard-icon">
              <BagIcon />
            </span>
            <div>
              <h4>Ready to order?</h4>
              <p>No need to message us — shop &amp; pay right on the site</p>
            </div>
          </Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="ccard">
            <span className="ccard-icon">
              <InstagramIcon />
            </span>
            <div>
              <h4>@shoptee.brand</h4>
              <p>New drops, restocks &amp; style inspo</p>
            </div>
          </a>
          <a href={BACKUP_INSTAGRAM_URL} target="_blank" rel="noreferrer" className="ccard">
            <span className="ccard-icon">
              <SparkleIcon />
            </span>
            <div>
              <h4>@shoptee.brand2</h4>
              <p>Our backup page — follow both!</p>
            </div>
          </a>
          <div className="hours">
            <h4>Business hours</h4>
            <p>
              Mon – Sat: 9am – 8pm
              <br />
              Sunday: 2pm – 6pm
            </p>
          </div>
        </div>

        <div className="form-card">
          {sent ? (
            <div className="form-sent">
              <p className="script">message sent!</p>
              <p>Thanks for reaching out. We’ll get back to you within 24 hours ♡</p>
              <button className="btn btn-outline" onClick={() => setSent(false)}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="form">
              <h3>Send us a note</h3>
              <div className="form-row">
                <label>
                  <span>Your name</span>
                  <input required placeholder="Ada" />
                </label>
                <label>
                  <span>Phone number</span>
                  <input type="tel" placeholder="080..." />
                </label>
              </div>
              <label>
                <span>Email</span>
                <input type="email" required placeholder="you@email.com" />
              </label>
              <label>
                <span>What’s it about?</span>
                <select defaultValue="order">
                  <option value="order">An order</option>
                  <option value="sizing">Sizing help</option>
                  <option value="custom">Custom / bulk request</option>
                  <option value="other">Something else</option>
                </select>
              </label>
              <label>
                <span>Message</span>
                <textarea required rows="5" placeholder="Tell us everything…" />
              </label>
              <button type="submit" className="btn btn-primary btn-block">
                Send message
              </button>
            </form>
          )}
        </div>
      </div>

      <section className="section faq-section" id="faq">
        <div className="container faq-wrap">
          <div className="section-head">
            <span className="eyebrow">Good to know</span>
            <h2 className="title">FAQ</h2>
          </div>
          <div className="faqs">
            {faqs.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>

      <section className="container policy" id="policy">
        <div className="policy-card">
          <h2 className="policy-title">Shopping policy</h2>
          <ol>
            {policy.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
