import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [propertyType, setPropertyType] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = propertyType === 'all' || property.type === propertyType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    return matchesSearch && matchesType && matchesPrice;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="properties-page">
      <Navbar />
      
      <div className="container">
        <div className="page-header">
          <h1>جميع العقارات</h1>
          <p>اعثر على الإقامة المثالية لرحلتك</p>
        </div>

        <div className="filters-section">
          <div className="search-filter">
            <Search size={20} />
            <input
              type="text"
              placeholder="ابحث بالاسم أو الموقع..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="all">جميع الأنواع</option>
              <option value="شقة">شقة</option>
              <option value="فيلا">فيلا</option>
              <option value="منزل">منزل</option>
              <option value="استوديو">استوديو</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">الأكثر ظهوراً</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="rating">التقييم</option>
            </select>
          </div>
        </div>

        {sortedProperties.length > 0 ? (
          <div className="properties-grid">
            {sortedProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>لم يتم العثور على نتائج</h3>
            <p>جرب تغيير معايير البحث</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
