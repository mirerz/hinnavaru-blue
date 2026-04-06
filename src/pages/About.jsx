import React from 'react'
import { Link } from 'react-router-dom'
import { ABOUT_CONTENT, PILLARS, CMS_CONFIG } from '../data/cms'

export default function About() {
  const { hero, narrative } = ABOUT_CONTENT

  return (
    <>
      {/* 1. NARRATIVE: THE CHANNEL */}
      <section className="about-hero section" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '160px' }}>
        {/* Background Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('${hero.bg_image}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.3
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(to bottom, var(--ocean-deep) 0%, transparent 30%, transparent 70%, var(--ocean-deep) 100%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="badge badge-teal" style={{ marginBottom: '20px' }}>{hero.badge}</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '0', lineHeight: '1.2' }}>
            {hero.title.split(':').map((part, i) => (
              <span key={i}>
                {i === 0 ? part + ':' : <br/>}
                {i !== 0 && <span className="gradient-text">{part}</span>}
              </span>
            ))}
          </h1>
          <p className="hero-sub" style={{ margin: '24px auto' }}>{narrative.intro.replace(/<[^>]*>/g, '')}</p>
        </div>
      </section>

      {/* OVERLAY NARRATIVE (Block Methods) */}
      <div className="container" style={{ position: 'relative', marginTop: '-120px', zIndex: 10, marginBottom: '64px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Shipyard Block */}
          <div className="glass-card" style={{ padding: '64px 48px', borderLeft: '6px solid var(--teal)' }}>
            <div style={{ maxWidth: '720px' }}>
              <div className="badge" style={{ marginBottom: '16px' }}>⚓ The Legacy</div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '24px' }}>{narrative.shipyard.title}</h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '32px' }}>{narrative.shipyard.text}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {narrative.shipyard.vessels.map((v, i) => (
                  <div key={i} className="card" style={{ background: 'rgba(255,255,255,0.02)', padding: '24px' }}>
                    <h4 style={{ color: 'var(--teal)', fontSize: '1.2rem', marginBottom: '10px' }}>{v.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Catalyst Block */}
          <div className="glass-card" style={{ padding: '64px 48px', borderRight: '6px solid var(--coral)', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ maxWidth: '720px' }}>
              <div className="badge badge-coral" style={{ marginBottom: '16px' }}>🔥 The Spark</div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '24px' }}>{narrative.catalyst.title}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>{narrative.catalyst.p1}</p>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>{narrative.catalyst.p2}</p>
              <div className="card" style={{ padding: '24px', background: 'rgba(255,107,107,0.04)', border: '1px solid rgba(255,107,107,0.1)' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: 'var(--white)' }} dangerouslySetInnerHTML={{ __html: narrative.catalyst.p3 }} />
              </div>
            </div>
          </div>

          {/* Model Block */}
          <div className="glass-card" style={{ padding: '64px 48px', borderLeft: '6px solid var(--blue-primary)' }}>
            <div style={{ maxWidth: '720px' }}>
              <div className="badge badge-teal" style={{ marginBottom: '16px' }}>🧬 The Blueprint</div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '24px' }}>{narrative.model.title}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '32px' }}>{narrative.model.p1}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {narrative.model.bullets.map((b, i) => (
                  <div key={i}>
                    <h5 style={{ color: 'var(--teal)', fontSize: '1rem', fontWeight: 800, marginBottom: '8px' }}>{b.label}</h5>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ background: 'var(--ocean-mid)', padding: '120px 0' }}>
        <div className="container">
           <div className="card" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '64px' }}>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '24px' }}>Secure the <span className="gradient-text">Heart of Maldives</span></h2>
              <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '40px' }}>"{narrative.footer_quote}"</p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Link to="/projects" className="btn btn-primary">Our Programs</Link>
                <Link to="/registry#transparency" className="btn btn-outline" style={{ color: 'var(--teal)' }}>Transparency Hub →</Link>
              </div>
           </div>
        </div>
      </section>

      {/* 4. THE 5 PILLARS (Premium Grid) */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '32px' 
          }}>
            {/* The Intro & Anchor Card */}
            <div className="glass-card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'flex-start',
              padding: '48px 32px',
            }}>
              <div className="badge" style={{ marginBottom: '24px' }}>⚓ Mission Anchors</div>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: 1.1 }}>
                The Five <br/><span className="gradient-text">Vitals</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
                Our values are the currents that guide us. Every fragment is rooted in indigenous sea-wisdom and radical accountability.
              </p>
            </div>

            {/* The 5 Pillar Cards using CMS data */}
            {PILLARS.map((p, i) => (
              <div 
                className="glass-card" 
                key={i}
                style={{
                  position: 'relative',
                  padding: '48px 32px',
                  zIndex: 1
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: '32px', right: '32px', height: '2px', background: 'linear-gradient(90deg, var(--blue-primary), var(--teal))', opacity: 0.6 }} />
                
                <div style={{ fontSize: '2.5rem', marginBottom: '24px', filter: 'drop-shadow(0 4px 12px rgba(13,211,197,0.3))' }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '4px', fontStyle: 'italic', letterSpacing: '0.5px', color: 'var(--white)' }}>{p.title}</h3>
                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--teal)', letterSpacing: '3px', marginBottom: '20px', fontWeight: 800 }}>{p.sub}</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem', margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
