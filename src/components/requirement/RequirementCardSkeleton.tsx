import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export const RequirementCardSkeleton: React.FC = () => {
  return (
    <GlassCard intensity="light" className="animate-pulse relative">
      {/* Top right badge skeleton */}
      <div className="absolute top-4 right-4 w-16 h-6 bg-gray-300 rounded-full"></div>
      
      {/* Top left badge skeleton */}
      <div className="absolute top-4 left-4 w-12 h-6 bg-gray-300 rounded-full"></div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content skeleton */}
        <div className="flex-1">
          {/* Title with match percentage */}
          <div className="flex items-start justify-between mb-4 pr-16">
            <div className="h-6 lg:h-7 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 lg:h-7 bg-gray-300 rounded w-16"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-5 bg-gray-300 rounded w-32"></div>
              </div>
            ))}
          </div>

          {/* Description Skeleton */}
          <div className="mb-6">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>

          {/* Specific Needs Skeleton */}
          <div>
            <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
            <div className="flex flex-wrap gap-1">
              <div className="h-6 bg-gray-300 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-16"></div>
              <div className="h-6 bg-gray-300 rounded w-24"></div>
              <div className="h-6 bg-gray-300 rounded w-18"></div>
            </div>
          </div>
        </div>

        {/* Side panel skeleton */}
        <div className="lg:w-64 flex flex-col space-y-4">
          <div className="bg-gray-200 rounded-xl p-4 h-48">
            <div className="h-5 bg-gray-300 rounded w-32 mb-4"></div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-4/5"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
            <div className="flex space-x-2">
              <div className="h-8 bg-gray-300 rounded flex-1"></div>
              <div className="h-8 bg-gray-300 rounded flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};