import { useState, useMemo, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CORAL_REGISTRY, FUND_ALLOCATION, DOCUMENT_VAULTS, CMS_CONFIG, REGISTRY_CONTENT } from '../data/cms'
import MANIFEST from '../data/media-manifest.json'
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
  const [docCategory, setDocCategory] = useState('all')
  const [animatedScore, setAnimatedScore] = useState(0)
  const { hash } = useLocation()

  const trustScore = 98.4

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(trustScore)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (hash === '#transparency') {
      const el = document.getElementById('transparency')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  const filtered = useMemo(() => {
    if (!CORAL_REGISTRY) return []
    return CORAL_REGISTRY.filter(c => {
      const matchSearch = 
        (c.id?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (c.species?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (c.adopter?.toLowerCase() || '').includes(search.toLowerCase())
      const matchFilter = filter === 'all' || c.status === filter
      return matchSearch && matchFilter
    })
  }, [search, filter])

  const filteredDocs = useMemo(() => {
    if (docCategory === 'all') return DOCUMENT_VAULTS
    return DOCUMENT_VAULTS.filter(d => d.category === docCategory)
  }, [docCategory])

  const paginated = filtered.slice(0, visibleCount)

  if (!REGISTRY_CONTENT) return <div className="container section">Loading Registry...</div>

  return (
    <div className="registry-page">
      <section className="sub-hero">
        <div className="sub-hero-bg" style={{ backgroundImage: `url('${REGISTRY_CONTENT.hero.bg_image}')` }} />
        <div className="container">
          <div className="badge badge-teal">{REGISTRY_CONTENT.hero.badge}</div>
          <h1 className="sub-hero-title">
            Reef <span className="gradient-text">Guardians</span>
          </h1>
          <p className="sub-hero-desc">{REGISTRY_CONTENT.hero.desc}</p>
        </div>
      </section>

      <section className="section-sm" style={{ paddingTop: 0, marginTop: '-100px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '40px 32px' }}>
            <div className="registry-search">
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

            <div className="registry-table-wrap">
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
                    const s = statusMap[c.status] || { label: c.status || 'Unknown', dot: 'dot-stable' }
                    return (
                      <tr key={c.id} onClick={() => setSelected(c)}>
                        <td><strong className="teal">{c.id}</strong></td>
                        <td><em>{c.species}</em></td>
                        <td>{c.location}</td>
                        <td>{c.depth}</td>
                        <td>{c.adopter}</td>
                        <td className="text-muted">{c.date}</td>
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
                            <span className="teal-small">{c.survival}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="empty-state">No frames match your search.</div>
              )}
            </div>
            
            {visibleCount < filtered.length && (
              <div className="load-more-wrap">
                <button 
                  className="btn btn-outline btn-sm" 
                  onClick={() => setVisibleCount(prev => prev + 10)}
                >
                  Load Next 10 Frames ↓
                </button>
              </div>
            )}

            <div className="registry-footer-info">
              Showing {paginated.length} of {filtered.length} matching frames · Total Registry: {CORAL_REGISTRY.length}
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENCY HUB */}
      <section className="section transparency-section" id="transparency">
        <div className="container">
          <div className="section-header-row">
            <div className="animate-reveal">
              <div className="badge badge-coral">{REGISTRY_CONTENT.transparency.badge}</div>
              <h2 className="section-title">Public <span className="gradient-text">Transparency Hub</span></h2>
              <p className="section-sub">{REGISTRY_CONTENT.transparency.desc}</p>
            </div>
            <div className="trust-meter animate-reveal">
              <svg viewBox="0 0 100 100" className="trust-circle">
                <circle cx="50" cy="50" r="45" className="circle-bg" />
                <circle cx="50" cy="50" r="45" className="circle-fill" style={{ strokeDashoffset: `${282.7 * (1 - animatedScore/100)}` }} />
              </svg>
              <div className="trust-content">
                <span className="score-num">{animatedScore.toFixed(1)}</span>
                <span className="score-label">Trust Score</span>
              </div>
            </div>
          </div>

          <div className="transparency-grid">
            {/* Financial Distribution Card */}
            <div className="card glass-card transparency-card animate-reveal">
              <div className="card-header-icon">
                <i className="fas fa-chart-pie"></i>
                <h3>{REGISTRY_CONTENT.transparency.funds.title}</h3>
              </div>
              <p className="text-secondary-small">{REGISTRY_CONTENT.transparency.funds.total}</p>
              <div className="fund-bars">
                {FUND_ALLOCATION.map((f, i) => (
                  <div className="fund-bar-item" key={i}>
                    <div className="fund-bar-label">
                      <span>{f.label}</span>
                      <span className="teal-small">{f.pct}%</span>
                    </div>
                    <div className="fund-bar-track">
                      <div className="fund-bar-fill" style={{ width: `${f.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer-info">
                <i className="fas fa-info-circle"></i> Last audited: Oct 2025 · Verified by Blockchain
              </div>
            </div>

            {/* Live Ledger / Activity Card */}
            <div className="card glass-card transparency-card animate-reveal">
              <div className="card-header-icon">
                <i className="fas fa-list-check teal"></i>
                <h3>Live Activity Ledger</h3>
              </div>
              <div className="live-ledger">
                {[
                  { time: '2 mins ago', msg: <>Status change: <span className="teal">Frame B-202</span> updated to <span className="dot-healthy-text">Healthy</span></>, icon: 'fa-rotate' },
                  { time: '45 mins ago', msg: <>New Audit Report uploaded for <span className="teal">Coastal Restoration</span></>, icon: 'fa-file-circle-check' },
                  { time: '3 hours ago', msg: <>Funding allocation approved: <span className="teal">Reef Expansion Phase 4</span></>, icon: 'fa-circle-check' },
                  { time: '5 hours ago', msg: <>New registration: <span className="teal">Deep Lagoon Coral A-45</span></>, icon: 'fa-plus-circle' }
                ].map((item, idx) => (
                  <div className="ledger-item" key={idx}>
                    <div className="ledger-icon-wrap">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div className="ledger-content">
                      <span className="ledger-time">{item.time}</span>
                      <p>{item.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline btn-sm w-full mt-24">
                <i className="fas fa-arrow-right-long mr-8"></i> View Full Audit Trail
              </button>
            </div>

            {/* Document Vault Card (Full Width) */}
            <div className="card glass-card transparency-card docs-vault-card col-span-full">
              <div className="vault-header">
                <div className="card-header-icon">
                  <i className="fas fa-file-shield"></i>
                  <h3>{REGISTRY_CONTENT.transparency.docs.title}</h3>
                </div>
                <div className="doc-filters">
                  {['all', 'Admin', 'Awareness', 'Scientific'].map(cat => (
                    <button 
                      key={cat} 
                      className={`doc-filter-btn ${docCategory === cat ? 'active' : ''}`}
                      onClick={() => setDocCategory(cat)}
                    >
                      {cat === 'all' ? 'All' : cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="docs-list-grid">
                {filteredDocs.map((d, i) => (
                  <div key={i} className="doc-item animate-reveal">
                    <span className="doc-icon">{d.icon}</span>
                    <div className="doc-info">
                      <div className="doc-title">{d.title}</div>
                      <div className="doc-meta">
                        <span className="doc-cat">{d.category}</span> · {d.type} · {d.date}
                      </div>
                    </div>
                    <div className="doc-actions">
                      {d.path ? (
                        <a href={d.path} target="_blank" rel="noopener" className="btn btn-primary btn-sm btn-icon-only">
                          <i className="fas fa-download"></i>
                        </a>
                      ) : (
                        <button className="btn btn-outline btn-sm btn-icon-only" onClick={() => { setSelectedDoc(d.title); setShowDocModal(true); }}>
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {filteredDocs.length === 0 && (
                  <div className="empty-state col-span-full">No documents in this category.</div>
                )}
              </div>
            </div>
          </div>
          
          <div className="transparency-footer-cta">
            <p>Are you a Hinnavaru citizen or investor? <a href="#" className="teal">Access the Private Oversight Portal</a></p>
          </div>
        </div>
      </section>

      {/* FRAME DETAIL MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="badge badge-teal mb-8">{selected.id}</div>
                <h3>{selected.species}</h3>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            </div>
            <div className="modal-grid">
              {[
                ['📍 Location', selected.location],
                ['🌊 Depth', selected.depth],
                ['💙 Adopter', selected.adopter],
                ['📅 Planted', selected.date],
              ].map(([label, val]) => (
                <div key={label} className="modal-stat-card">
                  <div className="modal-stat-label">{label}</div>
                  <div className="modal-stat-value">{val}</div>
                </div>
              ))}
            </div>

            {/* DYNAMIC FIELD OBSERVATION PHOTO */}
            <div className="modal-photo-section">
              <div className="modal-photo-label">📸 Latest Field Observation</div>
              <div className="modal-photo-wrap">
                 {(() => {
                   const archives = MANIFEST?.archives || [];
                   const match = archives.find(p => p.startsWith(selected.id));
                   const photoSrc = match 
                     ? (match.startsWith('/') ? match : `/media-hub/${match}`)
                     : '/media-hub/vibrant-coral-reef-stockcake.webp';
                   return (
                     <>
                       <img src={photoSrc} alt="Field update" />
                       <div className="photo-tag">
                         {match ? `Verified Sync: ${match.split('_')[1]?.split('.')[0] || 'Recent'}` : 'Reference Gallery'}
                       </div>
                     </>
                   );
                 })()}
              </div>
            </div>

            <div className="modal-survival-section">
              <div className="modal-survival-header">
                <span>Survival Rate</span>
                <span className="teal">{selected.survival}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${selected.survival}%` }} />
              </div>
            </div>

            <div className="modal-footer-btns">
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
    </div>
  )
}
