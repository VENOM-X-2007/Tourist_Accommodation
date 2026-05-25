import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Shield, CircleCheck as CheckCircle, Headphones, DollarSign, Hop as HomeIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ properties: 0, cities: 0, users: 0, bookings: 0 });

  useEffect(() => {
    fetchProperties();
    fetchStats();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, city, price_per_night, images, bedrooms, bathrooms, max_guests, rating, property_type')
        .eq('is_available', true)
        .limit(6)
        .order('rating', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [propertiesRes, bookingsRes] = await Promise.all([
        supabase.from('properties').select('id, city'),
        supabase.from('bookings').select('id'),
      ]);

      const cities = new Set(propertiesRes.data?.map(p => p.city) || []);

      setStats({
        properties: propertiesRes.data?.length || 0,
        cities: cities.size,
        users: 0,
        bookings: bookingsRes.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const cities = [
    { name: 'الجزائر العاصمة', nameFr: 'Alger', image: 'https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&cs=tinysrgb&w=400', count: 45 },
    { name: 'وهران', nameFr: 'Oran', image: 'https://images.pexels.com/photos/313783/traditional-teahouse-teahouse-arch-architectural-313783.jpeg?auto=compress&cs=tinysrgb&w=400', count: 32 },
    { name: 'قسنطينة', nameFr: 'Constantine', image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400', count: 28 },
    { name: 'عنابة', nameFr: 'Annaba', image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=400', count: 21 },
  ];

  const features = [
    { icon: Shield, title: t('home.features.secure.title'), desc: t('home.features.secure.desc') },
    { icon: CheckCircle, title: t('home.features.verified.title'), desc: t('home.features.verified.desc') },
    { icon: Headphones, title: t('home.features.support.title'), desc: t('home.features.support.desc') },
    { icon: DollarSign, title: t('home.features.price.title'), desc: t('home.features.price.desc') },
  ];

  return (
    <div>
      <section className="hero">
        <div className="container hero-content">
          <h1>{t('home.hero.title')}</h1>
          <p>{t('home.hero.subtitle')}</p>

          <div className="search-box">
            <div className="search-field">
              <label htmlFor="search">
                <MapPin size={18} />
              </label>
              <input
                id="search"
                type="text"
                placeholder={t('home.hero.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-field">
              <label htmlFor="checkin">
                <Calendar size={18} />
              </label>
              <input
                id="checkin"
                type="date"
                placeholder={t('booking.checkIn')}
              />
            </div>
            <div className="search-field">
              <label htmlFor="checkout">
                <Calendar size={18} />
              </label>
              <input
                id="checkout"
                type="date"
                placeholder={t('booking.checkOut')}
              />
            </div>
            <button className="btn btn-primary">
              <Search size={18} />
              {t('common.search')}
            </button>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.stats.title')}</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.properties}+</div>
              <div className="stat-label">{t('home.stats.properties')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.cities}+</div>
              <div className="stat-label">{t('home.stats.cities')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.users}+</div>
              <div className="stat-label">{t('home.stats.users')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.bookings}+</div>
              <div className="stat-label">{t('home.stats.bookings')}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.cities.title')}</h2>
          </div>
          <div className="properties-grid">
            {cities.map((city, idx) => (
              <Link
                key={idx}
                to={`/properties?city=${encodeURIComponent(city.nameFr || city.name)}`}
                className="property-card"
              >
                <div className="property-image">
                  <img src={city.image} alt={city.name} />
                </div>
                <div className="property-content">
                  <h3 className="property-title">{city.name}</h3>
                  <p className="property-location">
                    {city.count} {t('home.stats.properties')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.featured.title')}</h2>
            <p className="section-subtitle">{t('home.featured.subtitle')}</p>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="no-results">
              <HomeIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>{t('common.noResults')}</p>
            </div>
          ) : (
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/properties" className="btn btn-outline btn-lg">
              {t('common.viewMore')}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.whyUs.title')}</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>
            {t('home.cta.title')}
          </h2>
          <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
            {t('home.cta.subtitle')}
          </p>
          <Link to="/register" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary-700)' }}>
            {t('home.cta.btn')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
