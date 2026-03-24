import { useState, useEffect } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className="navbar" style={scrolled ? { boxShadow: '0 4px 32px rgba(0,0,0,0.5)' } : {}}>
        <Link to="/" className="nav-brand">
          <img src="/logo-circle.png" alt="Hinnavaru Blue Logo" className="nav-logo-img" />
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>Our Roots</NavLink></li>
          <li><NavLink to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink></li>
          <li><NavLink to="/registry" onClick={() => setMenuOpen(false)}>Registry</NavLink></li>
          <li><NavLink to="/live-lagoon" onClick={() => setMenuOpen(false)}>Live Lagoon</NavLink></li>
        </ul>

        <Link to="/sponsor" className="btn btn-primary btn-sm nav-cta">Sponsor a Frame</Link>

        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img src="/logo-circle.png" alt="Hinnavaru Blue Logo" style={{ width: '60px', height: '60px' }} />
                <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>Hinnavaru Blue</span>
              </div>
              <p>A community-led coral restoration initiative protecting the lagoon of Hinnavaru, Lhaviyani Atoll, Maldives. Every frame counts.</p>
            </div>
            <div className="footer-col">
              <h4>Navigate</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">Our Roots</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/live-lagoon">Live Lagoon</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Registry</h4>
              <ul>
                <li><Link to="/registry">Coral Registry</Link></li>
                <li><Link to="/registry#transparency">Transparency Hub</Link></li>
                <li><Link to="/registry#transparency">Financial Disclosures</Link></li>
                <li><Link to="/registry">Impact Reports</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Involved</h4>
              <ul>
                <li><Link to="/sponsor">Sponsor a Frame</Link></li>
                <li><Link to="/sponsor">Partner with Us</Link></li>
                <li><a href="mailto:hello@hinnavarublue.org">Contact Us</a></li>
                <li><a href="https://hinnavarublueinitiative.org" target="_blank" rel="noopener">hinnavarublueinitiative.org</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Hinnavaru Blue Initiative · NGO Reg. No. 493-NGO/CERT/2026/10</span>
            <span>Made with 🪸 by Page 729 Studio · <a href="/registry#transparency">Amaanaiy (Transparency)</a></span>
          </div>
        </div>
      </footer>
    </>
  )
}
