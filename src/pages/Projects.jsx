import { useState, useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PROJECTS_LIST, PROJECT_CATEGORIES, CMS_CONFIG } from '../data/cms'
import MANIFEST from '../data/media-manifest.json'

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('cat') || 'coral'
  const [selectedProject, setSelectedProject] = useState(null)
  
  const scrollerRef = useRef(null)

  const handleTabChange = (catId) => {
    setSearchParams({ cat: catId })
  }

  // Combined media from manifest for gallery and featured
  const allMedia = useMemo(() => {
    const slides = MANIFEST.slideshow.map(m => m.startsWith('/') ? m : `/media-hub/${m}`)
    const archives = MANIFEST.archives.map(m => `/media-hub/${m}`)
    return [...slides, ...archives]
  }, [])

  // Filter media by category for the featured frame
  const featuredMedia = useMemo(() => {
    const keyword = activeTab === 'coral' ? 'coral' : activeTab === 'sweep' ? 'clean' : 'aware'
    const filtered = allMedia.filter(m => m.toLowerCase().includes(keyword))
    return filtered.length > 0 ? filtered[0] : allMedia[0] || '/Project-Progs.png'
  }, [activeTab, allMedia])

  const activeCatObj = PROJECT_CATEGORIES.find(c => c.id === activeTab)

  return (
    <div className="projects-page">
      {/* 1. ORIGINAL HERO LANDING BLOCK */}
      <section className="projects-hero section" style={{ position: 'relative', overflow: 'hidden', padding: '160px 0 100px', textAlign: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('/Project-Progs.png')`, // Using the standard community hero image
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.25
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(to bottom, var(--ocean-deep) 0%, transparent 50%, var(--ocean-deep) 100%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="badge" style={{ marginBottom: '16px', background: 'rgba(14, 165, 233, 0.15)', borderColor: 'rgba(14, 165, 233, 0.4)', color: 'var(--teal)' }}>🌊 OUR WORK</div>
          <h1 className="section-title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>
            Projects & <span className="gradient-text">Programs</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: '700px', fontSize: '1.2rem', lineHeight: '1.6' }}>
            From underwater nurseries to classroom education — every project is designed to build lasting ocean resilience for Hinnavaru.
          </p>
        </div>
      </section>

      {/* 2. EXPLORATION LENS SUB-HEADER */}
      <section className="section-sm" style={{ paddingTop: '64px', textAlign: 'center' }}>
        <div className="container">
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>🚀 Exploration Lens</div>
          <h2 className="section-title" style={{ marginBottom: '8px', fontSize: '2rem' }}>
            Exploration <span className="gradient-text">Lens</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', opacity: 0.8, fontSize: '0.9rem' }}>
            Live mission monitoring and program archives.
          </p>
        </div>
      </section>

      {/* 2. TABS NAVIGATION */}
      <section style={{ marginBottom: '40px' }}>
        <div className="container">
          <div className="mockup-tab-nav">
            {PROJECT_CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                className={`mockup-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => handleTabChange(cat.id)}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED CONTENT BLOCK (Active Tab) */}
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="featured-mission-container animate-reveal" key={activeTab}>
            <div className="featured-mission-header">
              <h2>{activeCatObj?.title}</h2>
              <p>Deploying field-tested solutions for the {activeTab} sector. Shuffling latest 10 archive assets...</p>
            </div>
            
            <div className="featured-media-frame">
              <div className="featured-media-inner">
                <img src={featuredMedia} alt="Featured Archive" />
                <div className="pulse-tag">
                  <span className="live-dot" /> 
                  <span>LIVE DATA STREAMING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAPTURE STREAM (Horizontal Scroller) */}
      <section className="section capture-stream-section" style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="stream-header" style={{ marginBottom: '32px', textAlign: 'center' }}>
             <div className="badge badge-teal" style={{ marginBottom: '16px' }}>📂 THE DEEP ARCHIVE</div>
             <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '8px' }}>Program <span className="gradient-text">Capture Stream</span></h2>
             <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Exploring the historical mission data and field observations from the Lhaviyani frontline.</p>
          </div>

          <div className="horizontal-scroller-container">
            <div className="horizontal-scroller" ref={scrollerRef}>
              {allMedia.length > 0 ? allMedia.slice(0, 15).map((img, i) => (
                <div key={i} className="scroller-item card" style={{ padding: 0, overflow: 'hidden' }}>
                   <img src={img} alt="Archive stream" />
                   <div className="scroller-item-overlay">
                     <span>LATEST SYNC</span>
                   </div>
                </div>
              )) : (
                [1,2,3,4,5].map(i => (
                  <div key={i} className="scroller-item card" style={{ padding: 0, overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }} />
                ))
              )}
            </div>
          </div>
          
          <div className="scroller-hint">
             Scroll left and right to explore more deep sea updates
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
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 2px;
        }
        .mockup-tab-btn {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-muted);
          padding: 18px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .mockup-tab-btn:hover {
          background: rgba(13,211,197,0.1);
          color: white;
        }
        .mockup-tab-btn.active {
          background: rgba(13,211,197,0.15);
          color: var(--teal);
          border-color: var(--teal);
          border-bottom: 2px solid var(--teal);
          box-shadow: 0 -4px 15px rgba(13,211,197,0.1);
        }

        .featured-mission-container {
          background: var(--ocean-mid);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 40px;
        }
        .featured-mission-header {
          margin-bottom: 32px;
        }
        .featured-mission-header h2 {
          font-size: 1.8rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }
        .featured-mission-header p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          max-width: 600px;
        }

        .featured-media-frame {
          position: relative;
          padding: 10px;
          background: var(--ocean-surface);
          border: 3px solid var(--teal);
          border-radius: 24px;
          box-shadow: 0 0 40px rgba(13,211,197,0.2);
          overflow: hidden;
        }
        .featured-media-inner {
          position: relative;
          aspect-ratio: 16/9;
          border-radius: 14px;
          overflow: hidden;
          background: #000;
        }
        .featured-media-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .pulse-tag {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0,0,0,0.6);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(13,211,197,0.4);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .horizontal-scroller-container {
          position: relative;
          margin: 0 -24px;
          padding: 0 24px;
        }
        .horizontal-scroller {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding: 10px 0 30px;
          scroll-snap-type: x mandatory;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .horizontal-scroller::-webkit-scrollbar { display: none; }
        
        .scroller-item {
          flex: 0 0 320px;
          height: 200px;
          border-radius: 16px;
          position: relative;
          scroll-snap-align: start;
          transition: all 0.3s ease;
        }
        .scroller-item:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: var(--teal);
        }
        .scroller-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .scroller-item-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          font-size: 0.6rem;
          font-weight: 900;
          color: var(--teal);
        }
        .scroller-hint {
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 20px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .card-pulse-indicator {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(2,11,24,0.7);
          padding: 4px 10px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(13,211,197,0.3);
        }

        .mini-card {
           background: rgba(255,255,255,0.03);
           padding: 12px 16px;
           border-radius: 8px;
           border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  )
}
