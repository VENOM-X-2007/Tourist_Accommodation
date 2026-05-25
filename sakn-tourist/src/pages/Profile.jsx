import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, MapPin, Lock, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { sanitizeInput, validateEmail } from '../utils/validation';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setError('');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setError('');
  };

  const validateProfile = () => {
    const newErrors = {};

    if (!formData.full_name) {
      newErrors.full_name = t('validation.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setSuccess(t('profile.updateSuccess'));
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(t('profile.updateError'));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError(t('auth.register.passwordMismatch'));
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError(t('validation.minLength', { min: 8 }));
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (updateError) throw updateError;

      setSuccess(t('profile.passwordSuccess'));
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || t('profile.updateError'));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="section-title" style={{ marginBottom: '2rem' }}>
            {t('profile.title')}
          </h1>

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '1rem'
          }}>
            <button
              onClick={() => setActiveTab('info')}
              className="btn btn-ghost"
              style={{
                borderBottom: activeTab === 'info' ? '2px solid var(--primary-600)' : 'none',
                borderRadius: 0
              }}
            >
              {t('profile.info')}
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className="btn btn-ghost"
              style={{
                borderBottom: activeTab === 'security' ? '2px solid var(--primary-600)' : 'none',
                borderRadius: 0
              }}
            >
              {t('profile.security')}
            </button>
          </div>

          {success && (
            <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
              {success}
            </div>
          )}

          {error && (
            <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          {activeTab === 'info' && (
            <div className="card">
              <div className="card-body">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                  paddingBottom: '2rem',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'var(--primary-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={40} color="var(--primary-600)" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                      {profile?.full_name || formData.full_name || user?.email}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      {user?.email}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleProfileSubmit}>
                  <div className="form-group">
                    <label htmlFor="full_name">{t('profile.name')}</label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-tertiary)'
                      }} />
                      <input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        style={{ paddingRight: '2.5rem' }}
                        disabled={loading}
                      />
                    </div>
                    {errors.full_name && <p className="form-error">{errors.full_name}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">{t('profile.phone')}</label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={18} style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-tertiary)'
                      }} />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{ paddingRight: '2.5rem' }}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">{t('profile.address')}</label>
                    <div style={{ position: 'relative' }}>
                      <MapPin size={18} style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-tertiary)'
                      }} />
                      <input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        style={{ paddingRight: '2.5rem' }}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">{t('profile.city')}</label>
                    <input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    <Save size={18} />
                    {loading ? t('common.loading') : t('profile.save')}
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <div className="card-body">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  {t('profile.changePassword')}
                </h2>

                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label htmlFor="currentPassword">{t('profile.currentPassword')}</label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">{t('profile.newPassword')}</label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">{t('profile.confirmPassword')}</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    <Lock size={18} />
                    {loading ? t('common.loading') : t('profile.changePassword')}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
