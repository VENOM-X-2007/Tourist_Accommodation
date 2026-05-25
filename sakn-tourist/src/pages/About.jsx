import { useTranslation } from 'react-i18next';
import { Shield, CircleCheck as CheckCircle, Headphones, Star } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Shield, title: t('about.values.security'), desc: t('about.values.securityDesc') },
    { icon: CheckCircle, title: t('about.values.trust'), desc: t('about.values.trustDesc') },
    { icon: Headphones, title: t('about.values.support'), desc: t('about.values.supportDesc') },
    { icon: Star, title: t('about.values.quality'), desc: t('about.values.qualityDesc') },
  ];

  const stats = [
    { number: '500+', label: t('about.stats.properties') },
    { number: '10,000+', label: t('about.stats.bookings') },
    { number: '58', label: t('about.stats.cities') },
    { number: '4.8/5', label: t('about.stats.rating') },
  ];

  return (
    <div>
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 className="section-title">{t('about.title')}</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              {t('about.description')}
            </p>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem' }}>
              {t('about.story')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
              {t('about.storyText1')}
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {t('about.storyText2')}
            </p>
          </div>

          <div className="section-header">
            <h2 className="section-title">{t('about.mission')}</h2>
          </div>
          <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
            <div className="card-body">
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, textAlign: 'center' }}>
                {t('about.missionText')}
              </p>
            </div>
          </div>

          <div className="section-header">
            <h2 className="section-title">{t('about.vision')}</h2>
          </div>
          <div className="card" style={{ marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
            <div className="card-body">
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, textAlign: 'center' }}>
                {t('about.visionText')}
              </p>
            </div>
          </div>

          <div className="section-header" style={{ marginTop: '3rem' }}>
            <h2 className="section-title">{t('about.values')}</h2>
          </div>
          <div className="features-grid">
            {values.map((value, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">
                  <value.icon size={24} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>

          <div className="section-header" style={{ marginTop: '3rem' }}>
            <h2 className="section-title">{t('about.stats.title')}</h2>
          </div>
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
