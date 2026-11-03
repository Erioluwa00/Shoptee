import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { ArrowIcon, Bow, Heart } from '../components/Icons'
import { WHATSAPP_URL } from '../data/products'
import '../styles/About.css'

const stats = [
  { value: '5,000+', label: 'Happy customers' },
  { value: '8,000+', label: 'Instagram besties' },
  { value: '468+', label: 'Looks posted' },
  { value: '36', label: 'States delivered to' },
]

const values = [
  { title: 'Trendy, always', text: 'We hunt down the pieces you’re seeing on your feed — and get them to you first.' },
  { title: 'Quality you can feel', text: 'Every top, skirt and set is checked by hand before it leaves us.' },
  { title: 'Prices that make sense', text: 'Looking good shouldn’t cost a fortune. Combo deals and restock drops every week.' },
]

const steps = [
  { n: '01', title: 'Pick your faves', text: 'Browse the shop and add your pieces to your bag.' },
  { n: '02', title: 'Confirm on WhatsApp', text: 'We confirm your size, colour and delivery details.' },
  { n: '03', title: 'Make payment', text: 'Pay by transfer once your order is confirmed.' },
  { n: '04', title: 'Pack-an-order!', text: 'We pack it with love and send it straight to you.' },
]

export default function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <Heart className="about-heart" />
        <Bow className="about-bow" />
        <div className="container about-hero-grid">
          <div className="about-logo-card fade-up">
            <img src="/images/logo.png" alt="Shoptee Brand logo" />
          </div>
          <div className="fade-up" style={{ animationDelay: '0.1s' }}>
            <p className="script about-script">our story</p>
            <h1 className="title">
              From a little Instagram page to your <em>fashion plug</em>
            </h1>
            <p className="about-lead">
              Shoptee Brand started with one simple idea: every girl deserves to feel like the main character — without
              breaking the bank. What began as a few posts on Instagram has grown into a community of thousands of
              besties who trust us for their bodycon tops, skirts, dresses, jewelries, glasses &amp; more.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Shop the collection <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="stats container">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-images">
            <img src="/images/eyelet-black-model.jpg" alt="Eyelet top styled with capris" />
            <img src="/images/brazil-street.jpg" alt="Brasil top styled with jorts" />
          </div>
          <div>
            <span className="eyebrow">What we stand for</span>
            <h2 className="title">
              Made for the <em>girlies</em>
            </h2>
            <div className="values">
              {values.map((v, i) => (
                <div key={v.title} className="value">
                  <span className="value-n">0{i + 1}</span>
                  <div>
                    <h4>{v.title}</h4>
                    <p>{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section how">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Easy peasy</span>
            <h2 className="title">
              How to <em>order</em>
            </h2>
          </div>
          <div className="steps">
            {steps.map((s) => (
              <div key={s.n} className="step">
                <span className="step-n">{s.n}</span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="how-cta">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
              Start an order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="container signoff">
        <Logo size="lg" />
        <p className="script">with love, the Shoptee team</p>
      </section>
    </div>
  )
}
