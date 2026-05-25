import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, Mail, Lock, CircleAlert as AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sanitizeInput, rateLimit, validateEmail } from '../utils/validation';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = t('validation.required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('validation.email');
    }

    if (!formData.password) {
      newErrors.password = t('validation.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rateLimit('login', 5, 300000)) {
      setServerError(t('auth.login.rateLimited'));
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          setServerError(t('auth.login.error'));
        } else {
          setServerError(error.message);
        }
        return;
      }

      navigate('/');
    } catch (err) {
      setServerError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-secondary)',
      padding: '2rem 1rem'
    }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'var(--primary-100)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}>
              <LogIn size={32} color="var(--primary-600)" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{t('auth.login.title')}</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              {t('auth.login.subtitle')}
            </p>
          </div>

          {serverError && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t('auth.login.email')}</label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={18}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-tertiary)'
                  }}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  style={{ paddingRight: '2.5rem' }}
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="form-error">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('auth.login.password')}</label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-tertiary)'
                  }}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{ paddingRight: '2.5rem' }}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <p className="form-error">{errors.password}</p>
              )}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}>
                <input type="checkbox" style={{ width: 'auto' }} />
                {t('auth.login.remember')}
              </label>
              <Link
                to="/forgot-password"
                style={{
                  color: 'var(--primary-600)',
                  fontSize: '0.875rem',
                  textDecoration: 'none'
                }}
              >
                {t('auth.login.forgot')}
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('auth.login.btn')}
            </button>

            <p style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              {t('auth.login.noAccount')}{' '}
              <Link to="/register" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>
                {t('auth.login.signUp')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
