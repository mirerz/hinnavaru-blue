const pillars = [
  {
    icon: '🌊',
    title: 'Purpose',
    text: 'To restore, protect, and celebrate the coral reef ecosystem of Hinnavaru lagoon through community-guided science, accountability, and action.',
  },
  {
    icon: '🌟',
    title: 'Vision',
    text: 'A future where Hinnavaru lagoon is a thriving, biodiverse sanctuary — a model for island communities across the Indian Ocean.',
  },
  {
    icon: '🎯',
    title: 'Mission',
    text: 'Empower Hinnavaru residents as frontline conservationists through training, technology, and transparent governance of ocean resources.',
  },
  {
    icon: '💙',
    title: 'Values',
    text: 'Amaanaiy (integrity), community ownership, indigenous knowledge, scientific rigor, and radical transparency guide every decision we make.',
  },
]

const team = [
  { emoji: '👨‍💼', name: 'Ahmed Rasheed', role: 'Executive Director', bio: 'Born and raised in Hinnavaru. Former fisherman turned conservation leader with 15 years of ocean stewardship.' },
  { emoji: '🔬', name: 'Hana Ibrahim', role: 'Lead Marine Biologist', bio: 'PhD from University of Queensland. Expert in coral thermotolerance and reef ecology in tropical atoll systems.' },
  { emoji: '🤿', name: 'Naseer Ali', role: 'Head Guardian Diver', bio: 'PADI Master Diver with 2,000+ dives in Hinnavaru lagoon. Trains and leads our 38 community dive team.' },
  { emoji: '📊', name: 'Maya Moosa', role: 'Transparency Hub Lead', bio: 'Former auditor who left finance to build open accountability systems for Maldivian NGOs.' },
]

const pledges = [
  { icon: '✅', title: 'Annual Independent Audits', text: 'All financial statements are audited by an independent firm and published within 90 days of year-end.' },
  { icon: '📋', title: 'Quarterly Impact Reports', text: 'Every 3 months we publish frame-level survival data, fund allocation actuals, and community outcomes.' },
  { icon: '🔓', title: 'Open Data Registry', text: 'The Coral Registry is publicly accessible with no login required. Every frame, every dive, every result.' },
  { icon: '🤝', title: 'Community Governance', text: 'Hinnavaru island council holds 3 of 7 board seats, ensuring local voice drives every strategic decision.' },
  { icon: '🌱', title: 'Science-First Protocol', text: 'Species selection, placement, and success metrics are defined by our marine biology advisory panel.' },
  { icon: '💳', title: 'Zero Admin Overhead Pledge', text: '100% of sponsor contributions go directly to field operations. Administrative costs are separately funded.' },
]

export default function About() {
  return (
    <>
      <section className="about-hero section">
        <div className="container">
          <div className="badge badge-teal" style={{ marginBottom: '20px' }}>🌊 Our Roots</div>
          <h1>We Are <span className="gradient-text">Hinnavaru</span></h1>
          <p>The Hinnavaru Blue Initiative grew from a simple truth: the people who live beside the reef are its best protectors. We are a community of fishermen, divers, scientists, and dreamers.</p>
          <div className="about-pillars">
            {pillars.map((p, i) => (
              <div className="card pillar-card" key={i}>
                <div className="pillar-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="section-sm" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.04), rgba(13,211,197,0.03))', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="badge" style={{ marginBottom: '20px' }}>📖 Our Story</div>
            <h2 className="section-title">Born from the Lagoon</h2>
            <div className="divider" style={{ margin: '0 auto 24px' }} />
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', marginBottom: '16px' }}>
              In 2021, a group of veteran fishermen from Hinnavaru noticed alarming coral bleaching events in their ancestral fishing grounds. Rather than waiting for outside help, they partnered with a marine biologist and began the island's first coral nursery — using repurposed boat frames.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', marginBottom: '16px' }}>
              By 2022, Hinnavaru Blue was formally registered as a non-profit organization. Today, with 247 active coral frames and an 82% survival rate, we are considered one of the Maldives' most successful community-led reef restoration programs.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9' }}>
              Our model — combining indigenous knowledge, open data, and community ownership — is now being studied for replication across Lhaviyani and Noonu Atolls.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="container">
          <div className="badge badge-coral" style={{ marginBottom: '16px' }}>👥 Meet the Guardians</div>
          <h2 className="section-title">The People Behind <span className="gradient-text">the Reef</span></h2>
          <p className="section-sub">Our team is rooted in Hinnavaru — combining lived experience with scientific expertise and financial accountability.</p>
          <div className="team-grid">
            {team.map((m, i) => (
              <div className="card team-card" key={i}>
                <div className="team-avatar">{m.emoji}</div>
                <h4>{m.name}</h4>
                <div className="role">{m.role}</div>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLEDGES */}
      <section className="section-sm">
        <div className="container">
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>🤝 Our Commitments</div>
          <h2 className="section-title">Pledges We <span className="gradient-text">Keep</span></h2>
          <p className="section-sub">Accountability is not a feature — it is our foundation. These are the pledges we make to every sponsor, partner, and community member.</p>
          <div className="pledges-list">
            {pledges.map((p, i) => (
              <div className="pledge-item" key={i}>
                <div className="pledge-icon">{p.icon}</div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
