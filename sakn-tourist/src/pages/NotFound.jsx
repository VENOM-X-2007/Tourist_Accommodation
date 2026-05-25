import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Hop as Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{
            fontSize: '8rem',
            fontWeight: 700,
            color: 'var(--primary-600)',
            lineHeight: 1,
            marginBottom: '1rem'
          }}>
            404
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>
            {t('errors.404')}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {t('errors.404Text')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary btn-lg">
              <Home size={18} />
              {t('nav.home')}
            </Link>
            <button onClick={() => window.history.back()} className="btn btn-outline btn-lg">
              <ArrowLeft size={18} />
              {t('common.back')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
