import { useState, useEffect } from "react"
import { NavLink, Link, Outlet, useLocation } from "react-router-dom"
import { CMS_CONFIG } from "../data/cms"

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [registryOpen, setRegistryOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setMenuOpen(false)
    setProjectsOpen(false)
    setRegistryOpen(false)
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
            <img src="/logo-circle.png" alt="Hinnavaru Blue" />
            <span className="nav-name">HINNAVARU <span>BLUE</span></span>
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
            
            <li 
              className={`nav-dropdown-trigger ${projectsOpen ? "active" : ""}`}
              onMouseEnter={() => setProjectsOpen(true)}
              onMouseLeave={() => setProjectsOpen(false)}
            >
              <NavLink to="/projects">Projects</NavLink>
              <div className="nav-dropdown">
                <Link to="/projects" onClick={() => setMenuOpen(false)}>→ VIEW ALL MISSIONS</Link>
                <Link to="/projects?cat=coral" onClick={() => setMenuOpen(false)}>Coral Restoration</Link>
                <Link to="/projects?cat=sweep" onClick={() => setMenuOpen(false)}>Sweep Efforts</Link>
                <Link to="/projects?cat=edu" onClick={() => setMenuOpen(false)}>Edu Awareness</Link>
              </div>
            </li>

            <li 
              className={`nav-dropdown-trigger ${registryOpen ? "active" : ""}`}
              onMouseEnter={() => setRegistryOpen(true)}
              onMouseLeave={() => setRegistryOpen(false)}
            >
              <NavLink to="/registry">Reef Guardians</NavLink>
              <div className="nav-dropdown">
                <Link to="/registry#transparency" onClick={() => setMenuOpen(false)}>Public Transparency (Amaanaiy)</Link>
                <Link to="/live-lagoon" onClick={() => setMenuOpen(false)}>Live Mission Map</Link>
                <Link to="/blog" onClick={() => setMenuOpen(false)}>Program Blog</Link>
              </div>
            </li>
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
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/logo-circle.png" alt="Hinnavaru Blue" />
                <span>HINNAVARU <span className="teal">BLUE</span></span>
              </div>
              <p>A community-led coral restoration initiative protecting the lagoon of Hinnavaru, Lhaviyani Atoll, Maldives.</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h5>Navigation</h5>
                <Link to="/">Home</Link>
                <Link to="/about">Our Roots</Link>
                <Link to="/projects">Projects</Link>
              </div>
              <div className="footer-col">
                <h5>Guardians</h5>
                <Link to="/registry">Reef Guardians</Link>
                <Link to="/live-lagoon">Live Map</Link>
                <Link to="/sponsor">Adopt a Frame</Link>
              </div>
              <div className="footer-col">
                <h5>Contact</h5>
                <a href={`mailto:${CMS_CONFIG.hello_email}`}>Email Us</a>
                <a href={CMS_CONFIG.whatsapp_link} target="_blank" rel="noopener">WhatsApp</a>
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
    </div>
  )
}
