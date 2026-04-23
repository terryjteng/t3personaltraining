import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Nav.css'

export default function Nav() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [visible,  setVisible]    = useState(true)
  const [atTop,    setAtTop]      = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setAtTop(y < 10)
      setVisible(y < lastY.current || y < 60)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <nav
      className={['t3-nav', !visible && 'nav-hidden', !atTop && 'nav-scrolled'].filter(Boolean).join(' ')}
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <Link className="nav-brand" to="/" onClick={close} aria-label="T3 Personal Training home">
          <picture>
            <source srcSet="/logo.avif" type="image/avif" />
            <img src="/T3_MainLogo.png" alt="T3 Personal Training" className="nav-logo" />
          </picture>
        </Link>

        {/* Desktop links */}
        <div className="nav-links" role="list">
          <NavLink to="/"           end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/services"       className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink>
          <NavLink to="/about"          className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
          <NavLink to="/new-client"     className={({ isActive }) => isActive ? 'active' : ''}>New Client</NavLink>
          <a href="/#contact" className="nav-cta btn btn-primary">Book Free Consult</a>
        </div>

        {/* Hamburger */}
        <button
          className={['nav-hamburger', menuOpen && 'is-open'].filter(Boolean).join(' ')}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={['mobile-menu', menuOpen && 'is-open'].filter(Boolean).join(' ')}
        aria-hidden={!menuOpen}
      >
        <NavLink to="/"          end  onClick={close}>Home</NavLink>
        <NavLink to="/services"       onClick={close}>Services</NavLink>
        <NavLink to="/about"          onClick={close}>About</NavLink>
        <NavLink to="/new-client"     onClick={close}>New Client</NavLink>
        <a href="/#contact" onClick={close} className="mobile-cta btn btn-primary">
          Book Free Consult
        </a>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={close}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}
