import { useState, useEffect } from "react"
import { NavLink, Link, Outlet, useLocation } from "react-router-dom"
import { CMS_CONFIG } from "../data/cms"

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [registryOpen, setRegistryOpen] = useState(false)
  const [hotlineOpen, setHotlineOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => {
        setProjectsOpen(false)
        setRegistryOpen(false)
    }, 0)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-container">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <img src="/logo-circle.png" alt="Hinnavaru Blue" />
          </Link>

          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>Our Roots</NavLink></li>
            <li
              onMouseEnter={() => setProjectsOpen(true)}
              onMouseLeave={() => setProjectsOpen(false)}
              className="nav-dropdown-trigger"
            >
              <NavLink to="/projects">Projects</NavLink>
              <div className={`nav-dropdown ${projectsOpen ? "show" : ""}`}>
                <Link to="/projects">→ VIEW ALL MISSIONS</Link>
                <Link to="/projects?cat=coral">Coral Restoration</Link>
                <Link to="/projects?cat=sweep">Sweep Efforts</Link>
                <Link to="/projects?cat=edu">Edu Awareness</Link>
              </div>
            </li>
            <li
              onMouseEnter={() => setRegistryOpen(true)}
              onMouseLeave={() => setRegistryOpen(false)}
              className="nav-dropdown-trigger"
            >
              <NavLink to="/registry">Reef Guardians</NavLink>
              <div className={`nav-dropdown ${registryOpen ? "show" : ""}`}>
                <Link to="/registry">→ GUARDIAN IMPACT HUB</Link>
                <Link to="/registry#transparency">Public Transparency (Amaanaiy)</Link>
                <Link to="/live-lagoon">Live Mission Map</Link>
                <Link to="/blog">Program Blog</Link>
              </div>
            </li>
          </ul>
          <Link to="/sponsor" className="btn btn-primary btn-sm nav-cta">Adopt a Frame</Link>
        </div>
      </nav>

      <main><Outlet /></main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span style={{ fontWeight: 800 }}>HINNAVARU <span style={{ color: "var(--teal)"
      }}>BLUE</span></span>
              <p>A community-led coral restoration initiative protecting the lagoon of Hinnavaru, Maldives.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Hinnavaru Blue Initiative · NGO Reg. No. {CMS_CONFIG.ngo_registration}</span>
            <span>Made with 🪸 by P.729</span>
          </div>
        </div>
      </footer>
    </>
  )
}
