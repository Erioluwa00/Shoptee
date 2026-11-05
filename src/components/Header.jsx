import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from './Icons'
import '../styles/Header.css'

const announcements = [
  'Nationwide delivery across Nigeria',
  'Loved by 5,000+ happy customers',
  'New eyelet halters just dropped',
  'Shop & pay securely online',
  'Polka Bubble set — save ₦2k',
]

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { count, wishlist, setCartOpen } = useShop()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setMenuOpen(false), [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const loop = [...announcements, ...announcements]

  return (
    <>
      <div className="announce" role="region" aria-label="Announcements">
        <div className="announce-track">
          {loop.map((text, i) => (
            <span key={i} className="announce-item">
              {text} <span className="announce-heart">♡</span>
            </span>
          ))}
        </div>
      </div>

      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <button className="icon-btn menu-btn" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </button>

          <Link to="/" className="brand" aria-label="Shoptee Brand home">
            <img src="/images/logo.png" alt="" className="brand-badge" />
            <span className="brand-text">
              <span className="brand-name">SHOPTEE</span>
              <span className="brand-sub">brand</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.label} to={l.to} end={l.end} className="nav-link">
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/shop" className="icon-btn hide-sm" aria-label="Search products">
              <SearchIcon />
            </Link>
            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <HeartIcon />
              {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
            </Link>
            <button className="icon-btn" aria-label="Open shopping bag" onClick={() => setCartOpen(true)}>
              <BagIcon />
              {count > 0 && <span className="badge">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="mobile-nav-panel">
          <div className="mobile-nav-top">
            <span className="brand">
              <img src="/images/logo.png" alt="" className="brand-badge" />
              <span className="brand-text">
                <span className="brand-name">SHOPTEE</span>
                <span className="brand-sub">brand</span>
              </span>
            </span>
            <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <p className="script mobile-nav-hi">Hi besties!</p>
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} end={l.end} className="mobile-nav-link">
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/wishlist" className="mobile-nav-link">
            Wishlist
          </NavLink>
        </div>
      </div>
    </>
  )
}
