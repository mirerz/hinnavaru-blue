import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CORAL_REGISTRY, FUND_ALLOCATION, DOCUMENT_VAULTS, CMS_CONFIG, REGISTRY_CONTENT } from '../data/cms'
import TransparencyModal from '../components/TransparencyModal'

const statusMap = {
  healthy: { dot: 'dot-healthy', label: 'Healthy' },
  stable: { dot: 'dot-stable', label: 'Stable' },
  attention: { dot: 'dot-attention', label: 'Needs Attention' },
  critical: { dot: 'dot-critical', label: 'Critical' },
}

export default function Registry() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [showDocModal, setShowDocModal] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState('')
  const [visibleCount, setVisibleCount] = useState(10)

  const filtered = useMemo(() => {
    return CORAL_REGISTRY.filter(c => {
      const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.species.toLowerCase().includes(search.toLowerCase()) ||
        c.adopter.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filter === 'all' || c.status === filter
      return matchSearch && matchFilter
    })
  }, [search, filter])

  const paginated = filtered.slice(0, visibleCount)

  return (
    <>
      <section className="registry-hero section" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '160px' }}>
        {/* Background Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('${REGISTRY_CONTENT.hero.bg_image}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.3
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(to bottom, var(--ocean-deep) 0%, transparent 30%, transparent 70%, var(--ocean-deep) 100%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>{REGISTRY_CONTENT.hero.badge}</div>
          <h1 className="section-title">
            The Blue <span className="gradient-text">Registry</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            {REGISTRY_CONTENT.hero.desc}
          </p>
        </div>
      </section>

      <section className="section-sm" style={{ paddingTop: 0, marginTop: '-100px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '40px 32px' }}>
            <div className="registry-search" style={{ marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="🔍 Search by frame ID, species, or adopter..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  setVisibleCount(10)
                }}
              />
              <select value={filter} onChange={e => {
                setFilter(e.target.value)
                setVisibleCount(10)
              }}>
                <option value="all">All Statuses</option>
                <option value="healthy">🟢 Healthy</option>
                <option value="stable">🔵 Stable</option>
                <option value="attention">🟡 Needs Attention</option>
                <option value="critical">🔴 Critical</option>
              </select>
            </div>

            <div className="registry-table-wrap" style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: 'none' }}>

            <table className="registry-table">
              <thead>
                <tr>
                  <th>Frame ID</th>
                  <th>Species</th>
                  <th>Location</th>
                  <th>Depth</th>
                  <th>Adopter</th>
                  <th>Planted</th>
                  <th>Status</th>
                  <th>Survival</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map(c => {
                  const s = statusMap[c.status]
                  return (
                    <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
                      <td><strong style={{ color: 'var(--blue-light)' }}>{c.id}</strong></td>
                      <td><em>{c.species}</em></td>
                      <td>{c.location}</td>
                      <td>{c.depth}</td>
                      <td>{c.adopter}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{c.date}</td>
                      <td>
                        <div className="status-dot">
                          <div className={`dot ${s.dot}`} />
                          <span>{s.label}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="progress-bar" style={{ flex: 1, height: '5px' }}>
                            <div className="progress-fill" style={{ width: `${c.survival}%` }} />
                          </div>
                          <span style={{ fontSize: '0.8rem', color: 'var(--teal)', minWidth: '32px' }}>{c.survival}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                No frames match your search.
              </div>
            )}
            </div>
            
            {visibleCount < filtered.length && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button 
                  className="btn btn-outline btn-sm" 
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  style={{ padding: '12px 32px', fontSize: '0.9rem' }}
                >
                  Load Next 10 Frames ↓
                </button>
              </div>
            )}

            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '16px', textAlign: 'center' }}>
              Showing {paginated.length} of {filtered.length} matching frames · Total Registry: {CORAL_REGISTRY.length}
            </div>
          </div>
        </div>
      </section>


      {/* TRANSPARENCY HUB */}
      <section className="section transparency-section" id="transparency">
        <div className="container">
          <div className="badge badge-coral" style={{ marginBottom: '16px' }}>{REGISTRY_CONTENT.transparency.badge}</div>
          <h2 className="section-title">Transparency <span className="gradient-text">Hub</span></h2>
          <p className="section-sub">{REGISTRY_CONTENT.transparency.desc}</p>

          <div className="transparency-grid">
            <div className="card transparency-card">
              <h4>{REGISTRY_CONTENT.transparency.funds.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>{REGISTRY_CONTENT.transparency.funds.total}</p>
              <div className="fund-bars">
                {FUND_ALLOCATION.map((f, i) => (
                  <div className="fund-bar-item" key={i}>
                    <div className="fund-bar-label">
                      <span>{f.label}</span>
                      <span>{f.pct}%</span>
                    </div>
                    <div className="fund-bar-track">
                      <div className="fund-bar-fill" style={{ width: `${f.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card transparency-card">
              <h4>{REGISTRY_CONTENT.transparency.docs.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>{REGISTRY_CONTENT.transparency.docs.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {DOCUMENT_VAULTS.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                    <span style={{ fontSize: '1.3rem' }}>{d.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{d.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.type} · {d.date}</div>
                    </div>
                        <button 
                          className="btn btn-outline btn-sm" 
                          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                          onClick={() => {
                            setSelectedDoc(d.title)
                            setShowDocModal(true)
                          }}
                        >
                          ✉️ Request
                        </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FRAME DETAIL MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="badge badge-teal" style={{ marginBottom: '8px' }}>{selected.id}</div>
                <h3>{selected.species}</h3>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              {[
                ['📍 Location', selected.location],
                ['🌊 Depth', selected.depth],
                ['💙 Adopter', selected.adopter],
                ['📅 Planted', selected.date],
              ].map(([label, val]) => (
                <div key={label} style={{ background: 'var(--card-bg)', borderRadius: '8px', padding: '12px', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                <span>Survival Rate</span>
                <span style={{ color: 'var(--teal)' }}>{selected.survival}%</span>
              </div>
              <div className="progress-bar" style={{ height: '10px' }}>
                <div className="progress-fill" style={{ width: `${selected.survival}%` }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/live-lagoon" className="btn btn-primary btn-sm">View on Map</Link>
              <button className="btn btn-outline btn-sm" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <TransparencyModal 
        isOpen={showDocModal} 
        onClose={() => setShowDocModal(false)} 
        documentTitle={selectedDoc}
      />
    </>
  )
}
