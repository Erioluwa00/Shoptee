import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page-banner" style={{ padding: '120px 24px' }}>
      <p className="script">oops!</p>
      <h1 className="title">This page went shopping</h1>
      <p className="lead">We couldn’t find what you were looking for.</p>
      <Link to="/shop" className="btn btn-primary" style={{ marginTop: 28 }}>
        Back to the shop
      </Link>
    </section>
  )
}
