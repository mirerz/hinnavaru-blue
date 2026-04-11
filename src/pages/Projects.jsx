import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PROJECTS_LIST, PROJECT_CATEGORIES, CMS_CONFIG } from '../data/cms'
import MANIFEST from '../data/media-manifest.json'

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('cat') || 'coral'
  const [selectedProject, setSelectedProject] = useState(null)
  
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleTabChange = (catId) => {
    setSearchParams({ cat: catId })
  }

  // Cinematic Slideshow Logic
  const heroImages = useMemo(() => {
    return MANIFEST.slideshow.length > 0 
      ? MANIFEST.slideshow.map(m => m.startsWith('/') ? m : `/media-hub/${m}`)
      : ['/Project-Progs.png']
  }, [])

  useEffect(() => {
    if (heroImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages])

  // Combined media archives
  const allMedia = useMemo(() => {
    const archives = MANIFEST.archives.map(m => `/media-hub/${m}`)
    return archives
  }, [])

  const featuredMedia = useMemo(() => {
    const keyword = activeTab === 'coral' ? 'coral' : activeTab === 'sweep' ? 'clean' : 'aware'
    const filtered = allMedia.filter(m => m.toLowerCase().includes(keyword))
    return filtered.length > 0 ? filtered[0] : heroImages[0]
  }, [activeTab, allMedia, heroImages])

  const activeCatObj = PROJECT_CATEGORIES.find(c => c.id === activeTab)
  const filteredProjects = PROJECTS_LIST.filter(p => p.category === activeTab)

  return (
    <div className="projects-page">
      {/* 1. CINEMATIC HERO SLIDESHOW */}
      <section className="projects-hero section" style={{ position: 'relative', overflow: 'hidden', padding: '180px 0 120px', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        {/* Animated Background Layers */}
        {heroImages.map((img, idx) => (
          <div key={idx} style={{
            position: 'absolute', inset: 0, zIndex: 0,
            backgroundImage: `url('${img}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: idx === currentSlide ? 0.6 : 0,
            transition: 'opacity 1.5s ease-in-out',
            transform: idx === currentSlide ? 'scale(1.05)' : 'scale(1)',
            filter: 'brightness(0.7) contrast(1.1)'
          }} />
        ))}
        
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, var(--ocean-deep) 0%, rgba(2,11,24,0.4) 50%, var(--ocean-deep) 100%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="badge animate-reveal" style={{ marginBottom: '24px', background: 'rgba(13,211,197,0.2)', borderColor: 'var(--teal)', color: 'white' }}>🌊 MISSION LOG</div>
          <h1 className="section-title animate-reveal" style={{ fontSize: '4rem', marginBottom: '20px', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
            Deep Sea <span className="gradient-text">Frontlines</span>
          </h1>
          <p className="section-sub animate-reveal" style={{ margin: '0 auto', maxWidth: '800px', fontSize: '1.3rem', lineHeight: '1.6', opacity: 0.9 }}>
            Live archives from our Hinnavaru conservation sites. From coral nurseries to waste management — the data of resilience.
          </p>
        </div>
      </section>

      {/* 2. EXPLORATION INTERFACE */}
      <section className="section-sm" style={{ background: 'var(--ocean-deep)', paddingTop: '60px' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
           <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Active <span className="gradient-text">Sectors</span></h2>
        </div>
        
        <div className="container">
          <div className="mockup-tab-nav">
            {PROJECT_CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                className={`mockup-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => handleTabChange(cat.id)}
              >
                {cat.emoji} {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE DISPLAY FRAME */}
      <section className="section-sm" style={{ background: 'var(--ocean-deep)', paddingBottom: '80px' }}>
        <div className="container">
          <div className="featured-mission-container animate-reveal" key={activeTab}>
            <div className="featured-mission-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div className="badge badge-teal" style={{ marginBottom: '10px' }}>MISSION: {activeCatObj?.title.toUpperCase()}</div>
                <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{activeCatObj?.title}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="live-dot" /> <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--teal)' }}>DATA SYNC: STABLE</span>
              </div>
            </div>
            
            <div className="featured-media-frame" style={{ marginTop: '30px' }}>
              <div className="featured-media-inner">
                <img src={featuredMedia} alt="Featured Archive" style={{ transition: 'all 0.5s ease' }} />
                <div className="pulse-tag">
                  <span className="live-dot" /> 
                  <span>LATEST CAPTURE</span>
                </div>
              </div>
            </div>

            {/* Sub-grid for sector projects */}
            <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
              {filteredProjects.map((p, i) => (
                <div key={i} className="card animate-reveal" style={{ background: 'rgba(255,255,255,0.02)', padding: '30px', cursor: 'pointer', transition: 'transform 0.3s' }} onClick={() => setSelectedProject(p)}>
                  <div className="badge badge-teal" style={{ marginBottom: '15px' }}>{p.progress}% COMPLETE</div>
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{p.title}</h4>
                  <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>{p.desc.substring(0, 100)}...</p>
                  <div className="progress-bar" style={{ marginTop: '20px' }}>
                    <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal glass-card deep-dive-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className={`badge ${selectedProject.badgeClass}`} style={{ marginBottom: '8px' }}>
                  {selectedProject.emoji} {selectedProject.badge}
                </div>
                <h3 className="gradient-text">{selectedProject.title}</h3>
              </div>
              <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            </div>
            <div className="modal-content">
              <div className="deep-dive-grid">
                <div className="deep-dive-main">
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    {selectedProject.desc}
                  </p>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '24px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    <div className="funding-stats-dash">
                      <span className="gradient-text" style={{ fontSize: '2.5rem' }}>{selectedProject.progress}%</span>
                      <span style={{ marginLeft: '12px', fontSize: '0.9rem' }}>Project results delivered.</span>
                    </div>
                    <div className="progress-bar" style={{ height: '12px' }}>
                      <div className="progress-fill" style={{ width: `${selectedProject.progress}%` }} />
                    </div>
                  </div>
                </div>
                <div className="deep-dive-side">
                   <div className="mini-card" style={{ marginBottom: '12px' }}>
                     <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>STATUS</div>
                     <div style={{ fontWeight: 800, color: 'var(--teal)' }}>{selectedProject.status.toUpperCase()}</div>
                   </div>
                   <div className="mini-card" style={{ marginBottom: '12px' }}>
                     <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>LOCALE</div>
                     <div style={{ fontWeight: 800 }}>{CMS_CONFIG.atoll} Lagoon</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .mockup-tab-nav {
          display: flex;
          gap: 12px;
          border-bottom: 2px solid rgba(255,255,255,0.05);
          justify-content: center;
        }
        .mockup-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          padding: 20px 30px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        .mockup-tab-btn.active {
          color: var(--teal);
        }
        .mockup-tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--teal);
          box-shadow: 0 0 15px var(--teal);
        }

        .featured-mission-container {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 30px;
          padding: 60px;
          -webkit-backdrop-filter: blur(20px);
          backdrop-filter: blur(20px);
        }

        .featured-media-frame {
          position: relative;
          padding: 15px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(13,211,197,0.3);
          border-radius: 30px;
          box-shadow: 0 0 60px rgba(13,211,197,0.1);
        }
        .featured-media-inner {
          position: relative;
          aspect-ratio: 21/9;
          border-radius: 20px;
          overflow: hidden;
        }
        .featured-media-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .pulse-tag {
          position: absolute;
          top: 25px;
          right: 25px;
          background: rgba(0,0,0,0.6);
          padding: 10px 20px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--teal);
          font-size: 0.75rem;
          font-weight: 900;
        }

        .horizontal-scroller::-webkit-scrollbar { display: none; }
        .mini-card {
           background: rgba(255,255,255,0.03);
           padding: 16px;
           border-radius: 12px;
           border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  )
}
