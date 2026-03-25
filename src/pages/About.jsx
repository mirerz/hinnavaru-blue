import { Link } from 'react-router-dom'

const pillars = [
  { icon: '🌊', title: 'The Lagoon', sub: 'The Origin', text: 'Our story begins and ends with the water. This is the source of our life, our heritage, and our collective responsibility.' },
  { icon: '🏛️', title: 'Amaanaiy', sub: 'Integrity', text: 'Absolute transparency in data, community interactions, and funding execution. We are accountable to the reef.' },
  { icon: '🧬', title: 'Tharika', sub: 'Legacy', text: 'Protecting natural capital and preserving our thriving ecosystem to ensure the reefs are there for the generations of tomorrow.' },
  { icon: '🫀', title: 'Vindhu', sub: 'Vitality', text: 'Recognizing the reef as the pulse of Hinnavaru. We prioritize the health of the lagoon as our island’s absolute heartbeat.' },
  { icon: '🤝', title: 'Ekuveri', sub: 'Unity', text: 'Fostering shared ownership through inclusive education. We believe restoration succeeds only when we act as one community.' },
  { icon: '🔬', title: 'Ilmu', sub: 'Knowledge', text: 'Blending ancestral Maldivian sea-wisdom with cutting-edge marine science to drive every restoration decision we make.' },
]

export default function About() {
  return (
    <>
      {/* 1. NARRATIVE: BORN FROM THE LAGOON */}
      <section className="about-hero section" style={{ paddingBottom: '40px' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div className="badge badge-teal" style={{ marginBottom: '20px' }}>📖 The Narrative</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '24px', lineHeight: '1.2' }}>
            Born from the <span className="gradient-text">Lagoon</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.9', marginBottom: '16px' }}>
            In 2021, a group of veteran fishermen from Hinnavaru noticed alarming coral bleaching events in their ancestral fishing grounds. Rather than waiting for outside help, they partnered with a marine biologist and began the island's first coral nursery — using repurposed boat frames.
          </p>
          
          <blockquote style={{ margin: '48px 0', padding: '40px 32px', background: 'rgba(14,165,233,0.05)', borderLeft: '4px solid var(--teal)', borderRadius: '0 16px 16px 0', textAlign: 'left', boxShadow: 'inset 0 0 24px rgba(13,211,197,0.02)' }}>
            <div className="badge" style={{ marginBottom: '16px' }}>👁️ Our Vision</div>
            <p style={{ fontSize: '1.3rem', lineHeight: '1.8', fontStyle: 'italic', margin: 0, color: 'var(--white)', fontWeight: 300 }}>
              "To restore the Hinnavaru lagoon to its ancestral vibrance, ensuring a resilient coral ecosystem that sustains our island’s heritage and empowers future generations of Maldivians."
            </p>
          </blockquote>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.9' }}>
            By 2022, Hinnavaru Blue was formally registered as a non-profit organization. Today, with 247 active coral frames and an 82% survival rate, we are considered one of the Maldives' most successful community-led reef restoration programs. Our model — combining indigenous knowledge, open data, and community ownership — is now being studied for replication across Lhaviyani and Noonu Atolls.
          </p>
        </div>
      </section>

      {/* 2. WE ARE HINNAVARIANS */}
      <section className="section-sm" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.04), rgba(13,211,197,0.03))', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">We Are <span className="gradient-text">Hinnavarians</span></h2>
          <div className="divider" style={{ margin: '0 auto 24px' }} />
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.9', marginBottom: '40px' }}>
            The Hinnavaru Blue Initiative grew from a simple truth: the people who live beside the reef are its best protectors. We are a community of fishermen, divers, scientists, and dreamers, driven by a shared duty to the ocean.
          </p>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '40px 32px', position: 'relative', boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }}>
            <div className="badge badge-coral" style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', fontWeight: 600 }}>🎯 Our Mission</div>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.7', margin: 0, paddingTop: '12px', color: 'var(--white)' }}>
              "Our mission is to protect and rebuild the Lhaviyani Atoll reefs through community-led coral gardening, science-backed restoration, and transparent stewardship that turns every Hinnavarian into a Guardian of the Sea."
            </p>
          </div>
        </div>
      </section>

      {/* 3. 6-CARD SST GRID (THE 5 PILLARS) */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
            <div className="badge" style={{ marginBottom: '16px' }}>⚓ Core Anchors</div>
            <h2 className="section-title">The Six <span className="gradient-text">Pillars</span></h2>
            <p className="section-sub">
              Our values are the currents that guide us. They ensure that every coral fragment we plant is rooted in integrity, science, and community.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {pillars.map((p, i) => (
              <div 
                className="card" 
                key={i} 
                style={i === 0 ? { 
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(2,11,24,0.9))', 
                  borderColor: 'var(--blue-primary)', 
                  boxShadow: '0 0 32px rgba(14,165,233,0.15)',
                  transform: 'translateY(-4px)'
                } : {}}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{p.icon}</div>
                <h3 style={{ fontFamily: '"Georgia", serif', fontSize: '1.6rem', marginBottom: '8px', fontStyle: 'italic', letterSpacing: '0.5px' }}>{p.title}</h3>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--teal)', letterSpacing: '2px', marginBottom: '16px', fontWeight: 700 }}>{p.sub}</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY HUB */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid var(--card-border)' }} id="transparency">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '48px' }}>
            <div className="badge badge-coral" style={{ marginBottom: '16px' }}>🔍 Transparency Hub</div>
            <h2 className="section-title">Accountability <span className="gradient-text">Downloads</span></h2>
            <p className="section-sub" style={{ maxWidth: '600px' }}>
              We operate under an open-books policy. All compliance documentation, independent audits, and financial performance reports are securely hosted and freely accessible.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 400px', maxWidth: '500px' }}>
              <div style={{ fontSize: '2.5rem' }}>📜</div>
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '1.15rem' }}>NGO Registration</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Certificate No. 493-NGO/CERT/2026/10</p>
              </div>
              <a href="#" className="btn btn-outline btn-sm">Download PDF</a>
            </div>
            
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 400px', maxWidth: '500px' }}>
              <div style={{ fontSize: '2.5rem' }}>📊</div>
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '1.15rem' }}>H1 2025 Financials</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Independent Audit Report</p>
              </div>
              <a href="#" className="btn btn-outline btn-sm">Download PDF</a>
            </div>
            
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 400px', maxWidth: '500px' }}>
              <div style={{ fontSize: '2.5rem' }}>🌊</div>
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '1.15rem' }}>Q1 2026 Impact Report</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Lagoon Survival Metrics</p>
              </div>
              <Link to="/registry" className="btn btn-outline btn-sm">View Online</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
