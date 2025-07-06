import React, { useState } from 'react';
import { Plus, Search, Filter, Sliders, ChevronDown, X, Info, MapPin, Sparkles, LogIn } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { RequirementCard } from '../components/requirement/RequirementCard';
import { RequirementCardSkeleton } from '../components/requirement/RequirementCardSkeleton';
import { useRequirementStore } from '../store/requirementStore';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { Input } from '../components/ui/Input';
import { GlassCard } from '../components/ui/GlassCard';
import { RevealAnimation } from '../components/ui/RevealAnimation';
import { FloatingShape } from '../components/ui/FloatingElements';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { User, UserPlus } from 'lucide-react';

export const Requirements: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { 
    filteredRequirements, 
    loading, 
    fetchRequirements, 
    searchRequirements 
  } = useRequirementStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  React.useEffect(() => {
    fetchRequirements();
  }, [fetchRequirements]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRequirements(searchQuery);
  };

  const clearFilters = () => {
    setSearchQuery('');
    searchRequirements('');
    setShowFilters(false);
  };
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
              <div className="h-9 lg:h-10 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          {/* Search and Filters Skeleton */}
          <Card className="mb-4 lg:mb-6 animate-pulse">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 h-10 lg:h-12 bg-gray-300 rounded"></div>
              <div className="h-10 lg:h-12 w-20 bg-gray-300 rounded"></div>
            </div>
          </Card>

          {/* Requirements List Skeleton */}
          <div className="space-y-4 lg:space-y-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <RequirementCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 relative overflow-hidden">
      {/* Background Elements */}
      <FloatingShape className="top-20 left-20" size="md" color="emerald" opacity={0.03} />
      <FloatingShape className="bottom-20 right-20" size="sm" color="blue" opacity={0.03} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealAnimation animation="slide-down" delay={100}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 lg:mb-8">
            <div>
              <Badge className="mb-3" variant="gradient" glow>
                <UserPlus className="w-3 h-3 mr-1" />
                Land Requirements
              </Badge>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-2">
                Find Perfect Matches
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                Browse active land requirements from verified seekers
              </p>
            </div>
          
            {isAuthenticated && (
              <div className="mt-3 sm:mt-0">
                <AnimatedButton
                  variant="primary"
                  className="w-full sm:w-auto shadow-strong"
                  size="md"
                  glow
                  icon={<Plus className="w-4 h-4" />}
                >
                  <span className="hidden sm:inline">Post Requirement</span>
                  <span className="sm:hidden">Post</span>
                </AnimatedButton>
              </div>
            )}
          </div>
        </RevealAnimation>

        {/* Search and Filters */}
        <RevealAnimation animation="fade" delay={200}>
          <GlassCard intensity="medium" className="mb-4 lg:mb-6 bg-white/90">
            <div className="flex flex-col md:flex-row gap-3 lg:gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search requirements by location, type, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                  className="h-10 lg:h-12 shadow-soft border-0"
                />
              </div>
              <AnimatedButton
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm lg:text-base"
                size="md"
                icon={<Sliders className="w-4 h-4" />}
              >
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </AnimatedButton>
            </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 animate-fade-in-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Badge variant="primary" size="sm" className="mr-2">Transaction</Badge>
                      <span>Transaction Type</span>
                    </div>
                  </label>
                  <select className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm lg:text-base">
                    <option value="">All Types</option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                    <option value="lease">Lease</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Badge variant="secondary" size="sm" className="mr-2">Type</Badge>
                      <span>Land Type</span>
                    </div>
                  </label>
                  <select className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm lg:text-base">
                    <option value="">All Types</option>
                    <option value="agricultural">Agricultural</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Badge variant="success" size="sm" className="mr-2">Location</Badge>
                      <span>Location</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm lg:text-base shadow-soft"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Badge variant="warning" size="sm" className="mr-2">Status</Badge>
                      <span>Status</span>
                    </div>
                  </label>
                  <select className="w-full p-2 lg:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm lg:text-base">
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
                <AnimatedButton
                  variant="ghost" 
                  size="sm"
                  onClick={clearFilters}
                  className="mr-2"
                >
                  Clear
                </AnimatedButton>
                <AnimatedButton
                  variant="primary" 
                  size="sm"
                  glow
                >
                  Apply Filters
                </AnimatedButton>
              </div>
            </div>
          )}
          </GlassCard>
        </RevealAnimation>

        {/* Login prompt for non-authenticated users */}
        {!isAuthenticated && (
          <RevealAnimation animation="fade" delay={300}>
            <GlassCard intensity="medium" className="mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Sign in for full access</h3>
                  <p className="text-gray-600 text-sm">Create an account to contact land seekers and post your own requirements</p>
                </div>
                <div className="flex gap-3">
                  <AnimatedButton
                    variant="outline"
                    size="md"
                    as={Link}
                    to="/login"
                    className="whitespace-nowrap"
                    icon={<LogIn className="w-4 h-4" />}
                  >
                    Sign In
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary"
                    size="md"
                    as={Link}
                    to="/register"
                    glow
                    className="whitespace-nowrap"
                    icon={<UserPlus className="w-4 h-4" />}
                  >
                    Create Account
                  </AnimatedButton>
                </div>
              </div>
            </GlassCard>
          </RevealAnimation>
        )}

        {/* No Results Display */}
        {filteredRequirements.length === 0 && (
          <RevealAnimation animation="scale" delay={300}>
            <GlassCard intensity="medium" className="py-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Info className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">No Requirements Found</h3>
                <p className="text-gray-600 mb-6">There are currently no active requirements matching your filters.</p>
                <AnimatedButton 
                  variant="primary"
                  onClick={clearFilters}
                  size="md"
                >
                  View All Requirements
                </AnimatedButton>
              </div>
            </GlassCard>
          </RevealAnimation>
        )}
        {/* Requirements List */}
        {filteredRequirements.length > 0 && (
          <div className="space-y-4 lg:space-y-6">
            {filteredRequirements.slice(0, 6).map((requirement, index) => (
              <RevealAnimation key={requirement.id} animation="slide-up" delay={300 + index * 100}>
                <RequirementCard requirement={requirement} />
              </RevealAnimation>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredRequirements.length > 0 && (
          <RevealAnimation animation="fade" delay={600}>
            <div className="text-center mt-8 lg:mt-12">
              <AnimatedButton 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto shadow-soft hover:shadow-medium"
                icon={<Sparkles className="w-5 h-5" />}
              >
                Load More Requirements
              </AnimatedButton>
            </div>
          </RevealAnimation>
        )}
      </div>
    </div>
  );
};