import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EnhancedPropertyCard } from '../components/property/EnhancedPropertyCard';
import { PropertyCardSkeleton } from '../components/property/PropertyCardSkeleton';
import { AdvancedPropertyFilters } from '../components/enhanced/AdvancedPropertyFilters';
import { RevealAnimation } from '../components/ui/RevealAnimation';
import { FloatingShape } from '../components/ui/FloatingElements';
import { usePropertyStore } from '../store/propertyStore';
import { Button } from '../components/ui/Button';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { GlassCard } from '../components/ui/GlassCard';
import { useAuthStore } from '../store/authStore';
import { User, LogIn, UserPlus } from 'lucide-react';

export const Properties: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  
  const {
    filteredProperties,
    loading,
    searchFilters,
    fetchProperties,
    setSearchFilters,
    searchProperties
  } = usePropertyStore();

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-8">
            <div>
              <div className="h-6 lg:h-8 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-64 animate-pulse"></div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="h-9 lg:h-10 bg-gray-300 rounded w-32 animate-pulse"
                onClick={() => navigate(isAuthenticated ? '/post-property' : '/login')}
              ></div>
            </div>
          </div>

          {/* Search Bar Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 mb-4 lg:mb-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4">
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-10 lg:h-12 bg-gray-300 rounded"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-10 lg:h-12 bg-gray-300 rounded"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                <div className="h-10 lg:h-12 bg-gray-300 rounded"></div>
              </div>
              <div>
                <div className="h-10 lg:h-12 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* Subscription Banner Skeleton */}
          <div className="bg-gray-300 rounded-lg h-20 lg:h-24 mb-4 lg:mb-6 animate-pulse"></div>

          {/* Property Cards Skeleton */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6'
              : 'space-y-4 lg:space-y-6'
          }>
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertyCardSkeleton key={index} viewMode={viewMode} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 relative">
      {/* Background Elements */}
      <FloatingShape className="top-20 left-20" size="sm" color="emerald" opacity={0.03} />
      <FloatingShape className="bottom-20 right-20" size="md" color="blue" opacity={0.03} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-8">
          <RevealAnimation animation="slide-right" delay={100}>
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2">
                Available Properties
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                Explore {filteredProperties.length} properties available for sale and rent
              </p>
            </div>
          </RevealAnimation>
          
          {isAuthenticated && (
            <RevealAnimation animation="slide-left" delay={200}>
              <div className="mt-4 md:mt-0">
                <Button
                  variant="primary"
                  onClick={() => navigate('/post-property')}
                  className="w-full md:w-auto text-sm lg:text-base shadow-strong"
                  size="md"
                  icon={<Plus className="w-4 h-4" />}
                >
                  <span className="hidden sm:inline">List Property</span>
                  <span className="sm:hidden">List</span>
                </Button>
              </div>
            </RevealAnimation>
          )}
        </div>

        {/* Search Bar */}
        <AdvancedPropertyFilters
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          onSearch={searchProperties}
          resultsCount={filteredProperties.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Login prompt for non-authenticated users */}
        {!isAuthenticated && (
          <RevealAnimation animation="fade" delay={300}>
            <GlassCard intensity="light" tint="emerald" className="mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Sign in for full access</h3>
                  <p className="text-gray-600 text-sm">Create an account to contact property owners and save your favorites</p>
                </div>
                <div className="flex gap-3">
                  <AnimatedButton
                    variant="outline"
                    className="whitespace-nowrap"
                    onClick={() => navigate('/login')}
                    icon={<LogIn className="w-4 h-4" />}
                  >
                    Sign In
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary" 
                    className="whitespace-nowrap"
                    onClick={() => navigate('/register')}
                    icon={<UserPlus className="w-4 h-4" />}
                    glow
                  >
                    Create Account
                  </AnimatedButton>
                </div>
              </div>
            </GlassCard>
          </RevealAnimation>
        )}

        {/* Results */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-8 lg:py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 lg:w-16 lg:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4 text-sm lg:text-base">
              Try adjusting your search criteria or browse all properties.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                setSearchFilters({});
                searchProperties('');
              }}
              size="md"
            >
              View All Properties
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' ? 
              'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6' : 
              'space-y-3 sm:space-y-4 lg:space-y-6'
          }>
            {filteredProperties.map((property) => (
              <EnhancedPropertyCard 
                key={property.id} 
                property={property} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-8 lg:mt-12">
            <Button variant="outline" size="lg">
              Load More Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};