import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Star, Users, Bed, Bath, Hop as HomeIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const PropertyDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingDates, setBookingDates] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setProperty(data);
      setSelectedImage(0);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="section">
        <div className="container">
          <div className="no-results">
            <HomeIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h2>{t('errors.404')}</h2>
            <p>{t('errors.404Text')}</p>
          </div>
        </div>
      </div>
    );
  }

  const images = property.images?.length > 0
    ? property.images
    : ['https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'];

  const amenities = [
    { icon: '📶', label: t('property.amenities.wifi') },
    { icon: '❄️', label: t('property.amenities.ac') },
    { icon: '🍳', label: t('property.amenities.kitchen') },
    { icon: '🅿️', label: t('property.amenities.parking') },
    { icon: '📺', label: t('property.amenities.tv') },
    { icon: '🧺', label: t('property.amenities.laundry') },
  ];

  const calculateTotal = () => {
    if (!bookingDates.checkIn || !bookingDates.checkOut) return 0;
    const start = new Date(bookingDates.checkIn);
    const end = new Date(bookingDates.checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * property.price_per_night : 0;
  };

  const handleBook = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
  };

  return (
    <div>
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem'
          }}>
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '1rem',
                overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                <img
                  src={images[selectedImage]}
                  alt={property.title}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {images.length > 1 && (
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  overflowX: 'auto',
                  marginBottom: '2rem'
                }}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      style={{
                        flexShrink: 0,
                        border: selectedImage === idx ? '3px solid var(--primary-600)' : 'none',
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        padding: 0,
                        background: 'none'
                      }}
                    >
                      <img
                        src={img}
                        alt={`${property.title} ${idx + 1}`}
                        style={{
                          width: '100px',
                          height: '70px',
                          objectFit: 'cover'
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  {property.title}
                </h1>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap',
                  marginBottom: '1rem',
                  color: 'var(--text-secondary)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={16} />
                    {property.city}
                  </span>
                  {property.rating > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Star size={16} fill="#facc15" color="#facc15" />
                      {property.rating?.toFixed(1)}
                    </span>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  marginBottom: '1.5rem',
                  padding: '1rem 0',
                  borderTop: '1px solid var(--border-color)',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  {property.max_guests > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={20} color="var(--primary-600)" />
                      {property.max_guests} {t('property.guests')}
                    </span>
                  )}
                  {property.bedrooms > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Bed size={20} color="var(--primary-600)" />
                      {property.bedrooms} {t('property.bedrooms')}
                    </span>
                  )}
                  {property.bathrooms > 0 && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Bath size={20} color="var(--primary-600)" />
                      {property.bathrooms} {t('property.bathrooms')}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                  {t('property.description')}
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {property.description}
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                  {t('property.amenities')}
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  {amenities.map((amenity, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>{amenity.icon}</span>
                      <span style={{ fontSize: '0.875rem' }}>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
                  {t('property.location')}
                </h2>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <MapPin size={18} />
                  {property.address}, {property.city}
                </p>
              </div>
            </div>

            <div>
              <div className="card" style={{ position: 'sticky', top: '100px' }}>
                <div className="card-body">
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-600)' }}>
                      {new Intl.NumberFormat('ar-DZ').format(property.price_per_night)} DZD
                    </span>
                    <span style={{ color: 'var(--text-secondary)', marginRight: '0.5rem' }}>
                      {t('property.perNight')}
                    </span>
                  </div>

                  <div className="form-group">
                    <label>{t('booking.checkIn')}</label>
                    <input
                      type="date"
                      value={bookingDates.checkIn}
                      onChange={(e) => setBookingDates({ ...bookingDates, checkIn: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>{t('booking.checkOut')}</label>
                    <input
                      type="date"
                      value={bookingDates.checkOut}
                      onChange={(e) => setBookingDates({ ...bookingDates, checkOut: e.target.value })}
                      min={bookingDates.checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>{t('booking.guests')}</label>
                    <select
                      value={bookingDates.guests}
                      onChange={(e) => setBookingDates({ ...bookingDates, guests: Number(e.target.value) })}
                    >
                      {Array.from({ length: property.max_guests || 10 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  {bookingDates.checkIn && bookingDates.checkOut && (
                    <div style={{
                      padding: '1rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: '0.5rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>{new Intl.NumberFormat('ar-DZ').format(property.price_per_night)} DZD x {calculateTotal() / property.price_per_night || 0} {t('booking.nights')}</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        marginTop: '0.75rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--border-color)'
                      }}>
                        <span>{t('booking.total')}</span>
                        <span style={{ color: 'var(--primary-600)' }}>
                          {new Intl.NumberFormat('ar-DZ').format(calculateTotal())} DZD
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    className="btn btn-primary btn-block btn-lg"
                    onClick={handleBook}
                    disabled={!bookingDates.checkIn || !bookingDates.checkOut}
                  >
                    {t('property.book')}
                  </button>

                  {!user && (
                    <p style={{
                      textAlign: 'center',
                      marginTop: '1rem',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {t('booking.loginRequired')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetail;
