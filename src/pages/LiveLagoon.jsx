import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CORAL_REGISTRY, LIVE_LAGOON_CONTENT } from '../data/cms'
import L from 'leaflet'

// Hinnavaru lagoon center coordinates
const LAGOON_CENTER = [5.490, 73.406]

const statusColors = {
  healthy: '#10b981',
  stable: '#0ea5e9',
  attention: '#f59e0b',
  critical: '#ff6b6b',
}

const statusLabels = {
  healthy: '🟢 Healthy',
  stable: '🔵 Stable',
  attention: '🟡 Needs Attention',
  critical: '🔴 Critical',
}

function makeIcon(color) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:18px;height:18px;border-radius:50%;
      background:${color};
      border:2.5px solid rgba(255,255,255,0.9);
      box-shadow:0 0 10px ${color}88, 0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}

export default function LiveLagoon() {
  const mapRef = useRef(null)
  const leafletRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const stats = {
    total: CORAL_REGISTRY.length,
    healthy: CORAL_REGISTRY.filter(f => f.status === 'healthy').length,
    stable: CORAL_REGISTRY.filter(f => f.status === 'stable').length,
    attention: CORAL_REGISTRY.filter(f => f.status === 'attention' || f.status === 'critical').length,
    avgSurvival: Math.round(CORAL_REGISTRY.reduce((s, f) => s + f.survival, 0) / CORAL_REGISTRY.length),
  }

  useEffect(() => {
    if (leafletRef.current) return

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })

    const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      className: 'map-tiles'
    })

    const map = L.map(mapRef.current, {
      center: LAGOON_CENTER,
      zoom: 14,
      zoomControl: true,
      attributionControl: true,
      layers: [satellite] // Default to satellite for premium look
    })

    const baseMaps = {
      "Satellite": satellite,
      "Street": street
    }

    L.control.layers(baseMaps).addTo(map)

    // Add a blue overlay polygon for the lagoon area
    const lagoonBounds = [
      [5.4885, 73.4045], [5.4885, 73.4075],
      [5.4915, 73.4075], [5.4915, 73.4045],
    ]
    L.polygon(lagoonBounds, {
      color: '#0ea5e9',
      weight: 1.5,
      opacity: 0.5,
      fillColor: '#0ea5e9',
      fillOpacity: 0.06,
    }).addTo(map)

    CORAL_REGISTRY.forEach(f => {
      const color = statusColors[f.status]
      const marker = L.marker([f.lat, f.lng], { icon: makeIcon(color) })
      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;min-width:200px;padding:4px">
          <div style="font-weight:700;color:#0ea5e9;margin-bottom:4px">${f.id}</div>
          <div style="font-style:italic;color:#94a3b8;font-size:0.82rem;margin-bottom:8px">${f.species}</div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:3px">
            <span>Status</span><strong>${statusLabels[f.status]}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:3px">
            <span>Survival</span><strong style="color:#0dd3c5">${f.survival}%</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:3px">
            <span>Depth</span><strong>${f.depth}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:0.82rem">
            <span>Adopter</span><strong>${f.adopter}</strong>
          </div>
        </div>
      `, { className: 'lagoon-popup' })
      marker.on('click', () => setSelected(f))
      marker.addTo(map)
    })

    leafletRef.current = map
    return () => { map.remove(); leafletRef.current = null }
  }, [])

  const filtered = filterStatus === 'all' ? CORAL_REGISTRY : CORAL_REGISTRY.filter(f => f.status === filterStatus)

  return (
    <>
      <section className="lagoon-hero section" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '200px' }}>
        {/* Background Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('${LIVE_LAGOON_CONTENT.hero.bg_image}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.3
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(to bottom, var(--ocean-deep) 0%, transparent 30%, transparent 70%, var(--ocean-deep) 100%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>{LIVE_LAGOON_CONTENT.hero.badge}</div>
          <h1 className="section-title">Live <span className="gradient-text">Lagoon Map</span></h1>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            {LIVE_LAGOON_CONTENT.hero.desc}
          </p>
        </div>
      </section>

      {/* OVERLAY MAP (Glassmorphism) */}
      <section className="section-sm" style={{ paddingTop: 0, marginTop: '-140px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '24px' }}>

            <div className="lagoon-map-wrapper" style={{ margin: 0, border: 'none', background: 'transparent' }}>
              <div ref={mapRef} style={{ height: '100%', width: '100%', borderRadius: '12px', overflow: 'hidden' }} />
            </div>

            <div className="lagoon-legend" style={{ justifyContent: 'center', marginTop: '24px' }}>
              {Object.entries(statusColors).map(([key, color]) => (
                <div className="lagoon-legend-item" key={key}>
                  <div className="legend-dot" style={{ background: color, boxShadow: `0 0 6px ${color}88` }} />
                  <span>{statusLabels[key]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="section-sm">
        <div className="container">
          <div className="nursery-stats">
            <div className="nursery-stat">
              <div className="nursery-stat-num gradient-text">{stats.total}</div>
              <div className="nursery-stat-label">Total Frames</div>
            </div>
            <div className="nursery-stat">
              <div className="nursery-stat-num" style={{ color: '#10b981' }}>{stats.healthy}</div>
              <div className="nursery-stat-label">Healthy Frames</div>
            </div>
            <div className="nursery-stat">
              <div className="nursery-stat-num" style={{ color: 'var(--blue-light)' }}>{stats.stable}</div>
              <div className="nursery-stat-label">Stable Frames</div>
            </div>
            <div className="nursery-stat">
              <div className="nursery-stat-num gradient-text">{stats.avgSurvival}%</div>
              <div className="nursery-stat-label">Avg Survival Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* FRAME CARDS */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <div className="badge" style={{ marginBottom: '8px' }}>🪸 All Frames</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Nursery <span className="gradient-text">Directory</span></h2>
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', padding: '10px 16px', borderRadius: '8px', fontFamily: 'var(--font)', fontSize: '0.9rem', cursor: 'pointer', outline: 'none' }}
            >
              <option value="all">All Statuses ({CORAL_REGISTRY.length})</option>
              <option value="healthy">🟢 Healthy ({stats.healthy})</option>
              <option value="stable">🔵 Stable ({stats.stable})</option>
              <option value="attention">🟡 Needs Attention</option>
              <option value="critical">🔴 Critical</option>
            </select>
          </div>

          <div className="frames-grid">
            {filtered.map(f => {
              const color = statusColors[f.status]
              return (
                <div className="card frame-card" key={f.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(f)}>
                  <div className="frame-card-top">
                    <div>
                      <div className="frame-id">{f.id}</div>
                      <div className="frame-species">{f.species}</div>
                    </div>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}88`, marginTop: 4 }} />
                  </div>
                  <div className="frame-bar">
                    <div className="frame-bar-label">
                      <span>Survival</span>
                      <span style={{ color: 'var(--teal)' }}>{f.survival}%</span>
                    </div>
                    <div className="progress-bar" style={{ height: '5px' }}>
                      <div className="progress-fill" style={{ width: `${f.survival}%` }} />
                    </div>
                  </div>
                  <div className="frame-meta">
                    <span>🌊 {f.depth}</span>
                    <span>💙 Adopter: {f.adopter}</span>
                  </div>
                </div>
              )
            })}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              {[
                ['🟢 Status', statusLabels[selected.status]],
                ['🌊 Depth', selected.depth],
                ['💙 Adopter', selected.adopter],
                ['📅 Last Check', 'March 2025'],
              ].map(([label, val]) => (
                <div key={label} style={{ background: 'var(--card-bg)', borderRadius: '8px', padding: '12px', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                <span>Survival Rate</span>
                <span style={{ color: 'var(--teal)' }}>{selected.survival}%</span>
              </div>
              <div className="progress-bar" style={{ height: '10px' }}>
                <div className="progress-fill" style={{ width: `${selected.survival}%` }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/registry" className="btn btn-primary btn-sm">View in Registry</Link>
              <button className="btn btn-outline btn-sm" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Leaflet popup custom styling */}
      <style>{`
        .lagoon-popup .leaflet-popup-content-wrapper {
          background: rgba(4, 20, 40, 0.85);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(14, 165, 233, 0.2);
          border-radius: 12px;
          color: #e2e8f0;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .lagoon-popup .leaflet-popup-tip-container { display: none; }
        .leaflet-popup-close-button { color: #94a3b8 !important; }
        .leaflet-control-zoom a {
          background: #041428 !important;
          color: #e2e8f0 !important;
          border-color: rgba(14,165,233,0.3) !important;
        }
        .leaflet-container {
          background: transparent !important;
        }
        .map-tiles {
          opacity: 0.65 !important;
        }
      `}</style>
    </>
  )
}
