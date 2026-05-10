import React from 'react';
import { MapPin, Star, Users, Bed, Bath } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.title} />
        <span className="property-type">{property.type}</span>
      </div>
      <div className="property-content">
        <h3 className="property-title">{property.title}</h3>
        <div className="property-location">
          <MapPin size={16} />
          <span>{property.location}</span>
        </div>
        <div className="property-features">
          <span><Users size={16} /> {property.guests} ضيوف</span>
          <span><Bed size={16} /> {property.bedrooms} غرف</span>
          <span><Bath size={16} /> {property.bathrooms} حمام</span>
        </div>
        <div className="property-footer">
          <div className="property-rating">
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span>{property.rating}</span>
            <span className="reviews">({property.reviews} تقييم)</span>
          </div>
          <div className="property-price">
            <span className="price">{property.price.toLocaleString()} د.ج</span>
            <span className="period">/ ليلة</span>
          </div>
        </div>
        <Link to={`/property/${property.id}`} className="btn btn-primary btn-block">احجز الآن</Link>
      </div>
    </div>
  );
};

export default PropertyCard;
