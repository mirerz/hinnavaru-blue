import { useState } from 'react'
import { CMS_CONFIG } from '../data/cms'

export default function TransparencyModal({ isOpen, onClose, documentTitle }) {
  const [step, setStep] = useState('form') // form, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: '',
  })

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await fetch(CMS_CONFIG.mailer_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Transparency Request: ${documentTitle}`,
          message: `Request for document: ${documentTitle}\n\nPurpose: ${formData.purpose}`
        })
      })
      setStep('success')
    } catch (err) {
      console.error('Mail error:', err)
      alert("Mail service is currently busy. Please contact our hotline directly.")
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="modal glass-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <div>
            <div className="badge badge-coral" style={{ marginBottom: '8px' }}>📄 Document Request</div>
            <h3>{documentTitle}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.6' }}>
              Our compliance team will review your request and send the document to your email within <strong>30 to 60 minutes</strong>. 
              For immediate support, contact our Hotline: <strong style={{ color: 'var(--teal)' }}>{CMS_CONFIG.hotline}</strong>
            </p>
            
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Full Name</label>
              <input 
                type="text" 
                required 
                className="form-input"
                placeholder="Your name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--white)' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Email Address</label>
              <input 
                type="email" 
                required 
                className="form-input"
                placeholder="your@email.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--white)' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Purpose of Request</label>
              <textarea 
                required 
                rows="3"
                className="form-input"
                placeholder="Why do you need this document?"
                value={formData.purpose}
                onChange={e => setFormData({...formData, purpose: e.target.value})}
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--white)', resize: 'none' }}
              />
            </div>

            <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit Request</button>
              <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✉️</div>
            <h3 style={{ color: 'var(--teal)', marginBottom: '12px' }}>Request Received</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Thank you for your interest. Your request for <strong>{documentTitle}</strong> has been logged. We will contact you at <strong>{formData.email}</strong> shortly.
            </p>
            <button className="btn btn-primary" style={{ marginTop: '24px', width: '100%' }} onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}
