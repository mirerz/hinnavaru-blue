import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PROJECT_ARCHIVE, PROJECTS_LIST, PROJECT_CATEGORIES } from '../data/cms'
import MANIFEST from '../data/media-manifest.json'

export default function Projects() {
  const [searchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showAllArchive, setShowAllArchive] = useState(false)

  // Media Assets from Manifest (Resolved to /media-hub/ for synced files)
  const heroImages = useMemo(() => {
    return MANIFEST.slideshow.length > 0 
      ? MANIFEST.slideshow.map(img => img.startsWith('/') ? img : `/media-hub/${img}`) 
      : ['/Project-Progs.png', '/Living-L.png', '/Born-Lagoon.png', '/Blue-Registry.png']
  }, [])
    
  const heroPulse = MANIFEST.hero_pulse 
    ? (MANIFEST.hero_pulse.startsWith('/') ? MANIFEST.hero_pulse : `/media-hub/${MANIFEST.hero_pulse}`)
    : '/pulse-update.mp4'

  // Slideshow Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  // Scroll to category if specified
  useEffect(() => {
    if (catParam) {
      const section = document.getElementById(catParam)
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [catParam])

  const categorized = useMemo(() => {
    return PROJECT_CATEGORIES.map(cat => ({
      ...cat,
      icon: cat.id === 'coral' ? '🪸' : cat.id === 'edu' ? '🏫' : '🧹',
      projects: PROJECTS_LIST.filter(p => p.category === cat.id)
    }))
  }, [])

  return (
    <div className="projects-layout" style={{ background: '#020b18', minHeight: '100vh', paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        
        {/* 1. DASHBOARD HERO */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }} className="animate-reveal">
          <h1 className="dashboard-hero-title">Exploration <span className="gradient-text">Dashboard</span></h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '[-24px] auto 0', fontSize: '1.1rem' }}>
            Live mission monitoring and program archives.
          </p>
        </div>

        {/* 2. MEDIA DASHBOARD (Multi-Panel) */}
        <div className="media-dashboard" id="media-hub">
          <div className="media-panel main-panel">
            {heroImages.map((img, idx) => (
              <img 
                key={img} 
                src={img} 
                alt={`Mission ${idx}`} 
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  opacity: currentSlide === idx ? 0.8 : 0,
                  transition: 'opacity 1s ease-in-out',
                  zIndex: currentSlide === idx ? 1 : 0
                }} 
              />
            ))}
            <div className="media-label-overlay">[ MISSION SLIDESHOW ]</div>
            <div className="slideshow-dots">
              {heroImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`dot ${currentSlide === idx ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>
          
          <div className="media-panel video-panel">
            <div className="media-label-overlay">Live Pulse</div>
            <video src={heroPulse} poster="/Living-L.png" autoPlay muted loop playsInline />
            <div className="pulse-active-indicator">
              <div className="live-dot"></div>
              <span>DIRECT FEED</span>
            </div>
          </div>
          
          <div className="media-panel side-panel">
             <div className="media-label-overlay">Deep Archives</div>
             <img src={heroImages[(currentSlide + 1) % heroImages.length]} alt="Gallery" />
          </div>
        </div>

        {/* 3. CATEGORY BANDS */}
        <div className="category-band-grid">
          {categorized.map(cat => (
            <div 
              key={cat.id} 
              className="category-band" 
              onClick={() => document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{ background: cat.id === 'coral' ? 'linear-gradient(to right, #0ea5e9, #0dd3c5)' : cat.id === 'edu' ? 'linear-gradient(to right, #10b981, #3b82f6)' : 'linear-gradient(to right, #6366f1, #a855f7)' }}
            >
              <div className="category-band-icon">{cat.icon}</div>
              <div style={{ flex: 1 }}>
                <h3>{cat.title}</h3>
                <p>{cat.id === 'coral' ? 'Nurturing Our Reefs' : cat.id === 'edu' ? 'Empowering Communities' : 'Cleaning Our Oceans'}</p>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.75rem', opacity: 0.9, background: 'rgba(0,0,0,0.2)', padding: '4px 10px', borderRadius: '4px' }}>
                {cat.projects.length} ACTIVE
              </div>
            </div>
          ))}
        </div>

        {/* 4. PROJECTS GRIDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginBottom: '100px' }}>
          {categorized.map(cat => (
            <div key={cat.id} id={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {cat.projects.map(p => (
                <div key={p.title} className="project-card-dash glass-card">
                  <div className="project-card-dash-img">
                    <img src={p.image || heroImages[0]} alt={p.title} />
                    <div className={`card-status-badge ${p.status === 'active' ? '' : 'planned'}`}>
                      {p.status === 'active' ? 'Active' : p.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="project-card-dash-body">
                    <div className="project-card-cat-tag">{cat.title}</div>
                    <h4>{p.title}</h4>
                    <p>{p.description || p.desc}</p>
                    
                    <div className="funding-progress-dash">
                      <div className="funding-label-dash">Mission Progress & Funding</div>
                      <div className="funding-stats-dash">
                        {p.raised || p.funded} <span>/ {p.target} Target</span>
                      </div>
                      <div className="progress-bar-new" style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div className="progress-fill-new" style={{ width: `${p.progress}%`, height: '100%', background: 'linear-gradient(90deg, #0ea5e9, #0dd3c5)', borderRadius: '100px' }}></div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                      <Link to={p.actionLink || '/registry'} className="dash-btn-ghost" style={{ margin: 0, flex: 1 }}>
                        [ MISSION HUB ]
                      </Link>
                      <button className="dash-btn-secondary">
                        <span style={{ fontSize: '1.2rem' }}>📸</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 5. RECENT TIMELINE & ARCHIVE */}
        <div className="timeline-dashboard animate-reveal" style={{ animationDelay: '0.4s' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '1rem', opacity: 0.6, margin: 0 }}>Mission Stream</h3>
                <div className="section-divider" style={{ margin: '8px 0', width: '40px' }}></div>
              </div>
              <button 
                onClick={() => setShowAllArchive(!showAllArchive)} 
                className="deep-archives-link" 
                style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
              >
                {showAllArchive ? 'CLOSE ARCHIVE' : 'DEEP ARCHIVES'} <span>{showAllArchive ? '↑' : '→'}</span>
              </button>
           </div>

           <div className={`timeline-row ${showAllArchive ? 'archive-expanded' : ''}`}>
              {(showAllArchive ? PROJECT_ARCHIVE : PROJECT_ARCHIVE.slice(0, 4)).map((m, i) => (
                <div key={i} className="timeline-dash-card animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                  <img src={m.image || heroImages[i % heroImages.length]} alt={m.title} />
                  <div className="timeline-dash-overlay">
                    <div className="timeline-dash-tag">{m.year || m.date} · {m.category || 'Mission'}</div>
                    <div className="timeline-dash-title">{m.title}</div>
                  </div>
                </div>
              ))}
           </div>

           {showAllArchive && PROJECT_ARCHIVE.length > 8 && (
             <div style={{ textAlign: 'center', marginTop: '48px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                   — End of Mission History —
                </p>
             </div>
           )}
        </div>

      </div>
    </div>
  )
}
