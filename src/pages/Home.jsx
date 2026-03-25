import { Link } from 'react-router-dom'

const features = [
  { icon: '🪸', label: 'Active Coral Frames', sub: '247 frames deployed' },
  { icon: '👥', label: 'Community Guardians', sub: '38 certified divers' },
  { icon: '🌊', label: 'Lagoon Area Covered', sub: '4.2 km² monitored' },
  { icon: '💚', label: 'Survival Rate', sub: '82% of transplants' },
]

const impacts = [
  {
    icon: '🌿',
    title: 'Coral Nursery Program',
    text: 'Our underwater nurseries propagate resilient coral fragments from local donor colonies, growing them until ready for transplantation.',
  },
  {
    icon: '🤿',
    title: 'Guardian Diver Network',
    text: 'Trained community divers from Hinnavaru perform bi-weekly monitoring and maintenance dives, logging every frame in the registry.',
  },
  {
    icon: '📊',
    title: 'Open Transparency',
    text: 'All financial flows, impact data, and survival metrics are publicly accessible through our Transparency Hub (Amaanaiy).',
  },
  {
    icon: '🛡️',
    title: 'Reef Resilience Science',
    text: 'We partner with marine biologists to select heat-tolerant coral species and develop climate adaptation protocols.',
  },
  {
    icon: '🏘️',
    title: 'Youth Education',
    text: 'Monthly marine ecology sessions for school children, building the next generation of ocean stewards in Hinnavaru.',
  },
  {
    icon: '🌐',
    title: 'Digital Registry',
    text: 'Every coral frame has a unique ID. Adopters can track their adopted frames in real-time on the Live Lagoon map.',
  },
]

const news = [
  {
    emoji: '🌊',
    badge: 'Milestone',
    date: 'March 2025',
    title: '200th Coral Frame Successfully Transplanted',
    text: 'Our Guardian Divers celebrated a historic milestone — the 200th active coral frame is now thriving in Hinnavaru lagoon.',
  },
  {
    emoji: '🤝',
    badge: 'Partnership',
    date: 'February 2025',
    title: 'MOE Partnership Brings Marine Science to Classrooms',
    text: "A new MOU with the Ministry of Education integrates Hinnavaru Blue's coral program into the national school curriculum.",
  },
  {
    emoji: '📡',
    badge: 'Technology',
    date: 'January 2025',
    title: 'Live Lagoon Map Goes Public',
    text: 'Our new interactive map lets anyone in the world explore the coral frames and their health status in real time.',
  },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-img" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-line" />
              <span>Lhaviyani Atoll · Maldives</span>
            </div>
            <h1>
              Restoring our reef. <br />
              <span className="gradient-text">Empowering our future.</span>
            </h1>
            <p className="hero-sub">
              Transforming the Hinnavaru lagoon through science-backed coral gardening and community-led conservation. Be part of the rebirth.
            </p>
            <div className="hero-actions">
              <Link to="/live-lagoon" className="btn btn-outline">🗺️ Explore Live Map</Link>
              <Link to="/sponsor" className="btn btn-primary">🪸 Adopt a Frame</Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">247</div>
                <div className="hero-stat-label">Active Coral Frames</div>
              </div>
              <div>
                <div className="hero-stat-num">82%</div>
                <div className="hero-stat-label">Survival Rate</div>
              </div>
              <div>
                <div className="hero-stat-num">38</div>
                <div className="hero-stat-label">Guardian Divers</div>
              </div>
              <div>
                <div className="hero-stat-num">MVR 1.2M</div>
                <div className="hero-stat-label">Funds Raised</div>
              </div>
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

      {/* FEATURE STRIP */}
      <div className="feat-strip">
        <div className="container">
          <div className="feat-strip-grid">
            {features.map((f, i) => (
              <div className="feat-item" key={i}>
                <div className="feat-icon">{f.icon}</div>
                <div>
                  <div className="feat-item-label">{f.label}</div>
                  <div className="feat-item-sub">{f.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMPACT */}
      <section className="section">
        <div className="container">
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>🌿 What We Do</div>
          <h2 className="section-title">
            Protecting the Reef, <span className="gradient-text">Empowering the Community</span>
          </h2>
          <p className="section-sub">From underwater nurseries to open data, every aspect of Hinnavaru Blue is designed for maximum impact and accountability.</p>
          <div className="impact-grid">
            {impacts.map((item, i) => (
              <div className="card impact-card" key={i}>
                <div className="impact-card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION STRIP */}
      <section className="section-sm">
        <div className="container">
          <div className="mission-strip">
            <blockquote className="mission-quote">
              "The sea is not separate from us — it is us. Hinnavaru has lived by the lagoon for generations, and it is our duty to ensure it thrives for generations to come."
              <footer style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--teal)', fontFamily: 'var(--font)' }}>
                — Ahmed Rasheed, Executive Director
              </footer>
            </blockquote>
            <div className="mission-body">
              <div className="badge" style={{ marginBottom: '16px' }}>🎯 Our Mission</div>
              <p>We believe that lasting ocean conservation is only possible when local communities are at the heart of it — as scientists, guardians, and storytellers.</p>
              <p>Hinnavaru Blue combines indigenous knowledge with marine science, digital transparency, and international partnerships to build a model for reef restoration that belongs to the people of Hinnavaru.</p>
              <Link to="/about" className="btn btn-outline btn-sm" style={{ marginTop: '8px' }}>Learn Our Story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="section">
        <div className="container">
          <div className="badge" style={{ marginBottom: '16px' }}>📰 Latest News</div>
          <h2 className="section-title">From the <span className="gradient-text">Lagoon</span></h2>
          <p className="section-sub">Updates from our Guardian Divers, partners, and the coral frames thriving below the surface.</p>
          <div className="news-grid">
            {news.map((item, i) => (
              <div className="card news-card" key={i}>
                <div className="news-card-img">{item.emoji}</div>
                <div className="news-meta">
                  <span className="badge badge-teal" style={{ fontSize: '0.7rem', padding: '3px 10px' }}>{item.badge}</span>
                  <span className="news-date">{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section-sm">
        <div className="container">
          <div className="impact-pledge">
            <div className="badge badge-coral" style={{ marginBottom: '20px' }}>🪸 Make an Impact</div>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>
              Adopt a Coral Frame
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 32px', textAlign: 'center' }}>
              For as little as MVR 500/month, you can sponsor a coral frame and watch it grow on our Live Lagoon map. Your name, forever etched in the reef.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/sponsor" className="btn btn-primary">Adopt a Frame</Link>
              <Link to="/live-lagoon" className="btn btn-outline">Explore the Lagoon</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
