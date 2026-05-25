import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Search, ListFilter as Filter, Hop as HomeIcon, SlidersHorizontal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import PropertyCard from '../components/PropertyCard';

const Properties = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    sortBy: 'rating',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select('id, title, city, price_per_night, images, bedrooms, bathrooms, max_guests, rating, property_type')
        .eq('is_available', true);

      const { data, error } = await query.order('rating', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = useMemo(() => {
    return properties
      .filter((property) => {
        const matchesSearch =
          !searchTerm ||
          property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.city?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCity = !filters.city || property.city?.toLowerCase().includes(filters.city.toLowerCase());
        const matchesType = !filters.type || property.property_type === filters.type;
        const matchesMinPrice = !filters.minPrice || property.price_per_night >= Number(filters.minPrice);
        const matchesMaxPrice = !filters.maxPrice || property.price_per_night <= Number(filters.maxPrice);
        const matchesBedrooms = !filters.bedrooms || property.bedrooms >= Number(filters.bedrooms);

        return matchesSearch && matchesCity && matchesType && matchesMinPrice && matchesMaxPrice && matchesBedrooms;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-low':
            return a.price_per_night - b.price_per_night;
          case 'price-high':
            return b.price_per_night - a.price_per_night;
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          default:
            return 0;
        }
      });
  }, [properties, searchTerm, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      sortBy: 'rating',
    });
    setSearchTerm('');
  };

  const propertyTypes = [
    { value: 'apartment', label: t('property.type.apartment') },
    { value: 'house', label: t('property.type.house') },
    { value: 'villa', label: t('property.type.villa') },
    { value: 'chalet', label: t('property.type.chalet') },
    { value: 'room', label: t('property.type.room') },
  ];

  const sortOptions = [
    { value: 'rating', label: t('properties.sort.rating') },
    { value: 'price-low', label: t('properties.sort.priceLow') },
    { value: 'price-high', label: t('properties.sort.priceHigh') },
    { value: 'newest', label: t('properties.sort.newest') },
  ];

  return (
    <div>
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="section-title">{t('properties.title')}</h1>
            <p className="section-subtitle">{t('properties.subtitle')}</p>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-tertiary)'
                }}
              />
              <input
                type="text"
                placeholder={t('properties.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingRight: '3rem' }}
              />
            </div>

            <button
              className="btn btn-outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={18} />
              {t('common.filter')}
            </button>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              style={{ width: 'auto', minWidth: '180px' }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {showFilters && (
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-body">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem'
                }}>
                  <div className="form-group">
                    <label>{t('properties.filter.type')}</label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                    >
                      <option value="">{t('properties.filter.allTypes')}</option>
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>{t('properties.filter.minPrice')}</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>{t('properties.filter.maxPrice')}</label>
                    <input
                      type="number"
                      placeholder="100000"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>{t('property.bedrooms')}</label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    >
                      <option value="">{t('properties.filter.any')}</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}+</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-ghost" onClick={clearFilters}>
                    {t('properties.filter.clear')}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div style={{
            marginBottom: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem'
          }}>
            {t('properties.count', { count: filteredProperties.length })}
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="no-results">
              <HomeIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3>{t('common.noResults')}</h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                {t('properties.noResultsText')}
              </p>
              <button className="btn btn-outline" onClick={clearFilters} style={{ marginTop: '1rem' }}>
                {t('properties.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
