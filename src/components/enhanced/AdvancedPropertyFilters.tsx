import React, { useState } from 'react';
import { Search, Filter, X, MapPin, Home, Coins, Calendar, Sliders, Grid, List, SortAsc, ChevronDown } from 'lucide-react';
import { SearchFilters } from '../../types';
import { AnimatedButton } from '../ui/AnimatedButton';
import { Input } from '../ui/Input';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { RevealAnimation } from '../ui/RevealAnimation';

interface AdvancedPropertyFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: (query: string) => void;
  resultsCount: number;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const AdvancedPropertyFilters: React.FC<AdvancedPropertyFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  resultsCount,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearFilters = () => {
    onFiltersChange({});
    setSearchQuery('');
    onSearch('');
  };

  const activeFilterCount = Object.keys(filters).filter(key => filters[key as keyof SearchFilters]).length;

  const priceRanges = [
    { label: 'Under ₹10L', min: 0, max: 1000000 },
    { label: '₹10L - ₹50L', min: 1000000, max: 5000000 },
    { label: '₹50L - ₹1Cr', min: 5000000, max: 10000000 },
    { label: '₹1Cr - ₹5Cr', min: 10000000, max: 50000000 },
    { label: 'Above ₹5Cr', min: 50000000, max: 999999999 }
  ];

  const propertyTypes = [
    { value: 'agricultural', label: 'Agricultural' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' }
  ];

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <RevealAnimation animation="slide-down" delay={100}>
        <GlassCard intensity="medium" className="bg-white/90">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <Input
                  placeholder="Search by location, property type, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-5 h-5 text-gray-400" />}
                  className="h-12 lg:h-14 text-base lg:text-lg border-0 bg-white/80 backdrop-blur-sm shadow-soft"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 lg:gap-3">
                <select
                  value={filters.transaction_type || 'both'}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    transaction_type: e.target.value as any
                  })}
                  className="h-12 lg:h-14 px-4 border-0 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white/80 backdrop-blur-sm shadow-soft min-w-[140px] text-sm lg:text-base"
                >
                  <option value="both">Buy or Rent</option>
                  <option value="buy">Buy Only</option>
                  <option value="rent">Rent Only</option>
                </select>

                <select
                  value={filters.property_type || 'all'}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    property_type: e.target.value === 'all' ? undefined : e.target.value
                  })}
                  className="h-12 lg:h-14 px-4 border-0 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white/80 backdrop-blur-sm shadow-soft min-w-[140px] text-sm lg:text-base"
                >
                  <option value="all">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>

                <AnimatedButton 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="h-12 lg:h-14 px-6 lg:px-8 shadow-strong"
                  glow
                  icon={<Search className="w-4 h-4 lg:w-5 lg:h-5" />}
                >
                  Search
                </AnimatedButton>
              </div>
            </div>
          </form>
        </GlassCard>
      </RevealAnimation>

      {/* Results Bar */}
      <RevealAnimation animation="slide-up" delay={200}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="text-lg lg:text-xl font-semibold text-gray-900">
              {resultsCount.toLocaleString()} Properties Found
            </div>
            
            {activeFilterCount > 0 && (
              <div className="flex items-center space-x-2">
                <Badge variant="primary" className="flex items-center">
                  <Filter className="w-3 h-3 mr-1" />
                  {activeFilterCount} Filter{activeFilterCount > 1 ? 's' : ''}
                </Badge>
                <AnimatedButton variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </AnimatedButton>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Advanced Filters Toggle */}
            <AnimatedButton
              variant="outline"
              size="md"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`${showAdvancedFilters ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : ''}`}
              icon={<Sliders className="w-4 h-4" />}
            >
              Advanced Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              {activeFilterCount > 0 && (
                <Badge variant="primary" size="sm" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
            </AnimatedButton>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-9 lg:h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-sm shadow-soft"
            >
              <option value="featured">Featured First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="size_large">Size: Large to Small</option>
              <option value="size_small">Size: Small to Large</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </RevealAnimation>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <RevealAnimation animation="slide-down" delay={100}>
          <GlassCard intensity="strong" className="bg-white/95 animate-slide-down">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Sliders className="w-5 h-5 mr-2 text-emerald-600" />
                Advanced Filters
              </h3>
              <AnimatedButton
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvancedFilters(false)}
                className="text-gray-400 hover:text-gray-600"
                icon={<X className="w-5 h-5" />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Price Range */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Coins className="w-4 h-4 mr-2 text-emerald-600" />
                  Price Range
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.price_min === range.min && filters.price_max === range.max}
                        onChange={() => onFiltersChange({
                          ...filters,
                          price_min: range.min,
                          price_max: range.max
                        })}
                        className="mr-2 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
                
                {/* Custom Range */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="text-xs font-medium text-gray-600 mb-2">Custom Range</div>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.price_min || ''}
                      onChange={(e) => onFiltersChange({
                        ...filters,
                        price_min: e.target.value ? parseInt(e.target.value) : undefined
                      })}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.price_max || ''}
                      onChange={(e) => onFiltersChange({
                        ...filters,
                        price_max: e.target.value ? parseInt(e.target.value) : undefined
                      })}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                  Location
                </label>
                <Input
                  placeholder="Enter city, district, or state"
                  value={filters.location || ''}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    location: e.target.value
                  })}
                  leftIcon={<MapPin className="w-4 h-4 text-gray-400" />}
                />
                
                {/* Popular Locations */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-600">Popular Locations</div>
                  <div className="flex flex-wrap gap-1">
                    {['Mumbai', 'Pune', 'Nashik', 'Bangalore', 'Chennai'].map((city) => (
                      <button
                        key={city}
                        onClick={() => onFiltersChange({ ...filters, location: city })}
                        className="px-2 py-1 text-xs bg-gray-100 hover:bg-emerald-100 hover:text-emerald-600 rounded-full transition-colors"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Infrastructure</label>
                <div className="space-y-2">
                  {[
                    { key: 'water', label: 'Water Supply' },
                    { key: 'electricity', label: 'Electricity' },
                    { key: 'road_access', label: 'Road Access' },
                    { key: 'drainage', label: 'Drainage' }
                  ].map((infra) => (
                    <label key={infra.key} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.infrastructure?.includes(infra.key) || false}
                        onChange={(e) => {
                          const current = filters.infrastructure || [];
                          const updated = e.target.checked
                            ? [...current, infra.key]
                            : current.filter(item => item !== infra.key);
                          onFiltersChange({
                            ...filters,
                            infrastructure: updated.length > 0 ? updated : undefined
                          });
                        }}
                        className="mr-2 text-emerald-600 focus:ring-emerald-500 rounded"
                      />
                      <span className="text-sm text-gray-700">{infra.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Legal Status */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Legal Status</label>
                <select 
                  value={filters.legal_status || ''}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    legal_status: e.target.value || undefined
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                >
                  <option value="">All Status</option>
                  <option value="clear">Clear Title</option>
                  <option value="disputed">Disputed</option>
                  <option value="under_loan">Under Loan</option>
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
              <AnimatedButton variant="ghost" onClick={clearFilters} className="text-gray-600">
                Reset All Filters
              </AnimatedButton>
              <div className="flex space-x-3">
                <AnimatedButton variant="outline" onClick={() => setShowAdvancedFilters(false)}>
                  Cancel
                </AnimatedButton>
                <AnimatedButton variant="primary" onClick={() => setShowAdvancedFilters(false)} glow>
                  Apply Filters
                </AnimatedButton>
              </div>
            </div>
          </GlassCard>
        </RevealAnimation>
      )}
    </div>
  );
};