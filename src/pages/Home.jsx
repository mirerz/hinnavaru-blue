import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NOTICE_BOARD, CMS_CONFIG, LAGOON_STORIES, APPROVED_GUARDIANS, LAGOON_ASSETS, HOME_CONTENT, IMPACT_PILLARS } from '../data/cms'

export default function Home() {
  const [pulseIdx, setPulseIdx] = useState(0)
  const [focusIdx, setFocusIdx] = useState(0)
  const [updateIdx, setUpdateIdx] = useState(0)

  // Auto-cycle the LiveUp ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setUpdateIdx(prev => (prev + 1) % LATEST_BULLETINS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Filter Active Stories (Non-expired)
  const activeStories = LAGOON_STORIES.filter(s => new Date() < new Date(s.expiryDate))
  const videoStories = activeStories.filter(s => s.type === 'video')
  const photoStories = activeStories.filter(s => s.type === 'photo')

  const getGuardian = (id) => APPROVED_GUARDIANS.find(g => g.id === id) || { name: 'Guardian', avatar: '🛡️' }

  return (
    <>
      {/* 1. HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-img" />
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="hero-eyebrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>HINNAVARU BLUE INITIATIVE</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.8 }}>{CMS_CONFIG.atoll} · ({CMS_CONFIG.location_code}) · Maldives ({CMS_CONFIG.country_code})</span>
            </div>
            <h1 style={{ textAlign: 'center' }}>
              {HOME_CONTENT.hero.title} <br />
              <span className="gradient-text">{HOME_CONTENT.hero.subtitle}</span>
            </h1>

            {/* LIVEUP TICKER */}
            <div className="liveup-ticker animate-reveal" style={{ 
              marginTop: '16px', 
              background: 'rgba(13,211,197,0.1)', 
              border: '1px solid rgba(13,211,197,0.2)',
              borderRadius: '24px',
              padding: '6px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span className="live-dot" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--teal)' }}>LIVE UPDATE:</span>
              <span key={updateIdx} className="fade-in" style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                {NOTICE_BOARD[updateIdx % NOTICE_BOARD.length].text}
              </span>
            </div>

            <p className="hero-sub" style={{ textAlign: 'center', marginTop: '24px' }}>
              {HOME_CONTENT.hero.desc}
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/live-lagoon" className="btn btn-outline">🗺️ Explore Live Map</Link>
            </div>
          </div>
        </div>
        <div className="waves-container">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" style={{ height: '60px' }}>
            <defs>
              <path id="wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g>
              <use href="#wave" x="48" y="0" fill="rgba(14,165,233,0.05)" />
              <use href="#wave" x="48" y="3" fill="rgba(13,211,197,0.04)" />
              <use href="#wave" x="48" y="5" fill="rgba(2,11,24,0.8)" />
            </g>
          </svg>
        </div>
        <div className="hero-scroll">
          <span style={{ letterSpacing: '0.1em', fontSize: '0.7rem' }}>SCROLL</span>
          <span>↓</span>
        </div>
      </section>

      {/* 2. ADOPT OVERLAY */}
      <div className="container" style={{ position: 'relative', marginTop: '-120px', zIndex: 10, display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
        <div className="glass-card" style={{ 
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '700px',
          width: '100%',
        }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '1.8rem', fontWeight: 700 }}>{HOME_CONTENT.adopt_overlay.title}</h2>
          <p style={{ margin: '0 0 24px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            {HOME_CONTENT.adopt_overlay.text}
          </p>
          <Link to="/sponsor" className="btn btn-coral" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>🪸 Adopt a Coral Frame</Link>
        </div>
      </div>

      {/* 3. LATEST & STATS (Multimedia Hub) */}
      <section className="section" style={{ background: 'linear-gradient(to bottom, var(--ocean-deep) 0%, var(--ocean-mid) 100%)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ textAlign: 'left' }}>
              <div className="badge badge-teal" style={{ marginBottom: '12px' }}>🎞️ Live Updates</div>
              <h2 className="section-title" style={{ margin: 0, textAlign: 'left' }}>In Action</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.9rem' }}>Real-time visuals approved via HBI Hotline ({CMS_CONFIG.hotline})</p>
            </div>
          </div>

          <div className="latest-hub-grid">
            {/* The Pulse (Dynamic Video) */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>The Pulse</h3>
                <p style={{ color: 'var(--teal)', fontSize: '0.85rem', margin: '4px 0 0' }}>Approved Lagoon Reel</p>
              </div>
              <div style={{ position: 'relative', aspectRatio: '9/16', background: '#000', overflow: 'hidden' }}>
                {videoStories.length > 0 ? (
                  <>
                    <video 
                      key={pulseIdx} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                      <source src={videoStories[pulseIdx].url} type="video/mp4" />
                    </video>
                    <div className="story-overlay">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.2rem' }}>{getGuardian(videoStories[pulseIdx].guardianId).avatar}</span>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{getGuardian(videoStories[pulseIdx].guardianId).name}</div>
                          <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>Verified Contribution</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Awaiting hotline approval...</div>}
                
                {videoStories.length > 1 && (
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', padding: '0 12px', pointerEvents: 'none' }}>
                    <button onClick={() => setPulseIdx(prev => (prev - 1 + videoStories.length) % videoStories.length)} style={{ pointerEvents: 'auto' }} className="btn-story-nav">←</button>
                    <button onClick={() => setPulseIdx(prev => (prev + 1) % videoStories.length)} style={{ pointerEvents: 'auto' }} className="btn-story-nav">→</button>
                  </div>
                )}
              </div>
            </div>

            {/* The Focus (Dynamic Photo) */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>The Focus</h3>
                <p style={{ color: 'var(--teal)', fontSize: '0.85rem', margin: '4px 0 0' }}>Community Capture</p>
              </div>
              <div style={{ position: 'relative', flexGrow: 1, aspectRatio: '9/16', overflow: 'hidden', background: '#000' }}>
                {photoStories.length > 0 ? (
                  <>
                    <img 
                      src={photoStories[focusIdx].url} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s' }} 
                      alt="Verified capture" 
                    />
                    <div className="story-overlay">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.2rem' }}>{getGuardian(photoStories[focusIdx].guardianId).avatar}</span>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{getGuardian(photoStories[focusIdx].guardianId).name}</div>
                          <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>Real-time Seeding Update</div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Syncing with archive...</div>}

                {photoStories.length > 1 && (
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-50%)', display: 'flex', justifyContent: 'space-between', padding: '0 12px', pointerEvents: 'none' }}>
                    <button onClick={() => setFocusIdx(prev => (prev - 1 + photoStories.length) % photoStories.length)} style={{ pointerEvents: 'auto' }} className="btn-story-nav">←</button>
                    <button onClick={() => setFocusIdx(prev => (prev + 1) % photoStories.length)} style={{ pointerEvents: 'auto' }} className="btn-story-nav">→</button>
                  </div>
                )}
              </div>
            </div>

            {/* Notice Board Block */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>The Notice Board</h3>
                <p style={{ color: 'var(--teal)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>Official Transmissions</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem', flexGrow: 1 }}>
                {NOTICE_BOARD.slice(updateIdx * 3, (updateIdx + 1) * 3).map((n, i) => (
                  <div style={{ display: 'flex', gap: '12px' }} key={i}>
                    <span>{n.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--teal)', fontWeight: 800, textTransform: 'uppercase' }}>{n.type}</div>
                      <span style={{ color: 'rgba(255,255,255,0.9)' }}>{n.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                    <button onClick={() => setUpdateIdx(prev => Math.max(0, prev - 1))} className="btn-story-nav" style={{ padding: '6px 12px' }}>←</button>
                    <button onClick={() => setUpdateIdx(prev => Math.min(Math.ceil(NOTICE_BOARD.length / 3) - 1, prev + 1))} className="btn-story-nav" style={{ padding: '6px 12px' }}>→</button>
                 </div>
                 <Link to="/about" className="btn btn-outline btn-sm" style={{ flex: 2 }}>Our Mission</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IMPACT (What We Do) */}
      <section className="section animate-reveal">
        <div className="container">
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>🌿 What We Do</div>
          <h2 className="section-title">
            Protecting the Reef, <span className="gradient-text">Empowering the Community</span>
          </h2>
          <p className="section-sub">From underwater nurseries to open data, every aspect of Hinnavaru Blue is designed for maximum impact and accountability.</p>
          <div className="impact-grid">
            {IMPACT_PILLARS.map((item, i) => (
              <div className="card impact-card" key={i}>
                <div className="impact-card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MISSION STRIP */}
      <section className="section-sm">
        <div className="container">
          <div className="mission-strip">
            <blockquote className="mission-quote">
              "{HOME_CONTENT.mission_strip.quote}"
              <footer style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--teal)', fontFamily: 'var(--font)' }}>
                — {HOME_CONTENT.mission_strip.author}
              </footer>
            </blockquote>
            <div className="mission-body">
              <div className="badge" style={{ marginBottom: '16px' }}>🎯 Our Mission</div>
              <p>{HOME_CONTENT.mission_strip.p1}</p>
              <p>{HOME_CONTENT.mission_strip.p2}</p>
              <Link to="/about" className="btn btn-outline btn-sm" style={{ marginTop: '8px' }}>Learn Our Story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: '120px 0', marginTop: '64px' }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('${HOME_CONTENT.cta_banner.bg_image}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.3
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(to bottom, var(--ocean-mid) 0%, transparent 20%, transparent 80%, var(--ocean-mid) 100%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
          <div className="glass-card" style={{
            padding: '56px',
            textAlign: 'center',
            maxWidth: '800px',
            width: '100%'
          }}>
            <div className="badge badge-coral" style={{ marginBottom: '20px' }}>{HOME_CONTENT.cta_banner.badge}</div>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>
              {HOME_CONTENT.cta_banner.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 32px', textAlign: 'center', lineHeight: '1.7' }}>
              {HOME_CONTENT.cta_banner.text}
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/sponsor" className="btn btn-coral btn-pulse">Adopt a Frame</Link>
              <Link to="/live-lagoon" className="btn btn-outline">Explore the Lagoon</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
