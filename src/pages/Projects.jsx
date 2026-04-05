import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { PROJECT_ARCHIVE, PROJECTS_LIST, PROJECT_CATEGORIES } from '../data/cms'

export default function Projects() {
  const [searchParams] = useSearchParams()
  const cat = searchParams.get('cat')
  const [notified, setNotified] = useState({})
  const [joined, setJoined] = useState({})

  // Shuffle projects on load
  const shuffledProjects = useMemo(() => {
    const list = [...PROJECTS_LIST]
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]]
    }
    return list
  }, [])

  const filtered = useMemo(() => {
    if (!cat) return shuffledProjects
    return shuffledProjects.filter(p => p.category === cat)
  }, [cat, shuffledProjects])

  const categoryTitle = useMemo(() => {
    return PROJECT_CATEGORIES.find(c => c.id === cat)?.title || 'Our Work'
  }, [cat])

  return (
    <>
      <section className="projects-hero section" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '200px' }}>
        {/* Background Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: "url('/Project-Progs.png')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.3
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(to bottom, var(--ocean-deep) 0%, transparent 30%, transparent 70%, var(--ocean-deep) 100%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>🌊 {categoryTitle}</div>
          <h1 className="section-title">
            Projects & <span className="gradient-text">Programs</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            From underwater nurseries to classroom education — every project is designed to build lasting ocean resilience for Hinnavaru.
          </p>
        </div>
      </section>

      {/* OVERLAY PROJECTS (Glassmorphism) */}
      <section className="section-sm" style={{ paddingTop: 0, marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="projects-grid">
            {filtered.map((p, i) => (
              <div 
                className="glass-card project-card" 
                key={p.title}
              >

                <div className="project-card-top">
                  <div className="project-emoji">{p.emoji}</div>
                  <span className={`badge ${p.badgeClass}`}>{p.badge}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${p.progress}%` }} />
                </div>
                <div className="project-meta">
                  <span>{p.progressLabel}</span>
                  <span>{p.funded} / {p.target}</span>
                </div>
                <div className="project-actions">
                  {p.status === 'active' ? (
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setJoined(prev => ({ ...prev, [p.title]: true }))}
                      >
                        {joined[p.title] ? p.actionPrimaryDone : p.actionPrimary}
                      </button>
                      <a href={p.actionSecondaryLink} className="btn btn-outline btn-sm">{p.actionSecondary}</a>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setNotified(prev => ({ ...prev, [p.title]: true }))}
                      >
                        {notified[p.title] ? p.actionPrimaryDone : p.actionPrimary}
                      </button>
                      <a href={p.actionSecondaryLink} className="btn btn-coral btn-sm">{p.actionSecondary}</a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <h3 style={{ opacity: 0.5 }}>Currently launching more programs...</h3>
              <Link to="/projects" className="btn btn-outline" style={{ marginTop: '24px' }}>View All Projects</Link>
            </div>
          )}
        </div>
      </section>

      {/* ARCHIVE -> IN ACTION / DOCUMENT VAULTS */}
      <section className="section" id="archive">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>📁 Archive</div>
          <h2 className="section-title">Deep <span className="gradient-text">Archives</span></h2>
          <p className="section-sub">Every milestone, every frame, every dive — documented for posterity and accountability.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px', marginBottom: '64px' }}>
            {/* Visuals Block */}
            <div className="card" style={{ padding: '48px', background: 'rgba(255, 255, 255, 0.02)', borderLeft: '4px solid var(--teal)', transition: 'var(--transition)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📸</div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>In Action</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.7' }}>
                High-definition drone captures of the Shipyard area, bi-weekly underwater time-lapses of nursing frames, and monthly progress photography.
              </p>
              <button className="btn btn-outline" style={{ padding: '12px 32px' }}>👁️ View Media visuals</button>
            </div>

            {/* Docs Block */}
            <div className="card" style={{ padding: '48px', background: 'rgba(255, 255, 255, 0.02)', borderLeft: '4px solid var(--blue-primary)', transition: 'var(--transition)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📑</div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Document Vaults</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.7' }}>
                Official registries, annual financial audits, marine ecology impact assessments (EIA), and our community-led conservation protocols.
              </p>
              <Link to="/registry#transparency" className="btn btn-outline" style={{ padding: '12px 32px' }}>👁️ Access Registry Vaults</Link>
            </div>
          </div>

          <div style={{ paddingTop: '48px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--teal)', fontWeight: 600, marginBottom: '24px' }}>📅 Recent Timeline</h3>
            <div className="archive-grid">
              {PROJECT_ARCHIVE.map((a, i) => (
                <div className="archive-item" key={i}>
                  <div className="archive-year">{a.year}</div>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
