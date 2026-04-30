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
    <div className="modal-overlay transparency-modal-overlay" onClick={onClose}>
      <div className="modal glass-card transparency-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="badge badge-coral mb-8">📄 Document Request</div>
            <h3 className="gradient-text">{documentTitle}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="transparency-form">
            <p className="form-intro">
              Our compliance team will review your request and send the document to your email within <strong>30 to 60 minutes</strong>. 
              For immediate support, contact our Hotline: <span className="teal-bold">{CMS_CONFIG.hotline}</span>
            </p>
            
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                className="form-input"
                placeholder="e.g. Abdullah Shafeeq"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                required 
                className="form-input"
                placeholder="your@email.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Purpose of Request</label>
              <textarea 
                required 
                rows="3"
                className="form-input"
                placeholder="Briefly describe why you are requesting this document..."
                value={formData.purpose}
                onChange={e => setFormData({...formData, purpose: e.target.value})}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Submit Request</button>
              <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="modal-success-state">
            <div className="success-icon">✉️</div>
            <h3 className="gradient-text">Request Logged</h3>
            <p>
              Your request for <strong>{documentTitle}</strong> has been received. Our team is processing it and will reach out to <strong>{formData.email}</strong> shortly.
            </p>
            <button className="btn btn-primary w-full" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  )
}
