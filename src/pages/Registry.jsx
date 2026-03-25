import { useState } from 'react'

const corals = [
  { id: 'HBF-001', species: 'Acropora muricata', location: 'North Lagoon, Zone A', depth: '4m', sponsor: 'Ahmed & Family', date: '2023-01-15', status: 'healthy', survival: 94 },
  { id: 'HBF-002', species: 'Porites lobata', location: 'North Lagoon, Zone A', depth: '3m', sponsor: 'Maldives Marine Fund', date: '2023-01-15', status: 'healthy', survival: 88 },
  { id: 'HBF-003', species: 'Acropora tenuis', location: 'East Reef, Zone B', depth: '6m', sponsor: 'Fathimath Rasheed', date: '2023-02-20', status: 'stable', survival: 76 },
  { id: 'HBF-004', species: 'Pocillopora damicornis', location: 'South Channel, Zone C', depth: '5m', sponsor: 'Anonymous', date: '2023-03-05', status: 'attention', survival: 61 },
  { id: 'HBF-005', species: 'Montipora capricornis', location: 'West Lagoon, Zone D', depth: '4m', sponsor: 'Blue Ocean NGO', date: '2023-03-18', status: 'healthy', survival: 91 },
  { id: 'HBF-006', species: 'Acropora millepora', location: 'North Lagoon, Zone A', depth: '3m', sponsor: 'Ibrahim Ali', date: '2023-04-02', status: 'stable', survival: 79 },
  { id: 'HBF-007', species: 'Stylophora pistillata', location: 'East Reef, Zone B', depth: '7m', sponsor: 'Reef Tech Ltd', date: '2023-04-20', status: 'healthy', survival: 87 },
  { id: 'HBF-008', species: 'Platygyra daedalea', location: 'South Channel, Zone C', depth: '5m', sponsor: 'UNESCO MFF', date: '2023-05-11', status: 'critical', survival: 42 },
  { id: 'HBF-009', species: 'Galaxea fascicularis', location: 'West Lagoon, Zone D', depth: '4m', sponsor: 'Hassan Mohamed', date: '2023-05-30', status: 'healthy', survival: 93 },
  { id: 'HBF-010', species: 'Acropora florida', location: 'North Lagoon, Zone A', depth: '3m', sponsor: 'Coral Hope Foundation', date: '2023-06-15', status: 'stable', survival: 72 },
  { id: 'HBF-011', species: 'Heliopora coerulea', location: 'East Reef, Zone B', depth: '5m', sponsor: 'Aishath Ibrahim', date: '2023-07-01', status: 'healthy', survival: 85 },
  { id: 'HBF-012', species: 'Lobophyllia hemprichii', location: 'South Channel, Zone C', depth: '6m', sponsor: 'Anonymous', date: '2023-07-22', status: 'attention', survival: 58 },
]

const funds = [
  { label: 'Field Operations & Diving', pct: 42 },
  { label: 'Equipment & Materials', pct: 23 },
  { label: 'Science & Monitoring', pct: 18 },
  { label: 'Education Programs', pct: 12 },
  { label: 'Registry & Technology', pct: 5 },
]

const docs = [
  { icon: '📜', title: 'NGO Registration Certificate', type: 'PDF', date: '2022' },
  { icon: '💰', title: 'Financial Audit 2023', type: 'PDF', date: '2024-01' },
  { icon: '🪸', title: 'Coral Survival Report Q1 2025', type: 'PDF', date: '2025-03' },
  { icon: '🌊', title: 'Environmental Impact Assessment', type: 'PDF', date: '2023' },
]

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

  const filtered = corals.filter(c => {
    const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.species.toLowerCase().includes(search.toLowerCase()) ||
      c.sponsor.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.status === filter
    return matchSearch && matchFilter
  })

  return (
    <>
      <section className="registry-hero section">
        <div className="container">
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>🪸 Coral Registry</div>
          <h1 className="section-title">
            The Blue <span className="gradient-text">Registry</span>
          </h1>
          <p className="section-sub">Every coral frame tracked, every dive logged, every adopter acknowledged. Full transparency starts here.</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="registry-search">
            <input
              type="text"
              placeholder="🔍 Search by frame ID, species, or adopter..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select value={filter} onChange={e => setFilter(e.target.value)}>
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
                {filtered.map(c => {
                  const s = statusMap[c.status]
                  return (
                    <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(c)}>
                      <td><strong style={{ color: 'var(--blue-light)' }}>{c.id}</strong></td>
                      <td><em>{c.species}</em></td>
                      <td>{c.location}</td>
                      <td>{c.depth}</td>
                      <td>{c.sponsor}</td>
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
          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '12px' }}>
            Showing {filtered.length} of {corals.length} registered frames · Last updated: March 2025
          </div>
        </div>
      </section>

      {/* TRANSPARENCY HUB */}
      <section className="section transparency-section" id="transparency">
        <div className="container">
          <div className="badge badge-coral" style={{ marginBottom: '16px' }}>🏛️ Amaanaiy</div>
          <h2 className="section-title">Transparency <span className="gradient-text">Hub</span></h2>
          <p className="section-sub">Accountability is not optional. Every MVR donated is tracked and reported. Every frame has a story.</p>

          <div className="transparency-grid">
            <div className="card transparency-card">
              <h4>💰 Fund Allocation (2024 Actuals)</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }}>Total raised: MVR 1,248,000</p>
              <div className="fund-bars">
                {funds.map((f, i) => (
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
              <h4>📁 Official Documents</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>All certificates, audits, and reports — publicly available.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {docs.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                    <span style={{ fontSize: '1.3rem' }}>{d.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{d.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.type} · {d.date}</div>
                    </div>
                    <button className="btn btn-outline btn-sm" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>⬇ Download</button>
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
                ['💙 Adopter', selected.sponsor],
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
              <button className="btn btn-primary btn-sm" onClick={() => setSelected(null)}>View on Map</button>
              <button className="btn btn-outline btn-sm" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
