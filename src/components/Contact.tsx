import React, { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    const email = import.meta.env.VITE_CONTACT_EMAIL || 'jaredr.branscum@email.com';
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || `https://free-email.service.co/${email}`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (res.ok) {
          setStatus('success');
          setFormData({
            name: '',
            email: '',
            subject: 'General Inquiry',
            message: ''
          });
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <section id="contact" className="container">
      <h2>Get In <span className="gradient-text">Touch</span></h2>
      <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
        Have a question or want to discuss a project? Reach out using the form below or through my direct channels.
      </p>

      <div className="contact-grid">
        {/* Info Column */}
        <div className="contact-info">
          <div>
            <h3>Let's Collaborate</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              I'm open to discussing new opportunities, consultations, and collaboration.
            </p>
          </div>

          <div className="contact-methods">
            <div className="contact-method-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <div className="contact-label">Email</div>
                <a href="mailto:jaredr.branscum@gmail.com" className="contact-value">
                  jaredr.branscum@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <div className="contact-label">Location</div>
                <div className="contact-value">Duluth, Georgia (USA)</div>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div>
                <div className="contact-label">LinkedIn</div>
                <a 
                  href="https://linkedin.com/in/jaredbranscum" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-value"
                >
                  linkedin.com/in/jaredbranscum
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <form 
          className="contact-form glass-panel" 
          onSubmit={handleSubmit}
          data-testid="contact-form"
          noValidate
        >
          {status === 'success' && (
            <div className="form-status success" data-testid="form-status-success">
              Message sent successfully! Thank you, I'll be in touch soon.
            </div>
          )}
          {status === 'error' && (
            <div className="form-status error">
              Oops! Something went wrong. Please try again.
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              data-testid="form-input-name"
            />
            {errors.name && <span className="form-error" data-testid="error-name">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              data-testid="form-input-email"
            />
            {errors.email && <span className="form-error" data-testid="error-email">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              className="form-control"
              value={formData.subject}
              onChange={handleChange}
              data-testid="form-input-subject"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Project Collaboration">Project Collaboration</option>
              <option value="Contract Work">Contract Work</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-control"
              placeholder="Tell me about your project or inquiry..."
              value={formData.message}
              onChange={handleChange}
              data-testid="form-input-message"
            />
            {errors.message && <span className="form-error" data-testid="error-message">{errors.message}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};
