import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, Clock, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sanitizeInput, validateEmail, rateLimit } from '../utils/validation';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = t('validation.required');
    }

    if (!formData.email) {
      newErrors.email = t('validation.required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('validation.email');
    }

    if (!formData.message) {
      newErrors.message = t('validation.required');
    } else if (formData.message.length < 10) {
      newErrors.message = t('validation.minLength', { min: 10 });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rateLimit('contact', 3, 600000)) {
      setError(t('contact.rateLimited'));
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email.toLowerCase().trim(),
          phone: formData.phone,
          message: formData.message,
        }]);

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(t('contact.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 className="section-title">{t('contact.title')}</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              {t('contact.subtitle')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                {t('contact.info')}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--primary-100)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={24} color="var(--primary-600)" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('contact.email')}</h3>
                    <a href="mailto:info@sakn-algeria.dz" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                      info@sakn-algeria.dz
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--primary-100)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={24} color="var(--primary-600)" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('contact.phone')}</h3>
                    <a href="tel:+213555000000" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                      +213 555 00 00 00
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--primary-100)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={24} color="var(--primary-600)" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('contact.address')}</h3>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {t('contact.addressText')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--primary-100)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Clock size={24} color="var(--primary-600)" />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('contact.hours')}</h3>
                    <span style={{ color: 'var(--text-secondary)', display: 'block' }}>
                      {t('contact.hoursWeekday')}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {t('contact.hoursWeekend')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="card">
                <div className="card-body">
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                    {t('contact.sendMessage')}
                  </h2>

                  {success && (
                    <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
                      <CheckCircle size={18} />
                      <span>{t('contact.success')}</span>
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
                      <AlertCircle size={18} />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">{t('contact.name')}</label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">{t('contact.email')}</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">{t('contact.email')}</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">{t('contact.message')}</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={loading}
                        style={{ resize: 'vertical' }}
                      />
                      {errors.message && <p className="form-error">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-lg"
                      disabled={loading}
                    >
                      <Send size={18} />
                      {loading ? t('common.loading') : t('contact.send')}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
