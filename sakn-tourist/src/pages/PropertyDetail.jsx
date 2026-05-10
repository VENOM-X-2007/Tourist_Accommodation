import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Users, Bed, Bath, Wifi, Car, Home, Check, CreditCard, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { properties } from '../data/properties';

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  if (!property) {
    return <div className="container">عقار غير موجود</div>;
  }

  const nights = 3;
  const subtotal = property.price * nights;
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  return (
    <div className="property-detail">
      <Navbar />
      
      <div className="container">
        {/* Image Gallery */}
        <div className="property-gallery">
          <img src={property.image} alt={property.title} className="main-image" />
        </div>

        {/* Property Info */}
        <div className="property-info-grid">
          <div className="property-main-info">
            <h1>{property.title}</h1>
            <div className="property-header-info">
              <span><MapPin size={18} /> {property.location}</span>
              <span><Star size={18} fill="#FFD700" color="#FFD700" /> {property.rating} ({property.reviews} تقييم)</span>
            </div>

            <div className="property-specs">
              <span><Users size={20} /> {property.guests} ضيوف</span>
              <span><Bed size={20} /> {property.bedrooms} غرف نوم</span>
              <span><Bath size={20} /> {property.bathrooms} حمام</span>
            </div>

            <div className="property-description">
              <h2>وصف العقار</h2>
              <p>{property.description}</p>
            </div>

            <div className="property-amenities">
              <h2>المرافق</h2>
              <div className="amenities-grid">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-item">
                    <Check size={18} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="booking-sidebar">
            <div className="price-card">
              <div className="price-header">
                <span className="price-large">{property.price.toLocaleString()} د.ج</span>
                <span className="price-period">/ ليلة</span>
              </div>

              <div className="booking-form">
                <div className="date-inputs">
                  <div className="input-group">
                    <label>تاريخ الوصول</label>
                    <div className="input-with-icon">
                      <Calendar size={18} />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label>تاريخ المغادرة</label>
                    <div className="input-with-icon">
                      <Calendar size={18} />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary btn-block">احجز الآن</button>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>{property.price.toLocaleString()} د.ج × {nights} ليالي</span>
                  <span>{subtotal.toLocaleString()} د.ج</span>
                </div>
                <div className="price-row">
                  <span>رسوم الخدمة</span>
                  <span>{serviceFee.toLocaleString()} د.ج</span>
                </div>
                <div className="price-row total">
                  <span>المجموع</span>
                  <span>{total.toLocaleString()} د.ج</span>
                </div>
              </div>

              <div className="payment-info">
                <CreditCard size={18} />
                <span>دفع آمن ومحمي</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
