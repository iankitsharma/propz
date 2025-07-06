import React from 'react';
import { clsx } from 'clsx';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'emerald' | 'blue' | 'purple' | 'orange' | 'pink';
  variant?: 'default' | 'glass' | 'gradient';
  animated?: boolean;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  color = 'emerald',
  variant = 'default',
  animated = true,
  className
}) => {
  const colorClasses = {
    emerald: 'text-emerald-600 bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white',
    blue: 'text-blue-600 bg-blue-100 group-hover:bg-blue-600 group-hover:text-white',
    purple: 'text-purple-600 bg-purple-100 group-hover:bg-purple-600 group-hover:text-white',
    orange: 'text-orange-600 bg-orange-100 group-hover:bg-orange-600 group-hover:text-white',
    pink: 'text-pink-600 bg-pink-100 group-hover:bg-pink-600 group-hover:text-white'
  };

  const variantClasses = {
    default: 'bg-white border border-gray-200 hover:shadow-strong',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 hover:bg-white/90',
    gradient: 'bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200 hover:shadow-glow'
  };

  return (
    <div className={clsx(
      'relative p-6 lg:p-8 rounded-2xl transition-all duration-300 group cursor-pointer overflow-hidden',
      variantClasses[variant],
      animated && 'hover:-translate-y-2 hover:scale-[1.02]',
      className
    )}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/50 to-gray-100/50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className={clsx(
          'w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 transition-all duration-300',
          colorClasses[color]
        )}>
          <Icon className="w-6 h-6 lg:w-8 lg:h-8 transition-transform duration-300 group-hover:scale-110" />
        </div>

        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4 group-hover:text-emerald-600 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
          {description}
        </p>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
};