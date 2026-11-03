import '../styles/Logo.css'

export default function Logo({ size = 'md', tagline = true }) {
  return (
    <span className={`wordmark wordmark-${size}`} aria-label="Shoptee Brand">
      <span className="wordmark-script" aria-hidden="true">
        Shoptee Brand
      </span>
      <span className="wordmark-main">SHOPTEE.BRAND</span>
      {tagline && <span className="wordmark-tag">Clothing, fashion accessories &amp; more</span>}
    </span>
  )
}
