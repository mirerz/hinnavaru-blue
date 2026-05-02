import { useState, useEffect } from "react"
import { NavLink, Link, Outlet, useLocation } from "react-router-dom"
import { CMS_CONFIG } from "../data/cms"

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [contactsOpen, setContactsOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="app-wrapper">
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-container">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <img src="/deep-archives/media-hub/logo-circle.png" alt="Hinnavaru Blue" />
            <span className="nav-name" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <span>HINNAVARU <span>BLUE</span></span>
              <span style={{ fontSize: '0.65em', fontWeight: 500, letterSpacing: '2px', opacity: 0.8, textTransform: 'uppercase', marginTop: '-2px' }}>Initiative</span>
            </span>
          </Link>

          <button 
            className="nav-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>Our Roots</NavLink></li>
            <li><NavLink to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink></li>
            <li><NavLink to="/registry" onClick={() => setMenuOpen(false)}>Reef Guardians</NavLink></li>
          </ul>

          <div className="nav-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href={`mailto:${CMS_CONFIG.hello_email}`} className="btn btn-outline btn-sm">Contact</a>
            <Link to="/sponsor" className="btn btn-primary btn-sm nav-cta hide-mobile">Adopt a Frame</Link>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start', justifyContent: 'space-between' }}>
            <div className="footer-brand">
              <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img src="/deep-archives/media-hub/logo-circle.png" alt="Hinnavaru Blue" style={{ width: '48px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>HINNAVARU <span className="teal">BLUE</span></span>
                  <span style={{ fontSize: '0.65em', fontWeight: 500, letterSpacing: '2px', opacity: 0.8, textTransform: 'uppercase', marginTop: '2px' }}>Initiative</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '320px' }}>A community-led coral restoration initiative protecting the lagoon of Hinnavaru, Lhaviyani Atoll, Maldives.</p>
            </div>
            <div className="footer-links" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', flex: 1, width: '100%', maxWidth: '800px' }}>
              <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h5 style={{ color: 'var(--white)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Navigation</h5>
                <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
                <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Our Roots</Link>
                <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Projects</Link>
              </div>
              <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h5 style={{ color: 'var(--white)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Guardians</h5>
                <Link to="/registry" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Reef Guardians</Link>
                <Link to="/live-lagoon" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Live Map</Link>
                <Link to="/sponsor" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Adopt a Frame</Link>
              </div>
              <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h5 style={{ color: 'var(--white)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Contact</h5>
                <a href={`mailto:${CMS_CONFIG.hello_email}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Email Us</a>
                <a href={CMS_CONFIG.whatsapp_link} target="_blank" rel="noopener" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>WhatsApp</a>
                <a href={CMS_CONFIG.telegram_link} target="_blank" rel="noopener" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Telegram Bot</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-legal">
              © 2026 Hinnavaru Blue Initiative · NGO Reg: {CMS_CONFIG.ngo_registration}
            </div>
            <div className="footer-credit">
              <span>Made with 🪸 by P.729</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Contacts Pill */}
      <div 
        className="liquid-contacts-pill"
        onMouseEnter={() => setContactsOpen(true)}
        onMouseLeave={() => setContactsOpen(false)}
        style={{ 
          position: 'fixed', 
          bottom: '30px', 
          right: 'max(20px, calc(50% - 400px))', 
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(2, 11, 24, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(13, 211, 197, 0.2)',
          borderRadius: '50px',
          padding: '8px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          maxWidth: contactsOpen ? '380px' : '52px',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
      >
        <div 
          onClick={() => setContactsOpen(!contactsOpen)}
          style={{ 
            width: '34px', height: '34px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            flexShrink: 0,
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
            transition: 'transform 0.3s'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img src="/deep-archives/media-hub/hotline-icon.png" alt="Contacts" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          opacity: contactsOpen ? 1 : 0,
          transition: 'opacity 0.4s ease',
          transitionDelay: contactsOpen ? '0.15s' : '0s',
          marginLeft: contactsOpen ? '16px' : '0',
          paddingRight: contactsOpen ? '16px' : '0'
        }}>
          <a href={`mailto:${CMS_CONFIG.hello_email}`} style={{ color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='var(--teal)'} onMouseOut={e => e.currentTarget.style.color='var(--white)'}>
            <span style={{ fontSize: '1.2rem' }}>📧</span> Email
          </a>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
          <a href={CMS_CONFIG.whatsapp_link} target="_blank" rel="noreferrer" style={{ color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='#25D366'} onMouseOut={e => e.currentTarget.style.color='var(--white)'}>
            <span style={{ fontSize: '1.2rem' }}>📱</span> WhatsApp
          </a>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
          <a href={CMS_CONFIG.telegram_link} target="_blank" rel="noreferrer" style={{ color: 'var(--white)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color='#0088cc'} onMouseOut={e => e.currentTarget.style.color='var(--white)'}>
            <span style={{ fontSize: '1.2rem' }}>✈️</span> Telegram
          </a>
        </div>
      </div>
    </div>
  )
}
