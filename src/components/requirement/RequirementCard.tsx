import React from 'react';
import { MapPin, Calendar, User, MessageCircle, CheckCircle, Clock, AlertCircle, ChevronsRight, Heart, Eye, Share2, Info, Zap, UserPlus } from 'lucide-react';
import { Requirement } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { AnimatedButton } from '../ui/AnimatedButton';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface RequirementCardProps {
  requirement: Requirement;
}

export const RequirementCard: React.FC<RequirementCardProps> = ({ requirement }) => {
  const { isAuthenticated } = useAuthStore();
  
  const getStatusBadge = () => {
    switch (requirement.status) {
      case 'active':
        return <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'fulfilled':
        return <Badge variant="primary"><CheckCircle className="w-3 h-3 mr-1" />Fulfilled</Badge>;
      case 'closed':
        return <Badge variant="gray"><Clock className="w-3 h-3 mr-1" />Closed</Badge>;
      default:
        return <Badge variant="warning"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const formatBudget = () => {
    if (requirement.transaction_type === 'buy' && requirement.budget_range) {
      return `₹${(requirement.budget_range.min / 100000).toFixed(1)}L - ₹${(requirement.budget_range.max / 100000).toFixed(1)}L`;
    }
    if (requirement.transaction_type === 'rent' && requirement.rent_budget) {
      return `₹${(requirement.rent_budget.min / 1000).toFixed(0)}K - ₹${(requirement.rent_budget.max / 1000).toFixed(0)}K/${requirement.rent_budget.duration}`;
    }
    return 'Budget not specified';
  };

  // Calculate freshness of requirement (days old)
  const daysOld = Math.floor((new Date().getTime() - new Date(requirement.created_at).getTime()) / (1000 * 3600 * 24));
  const isFresh = daysOld < 7; // Less than a week old

  // Calculate match percentage (for demo purposes)
  const matchPercentage = Math.floor(Math.random() * 41) + 60; // 60-100%
  const getMatchColor = () => {
    if (matchPercentage >= 90) return 'text-emerald-600';
    if (matchPercentage >= 80) return 'text-green-600';
    if (matchPercentage >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <GlassCard 
      intensity="light" 
      tint="emerald" 
      hover 
      className="relative"
    >
      {/* Top right status badge */}
      <div className="absolute top-4 right-4">
        {getStatusBadge()}
      </div>
      
      {/* Fresh indicator */}
      {isFresh && (
        <div className="absolute top-4 left-4">
          <Badge variant="success" size="sm">
            <Zap className="w-3 h-3 mr-1 animate-pulse" />
            New
          </Badge>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1">
          {/* Title with match percentage */}
          <div className="flex items-start justify-between mb-4 pr-16">
            <h3 className="text-lg lg:text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {requirement.purpose}
            </h3>
            <div className={`font-bold text-lg ${getMatchColor()}`}>
              {matchPercentage}%
              <span className="text-xs text-gray-600 ml-1">match</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-600 mb-1 flex items-center">
                <Badge variant="gray" size="sm" className="mr-2">Type</Badge>
                Transaction
              </div>
              <div className="font-medium capitalize flex items-center">
                <Badge variant={requirement.transaction_type === 'buy' ? 'primary' : 'secondary'} size="sm">
                  {requirement.transaction_type}
                </Badge>
              </div>
            </div>
        
            <div>
              <div className="text-sm text-gray-600 mb-1 flex items-center">
                <Badge variant="gray" size="sm" className="mr-2">Category</Badge>
                Land Type
              </div>
              <div className="font-medium capitalize">
                <Badge variant="gray" size="sm">{requirement.land_type}</Badge>
              </div>
            </div>
        
            <div>
              <div className="text-sm text-gray-600 mb-1 flex items-center">
                <Badge variant="gray" size="sm" className="mr-2">Where</Badge>
                Location
              </div>
              <div className="font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                {requirement.location.area ? 
                  `${requirement.location.area}, ${requirement.location.district}, ${requirement.location.state}` :
                  `${requirement.location.district}, ${requirement.location.state}`
                }
              </div>
            </div>
        
            <div>
              <div className="text-sm text-gray-600 mb-1 flex items-center">
                <Badge variant="gray" size="sm" className="mr-2">Size</Badge>
                Land Area
              </div>
              <div className="font-medium">
                {requirement.size_range.min} - {requirement.size_range.max} {requirement.size_range.unit}
              </div>
            </div>
        
            <div>
              <div className="text-sm text-gray-600 mb-1 flex items-center">
                <Badge variant="gray" size="sm" className="mr-2">Budget</Badge>
                Price Range
              </div>
              <div className="font-medium text-emerald-600">
                {formatBudget()}
              </div>
            </div>
        
            <div>
              <div className="text-sm text-gray-600 mb-1 flex items-center">
                <Badge variant="gray" size="sm" className="mr-2">When</Badge>
                Timeline
              </div>
              <div className="font-medium flex items-center">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                {requirement.timeline}
              </div>
            </div>
          </div>

          {/* Description */}
          {requirement.description && (
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-1 text-emerald-600" />
                Description
              </div>
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{requirement.description}</p>
            </div>
          )}

          {/* Specific Needs */}
          {requirement.specific_needs.length > 0 && (
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-emerald-600" />
                Specific Requirements
              </div>
              <div className="flex flex-wrap gap-1">
                {requirement.specific_needs.map((need, index) => (
                  <Badge key={index} variant={index % 2 === 0 ? 'primary' : 'secondary'} size="sm">{need}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side panel with actions */}
        <div className="lg:w-64 flex flex-col space-y-4">
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-100">
            {isAuthenticated ? (
              <>
                <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2 text-emerald-600" />
                  Seeker Information
                </div>
                <div className="mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-2">
                      <User className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Land Seeker</div>
                      <div className="text-xs text-emerald-600 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" /> Verified User
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mb-4">
                  <div className="flex items-center mb-1">
                    <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                    Posted {daysOld} days ago
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-3 h-3 mr-1 text-gray-400" />
                    {requirement.responses} responses
                  </div>
                </div>
                <AnimatedButton 
                  variant="primary" 
                  size="md" 
                  className="w-full mb-2"
                  icon={<MessageCircle className="w-4 h-4" />}
                >
                  Respond
                </AnimatedButton>
                <div className="flex space-x-2">
                  <AnimatedButton variant="ghost" size="sm" className="flex-1 py-1">
                    <Heart className="w-4 h-4" />
                  </AnimatedButton>
                  <AnimatedButton variant="ghost" size="sm" className="flex-1 py-1">
                    <Share2 className="w-4 h-4" />
                  </AnimatedButton>
                </div>
              </>
            ) : (
              <>
                <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2 text-emerald-600" />
                  Sign In Required
                </div>
                <div className="bg-emerald-50 rounded-lg p-3 mb-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Login or register to view seeker details and respond to this requirement
                  </p>
                  <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    Posted {daysOld} days ago
                  </div>
                </div>
                <AnimatedButton 
                  variant="primary" 
                  size="md" 
                  className="w-full mb-2" 
                  as={Link} 
                  to="/login"
                  icon={<User className="w-4 h-4" />}
                >
                  Sign In to Respond
                </AnimatedButton>
                <AnimatedButton 
                  variant="outline" 
                  size="md" 
                  className="w-full" 
                  as={Link} 
                  to="/register"
                  icon={<UserPlus className="w-4 h-4" />}
                >
                  Create Account
                </AnimatedButton>
              </>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};