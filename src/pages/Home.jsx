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
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="hero-eyebrow">
              <span>Lhaviyani Atoll · Maldives</span>
            </div>
            <h1 style={{ textAlign: 'center' }}>
              Restoring our reef. <br />
              <span className="gradient-text">Empowering our future.</span>
            </h1>
            <p className="hero-sub" style={{ textAlign: 'center' }}>
              Transforming the Hinnavaru lagoon through science-backed coral gardening and community-led conservation. Be part of the rebirth.
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

      {/* ADOPT OVERLAY (Glassmorphism) */}
      <div className="container" style={{ position: 'relative', marginTop: '-120px', zIndex: 10, display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.05)', 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '16px', 
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '700px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.8rem', fontWeight: 700 }}>Restore Hinnavaru's Legacy</h3>
          <p style={{ margin: '0 0 24px 0', color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Adopt a coral frame. We will physically tag it with your chosen name, plant it in the Hinnavaru lagoon, and track its real-time growth via our public Live Map.
          </p>
          <Link to="/sponsor" className="btn btn-coral" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>🪸 Adopt a Coral Frame</Link>
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

      {/* MULTIMEDIA HUB */}
      <section className="section">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="badge" style={{ marginBottom: '16px' }}>📡 Updates</div>
          <h2 className="section-title">Latest</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '32px' }}>
            {/* Block 1: Video */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>The Pulse</h3>
                <p style={{ color: 'var(--teal)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>Latest Lagoon Update</p>
              </div>
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
                <img src="https://images.unsplash.com/photo-1546500840-ae38253aca92?q=80&w=800&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} alt="Underwater Coral Update" />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--blue-primary)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px rgba(14,165,233,0.5)' }}>
                  <span style={{ fontSize: '24px', marginLeft: '4px' }}>▶</span>
                </div>
              </div>
            </div>

            {/* Block 2: Photo */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>The Focus</h3>
                <p style={{ color: 'var(--teal)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>Shot of the Week</p>
              </div>
              <div style={{ position: 'relative', flexGrow: 1, minHeight: '200px' }}>
                <img src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=800&auto=format&fit=crop" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="Shot of the week" />
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' }}>
                  🔍 View Full
                </div>
              </div>
            </div>

            {/* Block 3: Notice Board */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>The Updates</h3>
                <p style={{ color: 'var(--teal)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>Community Bulletins</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span>🪸</span>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)' }}>Notice:</strong>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>Next Community Diving Session: April 12th. Registration required.</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span>📢</span>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)' }}>Milestone:</strong>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>250th Coral Frame planted in the North Lagoon zone!</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span>🌊</span>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--white)' }}>Data:</strong>
                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>March survival rates show 82% healthy coverage in tracked frames.</span>
                  </div>
                </div>
              </div>
            </div>
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
