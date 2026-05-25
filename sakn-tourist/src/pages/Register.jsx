import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserPlus, Mail, Lock, User, Phone, CircleAlert as AlertCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sanitizeInput, rateLimit, validateEmail, validatePassword, validatePhone } from '../utils/validation';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = t('validation.required');
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = t('validation.minLength', { min: 3 });
    }

    if (!formData.email) {
      newErrors.email = t('validation.required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('validation.email');
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = t('validation.phone');
    }

    if (!formData.password) {
      newErrors.password = t('validation.required');
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
      setPasswordStrength(passwordValidation);
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.required');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordMismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');

    if (name === 'password' && value) {
      const validation = validatePassword(value);
      setPasswordStrength(validation);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rateLimit('register', 3, 600000)) {
      setServerError('Too many registration attempts. Please try again later.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setServerError(t('auth.register.emailExists'));
        } else {
          setServerError(error.message);
        }
        return;
      }

      if (data.user) {
        navigate('/');
      }
    } catch (err) {
      setServerError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (!passwordStrength) return 'var(--gray-300)';
    if (passwordStrength.errors.length >= 3) return 'var(--error-500)';
    if (passwordStrength.errors.length >= 1) return 'var(--warning-500)';
    return 'var(--success-500)';
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
      <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
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
              <UserPlus size={32} color="var(--primary-600)" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{t('auth.register.title')}</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              {t('auth.register.subtitle')}
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
              <label htmlFor="fullName">{t('auth.register.name')}</label>
              <div style={{ position: 'relative' }}>
                <User
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
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t('auth.register.namePlaceholder')}
                  style={{ paddingRight: '2.5rem' }}
                  disabled={loading}
                />
              </div>
              {errors.fullName && <p className="form-error">{errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('auth.register.email')}</label>
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
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t('auth.register.phone')}</label>
              <div style={{ position: 'relative' }}>
                <Phone
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
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+213 5XX XXX XXX"
                  style={{ paddingRight: '2.5rem' }}
                  disabled={loading}
                />
              </div>
              {errors.phone && <p className="form-error">{errors.phone}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('auth.register.password')}</label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{
                    position: 'absolute',
                    right: '2.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-tertiary)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-tertiary)'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{ paddingRight: '4.5rem' }}
                  disabled={loading}
                />
              </div>
              {passwordStrength && formData.password && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{
                    height: '4px',
                    background: 'var(--gray-200)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${((5 - passwordStrength.errors.length) / 5) * 100}%`,
                      background: getPasswordStrengthColor(),
                      transition: 'width 0.3s'
                    }} />
                  </div>
                </div>
              )}
              {errors.password && <p className="form-error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">{t('auth.register.confirmPassword')}</label>
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
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{ paddingRight: '2.5rem' }}
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
            </div>

            <div className="form-group">
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}>
                <input type="checkbox" style={{ width: 'auto', marginTop: '0.25rem' }} required />
                <span>
                  {t('auth.register.agreeText')}{' '}
                  <a href="#" style={{ color: 'var(--primary-600)' }}>
                    {t('auth.register.terms')}
                  </a>{' '}
                  {t('auth.register.and')}{' '}
                  <a href="#" style={{ color: 'var(--primary-600)' }}>
                    {t('auth.register.privacy')}
                  </a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
            >
              {loading ? t('common.loading') : t('auth.register.btn')}
            </button>

            <p style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)'
            }}>
              {t('auth.register.haveAccount')}{' '}
              <Link to="/login" style={{ color: 'var(--primary-600)', fontWeight: 600 }}>
                {t('auth.login.btn')}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
