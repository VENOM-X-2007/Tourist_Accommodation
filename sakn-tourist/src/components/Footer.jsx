import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Hop as Home, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <Link to="/" className="logo" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <Home size={28} />
              <span>{t('app.name')}</span>
            </Link>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              marginTop: '0.5rem'
            }}>
              {t('footer.about')}
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <ExternalLink size={18} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <ExternalLink size={18} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              <li><Link to="/properties">{t('nav.properties')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('nav.legal')}</h4>
            <ul>
              <li><a href="#">{t('footer.privacy')}</a></li>
              <li><a href="#">{t('footer.terms')}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} />
                <a href="mailto:info@sakn-algeria.dz">info@sakn-algeria.dz</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} />
                <a href="tel:+213555000000">+213 555 00 00 00</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} />
                <span>Algiers, Algeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {new Date().getFullYear()} {t('app.name')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
