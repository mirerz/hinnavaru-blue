import { useState } from 'react'

const projects = [
  {
    emoji: '🪸',
    status: 'active',
    badge: 'Active',
    badgeClass: 'badge-teal',
    title: 'Hinnavaru Lagoon Nursery',
    desc: 'Our flagship coral nursery program, deploying over 247 frames across 4.2 km² of the lagoon with bi-weekly monitoring.',
    progress: 82,
    progressLabel: '82% of 2025 survival target met',
    funded: 'MVR 480,000',
    target: 'MVR 600,000',
  },
  {
    emoji: '🌊',
    status: 'active',
    badge: 'Active',
    badgeClass: 'badge-teal',
    title: 'Thermotolerant Species Study',
    desc: 'Partnering with IUCN to test 6 coral species for climate resilience in Lhaviyani Atoll conditions. Results inform future planting.',
    progress: 65,
    progressLabel: '65% of research phase complete',
    funded: 'MVR 180,000',
    target: 'MVR 280,000',
  },
  {
    emoji: '🏫',
    status: 'active',
    badge: 'Active',
    badgeClass: 'badge-teal',
    title: 'Ocean Guardians School Program',
    desc: 'Monthly marine ecology sessions for 320 students at Hinnavaru School, including supervised snorkel tours of the nursery.',
    progress: 90,
    progressLabel: '90% of 2024-25 curriculum delivered',
    funded: 'MVR 95,000',
    target: 'MVR 95,000',
  },
  {
    emoji: '📡',
    status: 'planned',
    badge: 'Planned',
    badgeClass: 'badge-coral',
    title: 'Deep Lagoon Monitoring Array',
    desc: 'Installing 12 IoT sensor buoys to provide real-time temperature, pH, and turbidity data directly into the Live Lagoon dashboard.',
    progress: 20,
    progressLabel: '20% of funding secured',
    funded: 'MVR 60,000',
    target: 'MVR 300,000',
  },
]

const archive = [
  { year: '2023', title: 'Phase 1 Nursery Frames', desc: '50 initial frames deployed. 88% survival at 12 months.' },
  { year: '2023', title: 'Guardian Diver Training', desc: '18 community divers certified. First local-led monitoring dives.' },
  { year: '2022', title: 'Lagoon Baseline Survey', desc: 'Full coral coverage mapping of 4.2 km² of Hinnavaru lagoon.' },
  { year: '2022', title: 'NGO Registration', desc: 'Hinnavaru Blue registered under MLD-2024-0371.' },
  { year: '2021', title: 'First Coral Nursery', desc: '10 experimental frames. Proof-of-concept for community model.' },
  { year: '2021', title: 'Founding of Initiative', desc: 'Hinnavaru fishermen meet with marine biologist to form the initiative.' },
]

export default function Projects() {
  const [notified, setNotified] = useState({})
  const [joined, setJoined] = useState({})

  return (
    <>
      <section className="projects-hero section">
        <div className="container">
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>🌊 Our Work</div>
          <h1 className="section-title">
            Projects & <span className="gradient-text">Programs</span>
          </h1>
          <p className="section-sub">From underwater nurseries to classroom education — every project is designed to build lasting ocean resilience for Hinnavaru.</p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div className="card project-card" key={i}>
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
                        onClick={() => setJoined(prev => ({ ...prev, [i]: true }))}
                      >
                        {joined[i] ? '✅ Joined!' : '🤿 Join Next Clean'}
                      </button>
                      <a href="#" className="btn btn-outline btn-sm">📋 View Report</a>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setNotified(prev => ({ ...prev, [i]: true }))}
                      >
                        {notified[i] ? '🔔 Notified!' : '🔔 Notify Me'}
                      </button>
                      <a href="/hinnavaru-blue/sponsor" className="btn btn-coral btn-sm">💙 Help Fund</a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="section">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>📁 Archive</div>
          <h2 className="section-title">Project <span className="gradient-text">History</span></h2>
          <p className="section-sub">Every milestone, every frame, every dive — documented for posterity and accountability.</p>
          <div className="archive-grid">
            {archive.map((a, i) => (
              <div className="archive-item" key={i}>
                <div className="archive-year">{a.year}</div>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
