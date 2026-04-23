import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="t3-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <picture>
            <source srcSet="/logo.avif" type="image/avif" />
            <img src="/T3_MainLogo.png" alt="T3 Personal Training" className="footer-logo" loading="lazy" />
          </picture>
          <p>Real programs. Real results.<br />Los Angeles, CA</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/new-client">New Client</Link>
          <a href="mailto:t3.terrypt@gmail.com">Contact</a>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} T3 Personal Training · Los Angeles, CA</p>
      </div>
    </footer>
  )
}
