import { useState } from 'react'

const tiers = [
  {
    icon: '🌱',
    name: 'Seedling',
    price: 'MVR 500',
    period: '/month',
    perks: [
      'Adopt 1 coral fragment',
      'Name tag on coral frame',
      'Quarterly photo update',
      'Digital certificate',
      'Registry listing',
    ],
  },
  {
    icon: '🪸',
    name: 'Reef Guardian',
    price: 'MVR 2,000',
    period: '/month',
    featured: true,
    perks: [
      'Adopt a full coral frame (12 fragments)',
      'GPS coordinates of your frame',
      'Monthly dive report + photos',
      'Live Lagoon map tracking',
      'Annual recognition plaque',
      'Invitation to annual Guardian Dive Day',
    ],
  },
  {
    icon: '🌊',
    name: 'Ocean Patron',
    price: 'MVR 8,000',
    period: '/month',
    perks: [
      'Adopt a full nursery zone (6 frames)',
      'Zone named after you / your org',
      'Weekly monitoring data feeds',
      'Featured in Impact Report',
      'Corporate CSR documentation',
      'VIP visit to nursery site',
      'Board advisory invitation',
    ],
  },
]

export default function Sponsor() {
  const [form, setForm] = useState({ name: '', email: '', org: '', tier: 'Reef Guardian', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="sponsor-hero section">
        <div className="container">
          <div className="badge badge-coral" style={{ marginBottom: '16px' }}>🪸 Adopt a Frame</div>
          <h1 className="section-title">
            Leave Your Legacy <span className="gradient-text">in the Reef</span>
          </h1>
          <p className="section-sub">Every coral frame you adopt is named after you, tracked in the registry, and visible on the Live Lagoon map. Your commitment grows with the coral.</p>

          <div className="sponsor-tiers">
            {tiers.map((t, i) => (
              <div className={`card tier-card ${t.featured ? 'featured' : ''}`} key={i}>
                <div className="tier-icon">{t.icon}</div>
                <div className="tier-name">{t.name}</div>
                <div className="tier-price">{t.price}<span>{t.period}</span></div>
                <ul className="tier-perks">
                  {t.perks.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
                <button
                  className={`btn ${t.featured ? 'btn-primary' : 'btn-outline'} w-full`}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setForm(f => ({ ...f, tier: t.name }))
                    document.getElementById('sponsor-form').scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Choose {t.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT PLEDGE */}
      <section className="section-sm">
        <div className="container">
          <div className="impact-pledge">
            <div className="badge badge-teal" style={{ marginBottom: '20px' }}>💯 Our Guarantee</div>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>100% Goes to the Reef</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', textAlign: 'center', lineHeight: '1.8' }}>
              Administrative and operational costs of Hinnavaru Blue are funded separately through government and institutional grants. Every MVR you contribute goes directly to purchasing coral fragmentation materials, Guardian Diver stipends, equipment maintenance, and scientific monitoring.
            </p>
            <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
              {[['247', 'Active Frames'], ['82%', 'Survival Rate'], ['MVR 1.2M', 'Raised to Date'], ['100%', 'Field Allocation']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--teal)' }}>{num}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPONSOR FORM */}
      <section className="section" id="sponsor-form">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div className="badge" style={{ marginBottom: '16px' }}>📋 Apply</div>
          <h2 className="section-title">Become an <span className="gradient-text">Adopter</span></h2>
          <p className="section-sub">Fill in your details and our team will reach out within 48 hours to confirm your coral frame assignment.</p>

          {submitted ? (
            <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🪸</div>
              <h3 style={{ marginBottom: '12px' }}>Thank you, {form.name}!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                We've received your adoption application for the <strong style={{ color: 'var(--teal)' }}>{form.tier}</strong> tier.
                Our team will contact you at <strong>{form.email}</strong> within 48 hours.
              </p>
            </div>
          ) : (
            <form className="card sponsor-form" onSubmit={submit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@example.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Organization (optional)</label>
                  <input name="org" value={form.org} onChange={handle} placeholder="Company or NGO name" />
                </div>
                <div className="form-group">
                  <label>Adoption Tier *</label>
                  <select name="tier" value={form.tier} onChange={handle}>
                    <option>Seedling</option>
                    <option>Reef Guardian</option>
                    <option>Ocean Patron</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message (optional)</label>
                <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Tell us why you're sponsoring, or any special naming requests for your frame..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                🪸 Submit Adoption Application
              </button>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '12px' }}>
                By submitting, you agree to our transparency pledge. No payment is taken through this form.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
