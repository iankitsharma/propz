import React from 'react';
import { Card } from '../ui/Card';

interface PropertyCardSkeletonProps {
  viewMode?: 'grid' | 'list';
}

export const PropertyCardSkeleton: React.FC<PropertyCardSkeletonProps> = ({ 
  viewMode = 'grid' 
}) => {
  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden animate-pulse" padding="none">
        <div className="flex flex-col md:flex-row">
          {/* Image Skeleton */}
          <div className="relative md:w-80 h-48 md:h-auto bg-gray-200 flex-shrink-0">
            <div className="absolute top-4 left-4 w-16 h-6 bg-gray-300 rounded-full"></div>
            <div className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-6 bg-gray-300 rounded-full"></div>
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mr-2"></div>
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>

              {/* Price Skeleton */}
              <div className="text-right ml-4">
                <div className="h-8 bg-gray-300 rounded w-20 mb-1"></div>
                <div className="h-6 bg-gray-300 rounded w-16 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-12"></div>
              </div>
            </div>

            {/* Features Skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="h-6 bg-gray-300 rounded w-16"></div>
              <div className="h-6 bg-gray-300 rounded w-12"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-14"></div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>

            {/* Footer Skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-16"></div>
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex space-x-2">
                <div className="h-8 bg-gray-300 rounded w-16"></div>
                <div className="h-8 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden animate-pulse" padding="none">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-200">
        <div className="absolute top-4 left-4 w-16 h-6 bg-gray-300 rounded-full"></div>
        <div className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-12 h-6 bg-gray-300 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="h-6 bg-gray-300 rounded flex-1 mr-2"></div>
          <div className="w-5 h-5 bg-gray-300 rounded-full flex-shrink-0"></div>
        </div>

        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>

        <div className="flex items-center mb-3">
          <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Price Skeleton */}
        <div className="mb-3">
          <div className="h-6 bg-gray-300 rounded w-20 mb-1"></div>
          <div className="h-5 bg-gray-300 rounded w-16 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>

        {/* Features Skeleton */}
        <div className="flex flex-wrap gap-1 mb-3">
          <div className="h-5 bg-gray-300 rounded w-16"></div>
          <div className="h-5 bg-gray-300 rounded w-12"></div>
          <div className="h-5 bg-gray-300 rounded w-20"></div>
          <div className="h-5 bg-gray-300 rounded w-10"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-12 mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-8"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-300 rounded w-16"></div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </Card>
  );
};