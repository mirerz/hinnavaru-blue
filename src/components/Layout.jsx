import { useState, useEffect } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { CMS_CONFIG } from '../data/cms'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [registryOpen, setRegistryOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => {
        setProjectsOpen(false)
        setRegistryOpen(false)
    }, 0)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <img src="/logo-circle.png" alt="Hinnavaru Blue" />
          </Link>

          <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
            <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>Our Roots</NavLink></li>
            <li 
              onMouseEnter={() => setProjectsOpen(true)} 
              onMouseLeave={() => setProjectsOpen(false)}
              className="nav-dropdown-trigger"
            >
              <NavLink 
                to="/projects" 
                onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    e.preventDefault();
                    setProjectsOpen(!projectsOpen);
                  } else {
                    setMenuOpen(false);
                  }
                }}
              >
                Projects <span style={{ fontSize: '0.7rem', verticalAlign: 'middle', opacity: 0.6, display: 'inline-block', transform: projectsOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>▼</span>
              </NavLink>
              <div className={`nav-dropdown ${projectsOpen ? 'show' : ''}`}>
                <Link to="/projects" style={{ fontWeight: 800, color: 'var(--teal)' }} onClick={() => setMenuOpen(false)}>→ VIEW ALL MISSIONS</Link>
                <Link to="/projects?cat=coral" onClick={() => setMenuOpen(false)}>Coral Restoration</Link>
                <Link to="/projects?cat=sweep" onClick={() => setMenuOpen(false)}>Sweep Efforts</Link>
                <Link to="/projects?cat=edu" onClick={() => setMenuOpen(false)}>Edu Awareness</Link>
              </div>
            </li>
            <li 
              onMouseEnter={() => setRegistryOpen(true)} 
              onMouseLeave={() => setRegistryOpen(false)}
              className="nav-dropdown-trigger"
            >
              <NavLink 
                to="/registry" 
                onClick={(e) => {
                  if (window.innerWidth <= 768) {
                    e.preventDefault();
                    setRegistryOpen(!registryOpen);
                  } else {
                    setMenuOpen(false);
                  }
                }}
              >
                Reef Guardians <span style={{ fontSize: '0.7rem', verticalAlign: 'middle', opacity: 0.6, display: 'inline-block', transform: registryOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>▼</span>
              </NavLink>
              <div className={`nav-dropdown ${registryOpen ? 'show' : ''}`}>
                <Link to="/registry" style={{ fontWeight: 800, color: 'var(--teal)' }} onClick={() => setMenuOpen(false)}>→ GUARDIAN IMPACT HUB</Link>
                <Link to="/registry" onClick={() => setMenuOpen(false)}>Registry Search</Link>
                <Link to="/registry#transparency" onClick={() => setMenuOpen(false)}>Public Transparency (Amaanaiy)</Link>
                <Link to="/live-lagoon" onClick={() => setMenuOpen(false)}>Live Mission Map</Link>
                <Link to="/blog" onClick={() => setMenuOpen(false)}>Program Blog</Link>
              </div>
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="nav-fab-container hide-mobile">
              <div className="nav-fab-main" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                <img src="/hotline-icon.png" alt="Support" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="nav-fab-menu">
                <a href={`tel:${CMS_CONFIG.hotline}`} className="fab-item" style={{ background: 'var(--ocean-surface)', cursor: 'pointer' }}>
                  <span className="fab-label">DIRECT HOTLINE</span>
                  <span className="fab-icon">📞</span>
                </a>
                <a href={CMS_CONFIG.whatsapp_link} target="_blank" rel="noopener" className="fab-item whatsapp-bg" style={{ cursor: 'pointer' }}>
                  <span className="fab-label">WHATSAPP CHAT</span>
                  <span className="fab-icon">💬</span>
                </a>
                <a href={CMS_CONFIG.telegram_link} target="_blank" rel="noopener" className="fab-item telegram-bg" style={{ cursor: 'pointer' }}>
                  <span className="fab-label">TELEGRAM FEED</span>
                  <span className="fab-icon">✈️</span>
                </a>
              </div>
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
          <div className="footer-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.2fr 1fr 1fr 1fr', 
            gap: '48px',
            alignItems: 'start'
          }}>
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '32px', marginBottom: '16px' }}>
                <img src="/logo-circle.png" alt="Hinnavaru Blue Logo" style={{ width: '32px', height: '32px' }} />
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Hinnavaru <span style={{ color: 'var(--teal)' }}>Blue</span></span>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.6', opacity: 0.7 }}>A community-led coral restoration initiative protecting the lagoon of Hinnavaru, Maldives. Every frame counts.</p>
            </div>
            <div className="footer-col">
              <h4 style={{ height: '32px', display: 'flex', alignItems: 'center' }}>Navigate</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">Our Roots</Link></li>
                <li><Link to="/projects">Projects</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 style={{ height: '32px', display: 'flex', alignItems: 'center' }}>Transparency</h4>
              <ul>
                <li><Link to="/registry">Reef Guardians</Link></li>
                <li><Link to="/registry#transparency">Transparency Hub</Link></li>
                <li><Link to="/live-lagoon">Live Lagoon Map</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 style={{ height: '32px', display: 'flex', alignItems: 'center' }}>Get Involved</h4>
              <ul>
                <li><Link to="/sponsor">Adopt or Partner with Us</Link></li>
                <li><a href={`mailto:${CMS_CONFIG.contact_email}`}>Contact Support</a></li>
                <li><Link to="/blog">Blog Posts</Link></li>
              </ul>
            </div>

          </div>
          <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '64px', paddingTop: '32px' }}>
            <span>© 2026 Hinnavaru Blue Initiative · NGO Reg. No. {CMS_CONFIG.ngo_registration}</span>
            <span>Made with 🪸 by Page 729</span>
          </div>
        </div>
      </footer>
    </>
  )
}
