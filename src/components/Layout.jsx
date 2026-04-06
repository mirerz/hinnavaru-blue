import { useState, useEffect } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { CMS_CONFIG } from '../data/cms'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const [projectsOpen, setProjectsOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setProjectsOpen(false), 0)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className="navbar" style={scrolled ? { boxShadow: '0 4px 32px rgba(0,0,0,0.5)' } : {}}>
        <div className="nav-container">
          <Link to="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
            <img src="/logo-circle.png" alt="Hinnavaru Blue Logo" className="nav-logo-img" />
          </Link>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>Our Roots</NavLink></li>
            <li 
              onMouseEnter={() => setProjectsOpen(true)} 
              onMouseLeave={() => setProjectsOpen(false)}
              className="nav-dropdown-trigger"
            >
              <NavLink to="/projects" onClick={() => setMenuOpen(false)}>
                Projects <span style={{ fontSize: '0.7rem', verticalAlign: 'middle', opacity: 0.6 }}>▼</span>
              </NavLink>
              <div className={`nav-dropdown ${projectsOpen ? 'show' : ''}`}>
                <Link to="/projects?cat=coral" onClick={() => setMenuOpen(false)}>Coral Restoration</Link>
                <Link to="/projects?cat=coastal" onClick={() => setMenuOpen(false)}>Coastal Cleaning</Link>
                <Link to="/projects?cat=edu" onClick={() => setMenuOpen(false)}>Education & Awareness</Link>
              </div>
            </li>
            <li><NavLink to="/registry" onClick={() => setMenuOpen(false)}>Registry</NavLink></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="nav-hotline hide-mobile">
              <span style={{ fontSize: '0.7rem', color: 'var(--teal)', fontWeight: 600 }}>HOTLINE</span>
              <a href={`tel:${CMS_CONFIG.hotline}`} style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{CMS_CONFIG.hotline}</a>
            </div>
            <Link to="/sponsor" className="btn btn-primary btn-sm nav-cta">Adopt a Frame</Link>
          </div>

          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
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
              <h4>Transparency</h4>
              <ul>
                <li><Link to="/registry">Coral Registry</Link></li>
                <li><Link to="/registry#transparency">Transparency Hub</Link></li>
                <li><Link to="/live-lagoon">Live Lagoon Map</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Involved</h4>
              <ul>
                <li><Link to="/sponsor">Adopt or Partner with Us</Link></li>
                <li><a href={`mailto:${CMS_CONFIG.contact_email}`}>Contact Support</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Initiate</h4>
              <div className="footer-btn-group">
                <a href={`tel:${CMS_CONFIG.hotline}`} className="footer-btn">
                  <span style={{ color: 'var(--blue-light)' }}>📞</span> {CMS_CONFIG.hotline}
                </a>
                <a href={CMS_CONFIG.whatsapp_link} target="_blank" rel="noopener" className="footer-btn">
                  <span style={{ color: '#25D366' }}>💬</span> WhatsApp Hotline
                </a>
                <a href={CMS_CONFIG.telegram_link} target="_blank" rel="noopener" className="footer-btn">
                  <span style={{ color: '#0088cc' }}>✈️</span> Telegram Feed
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Hinnavaru Blue Initiative · NGO Reg. No. {CMS_CONFIG.ngo_registration}</span>
            <span>Made with 🪸 by Page 729</span>
          </div>
        </div>
      </footer>


    </>
  )
}
