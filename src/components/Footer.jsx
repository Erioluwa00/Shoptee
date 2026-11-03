import { Link } from 'react-router-dom'
import Logo from './Logo'
import { InstagramIcon } from './Icons'
import { BACKUP_INSTAGRAM_URL, INSTAGRAM_URL } from '../data/products'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-scallop" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo size="md" />
          <p>
            Your one-stop fashion plug for bodycon tops, skirts, dresses, jewelries, glasses &amp; more. Loved by
            5,000+ happy customers.
          </p>
          <div className="footer-social">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shop">All products</Link>
          <Link to="/shop?category=tops">Tops</Link>
          <Link to="/shop?category=sets">Sets</Link>
          <Link to="/shop?category=bottoms">Skirts &amp; bottoms</Link>
          <Link to="/shop?category=accessories">Accessories</Link>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <Link to="/contact">Contact us</Link>
          <Link to="/contact#faq">FAQs</Link>
          <Link to="/contact#policy">Shopping policy</Link>
          <Link to="/about">Our story</Link>
        </div>

        <div className="footer-col">
          <h4>Say hi</h4>
          <Link to="/contact">Send us a message</Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            @shoptee.brand
          </a>
          <a href={BACKUP_INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Backup: @shoptee.brand2
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Shoptee Brand. All rights reserved.</span>
        <span className="footer-made">
          Made with <span className="script">love</span> for the besties
        </span>
      </div>
    </footer>
  )
}
