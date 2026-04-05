import { useState } from 'react'
import { SPONSOR_TIERS, NURSERY_SUMMARY, SPONSOR_CONTENT, CMS_CONFIG } from '../data/cms'

export default function Sponsor() {
  const [form, setForm] = useState({ name: '', email: '', org: '', tier: 'Reef Guardian', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(CMS_CONFIG.mailer_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `New ${form.tier} Adoption Request`,
          message: `Tier: ${form.tier}\nOrg: ${form.org || 'None'}\n\nMessage: ${form.message}`
        })
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Mail error:', err)
      alert("Mail service is currently busy. Please try contacting us via hotline.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="sponsor-hero section" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '200px' }}>
        {/* Background Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('${SPONSOR_CONTENT.hero.bg_image}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.55
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(to bottom, var(--ocean-deep) 0%, transparent 30%, transparent 70%, var(--ocean-deep) 100%)'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="badge badge-coral" style={{ marginBottom: '16px' }}>{SPONSOR_CONTENT.hero.badge}</div>
          <h1 className="section-title">
            Leave Your Legacy <span className="gradient-text">in the Reef</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            {SPONSOR_CONTENT.hero.desc}
          </p>
        </div>
      </section>

      {/* OVERLAY TIERS (Glassmorphism) */}
      <div className="container" style={{ position: 'relative', marginTop: '-140px', zIndex: 10, marginBottom: '80px' }}>
        <div className="sponsor-tiers" style={{ marginTop: 0 }}>
          {SPONSOR_TIERS.map((t, i) => (
            <div 
              className={`glass-card tier-card ${t.featured ? 'featured' : ''}`} 
              key={i}
              style={{
                background: t.featured ? 'linear-gradient(135deg, rgba(13,211,197,0.1), rgba(14,165,233,0.08))' : undefined,
                borderColor: t.featured ? 'var(--teal)' : undefined,
                textAlign: 'left'
              }}
            >

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

      {/* IMPACT PLEDGE */}
      <section className="section-sm">
        <div className="container">
          <div className="impact-pledge">
            <div className="badge badge-teal" style={{ marginBottom: '20px' }}>{SPONSOR_CONTENT.guarantee.badge}</div>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>{SPONSOR_CONTENT.guarantee.title}</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', textAlign: 'center', lineHeight: '1.8' }}>
              {SPONSOR_CONTENT.guarantee.text}
            </p>
            <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--teal)' }}>{NURSERY_SUMMARY.active_frames}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Active Frames</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--teal)' }}>{NURSERY_SUMMARY.survival_rate}%</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Survival Rate</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--teal)' }}>{NURSERY_SUMMARY.total_funds}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Raised to Date</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--teal)' }}>{NURSERY_SUMMARY.field_allocation}%</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Field Allocation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSOR FORM */}
      <section className="section" id="sponsor-form">
        <div className="container" style={{ maxWidth: '680px' }}>
          <div className="badge" style={{ marginBottom: '16px' }}>{SPONSOR_CONTENT.form.badge}</div>
          <h2 className="section-title">{SPONSOR_CONTENT.form.title.split('Adopter').map((part, i) => i === 0 ? part : <span key={i} className="gradient-text">Adopter</span>)}</h2>
          <p className="section-sub">{SPONSOR_CONTENT.form.desc}</p>

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
                  <select name="tier" value={form.tier} onChange={handle} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--white)' }}>
                    {SPONSOR_TIERS.map(t => <option key={t.name} style={{ background: 'var(--ocean-deep)' }}>{t.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message (optional)</label>
                <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Tell us why you're sponsoring, or any special naming requests for your frame..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                {loading ? '📨 Sending Application...' : '🪸 Submit Adoption Application'}
              </button>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '12px' }}>
                By submitting, you agree to our transparency pledge. No payment is taken through this form. <br />
                Direct support: <strong style={{ color: 'var(--teal)' }}>{CMS_CONFIG.support_email}</strong>
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
