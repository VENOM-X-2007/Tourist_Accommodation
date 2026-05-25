import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Bed, Bath } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const { t } = useTranslation();
  const {
    id,
    title,
    city,
    price_per_night,
    images,
    bedrooms,
    bathrooms,
    max_guests,
    rating,
    property_type,
  } = property || {};

  const displayImage = images && images.length > 0
    ? images[0]
    : 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=400';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-DZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  const typeLabels = {
    apartment: t('property.type.apartment'),
    house: t('property.type.house'),
    villa: t('property.type.villa'),
    chalet: t('property.type.chalet'),
    room: t('property.type.room'),
  };

  return (
    <Link to={`/property/${id}`} className="property-card">
      <div className="property-image">
        <img src={displayImage} alt={title} loading="lazy" />
        {property_type && (
          <span className="property-badge">
            {typeLabels[property_type] || property_type}
          </span>
        )}
      </div>
      <div className="property-content">
        <h3 className="property-title">{title}</h3>
        <div className="property-location">
          <MapPin size={14} />
          <span>{city}</span>
        </div>
        <div className="property-features">
          {max_guests > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Users size={14} />
              {max_guests}
            </span>
          )}
          {bedrooms > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Bed size={14} />
              {bedrooms}
            </span>
          )}
          {bathrooms > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Bath size={14} />
              {bathrooms}
            </span>
          )}
        </div>
        <div className="property-footer">
          <div className="property-rating">
            <Star size={14} fill="#facc15" color="#facc15" />
            <span>{rating?.toFixed(1) || '0.0'}</span>
          </div>
          <div className="property-price">
            <span>{formatPrice(price_per_night)} DZD</span>
            <span> {t('property.perNight')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
