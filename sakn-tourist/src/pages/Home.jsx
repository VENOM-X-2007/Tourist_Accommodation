import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { properties, cities } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>اكتشف أفضل الإقامات السياحية في الجزائر</h1>
          <p>شقق، منازل، وفيلات مفروشة للإيجار اليومي والأسبوعي والشهري</p>
          
          <div className="search-box">
            <div className="search-field">
              <MapPin size={20} />
              <input
                type="text"
                placeholder="إلى أين تريد الذهاب؟"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-field">
              <Calendar size={20} />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="تاريخ الوصول"
              />
            </div>
            <div className="search-field">
              <Calendar size={20} />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="تاريخ المغادرة"
              />
            </div>
            <div className="search-field">
              <Users size={20} />
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} ضيوف</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary search-btn">
              <Search size={20} />
              بحث
            </button>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="cities-section">
        <div className="container">
          <h2 className="section-title">أشهر المدن السياحية</h2>
          <div className="cities-grid">
            {cities.map((city, index) => (
              <Link key={index} to={`/properties?city=${city.name}`} className="city-card">
                <div className="city-image">
                  <img src={`https://source.unsplash.com/400x300/?${city.name},algeria`} alt={city.name} />
                </div>
                <div className="city-info">
                  <h3>{city.name}</h3>
                  <p>{city.count} عقار متاح</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">عقارات مميزة</h2>
          <div className="properties-grid">
            {filteredProperties.slice(0, 6).map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="view-all">
            <Link to="/properties" className="btn btn-outline">عرض جميع العقارات</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">لماذا تختار سكن سياحي؟</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>دفع آمن</h3>
              <p>نظام دفع إلكتروني آمن ومحمي لجميع المعاملات</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>عقارات مؤكدة</h3>
              <p>جميع العقارات تم التحقق منها شخصياً</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>دعم 24/7</h3>
              <p>فريق دعم متواجد على مدار الساعة لمساعدتك</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>أفضل الأسعار</h3>
              <p>أسعار تنافسية بدون عمولات خفية</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>هل تملك عقاراً وتريد تأجيره؟</h2>
          <p>انضم إلى مئات الملاك الذين يثقون بمنصتنا</p>
          <Link to="/register" className="btn btn-primary">سجل عقارك الآن</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
