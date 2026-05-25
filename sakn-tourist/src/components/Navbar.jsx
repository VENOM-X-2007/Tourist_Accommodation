import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Hop as Home, Menu, X, User, LogOut, Sun, Moon, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { changeLanguage } from '../i18n/config';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setShowLangMenu(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowUserMenu(false);
    window.location.href = '/';
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/properties', label: t('nav.properties') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <Home size={32} />
          <span>{t('app.name')}</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="nav-divider" style={{
            width: '1px',
            height: '24px',
            background: 'var(--border-color)',
            margin: '0 0.5rem'
          }} />

          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.5rem' }}
            title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="btn btn-ghost btn-sm"
              style={{ padding: '0.5rem' }}
            >
              <Globe size={20} />
            </button>

            {showLangMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.5rem',
                boxShadow: 'var(--shadow-lg)',
                minWidth: '150px',
                zIndex: 100,
                overflow: 'hidden',
              }}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'inherit',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="btn btn-ghost btn-sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--primary-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <User size={18} />
                </div>
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  boxShadow: 'var(--shadow-lg)',
                  minWidth: '180px',
                  zIndex: 100,
                  overflow: 'hidden',
                }}>
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                    }}
                  >
                    <User size={16} />
                    {t('nav.profile')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'inherit',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--error-500)',
                      fontSize: '0.875rem',
                    }}
                  >
                    <LogOut size={16} />
                    {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>

        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
        }}>
          <button
            onClick={toggleTheme}
            className="btn btn-ghost"
            style={{ flex: 1 }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span style={{ marginRight: '0.5rem' }}>
              {theme === 'dark' ? t('theme.light') : t('theme.dark')}
            </span>
          </button>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '0.5rem',
        }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="btn btn-ghost"
              style={{ flex: 1 }}
            >
              {lang.flag}
            </button>
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
        }}>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="btn btn-outline btn-block"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.profile')}
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-primary btn-block"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-block"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.login')}
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-block"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
