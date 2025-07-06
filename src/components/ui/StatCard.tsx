import React from 'react';
import { clsx } from 'clsx';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  color?: 'emerald' | 'blue' | 'purple' | 'orange';
  animated?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  change,
  color = 'emerald',
  animated = true,
  className
}) => {
  const colorClasses = {
    emerald: 'text-emerald-600 bg-emerald-100',
    blue: 'text-blue-600 bg-blue-100',
    purple: 'text-purple-600 bg-purple-100',
    orange: 'text-orange-600 bg-orange-100'
  };

  return (
    <div className={clsx(
      'relative bg-white p-6 lg:p-8 rounded-2xl border border-gray-200 shadow-soft transition-all duration-300 group overflow-hidden',
      animated && 'hover:shadow-strong hover:-translate-y-1',
      className
    )}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={clsx(
            'w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
            colorClasses[color]
          )}>
            <Icon className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
          </div>

          {change && (
            <div className={clsx(
              'px-2 py-1 rounded-lg text-xs font-medium',
              change.type === 'increase' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            )}>
              {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
            </div>
          )}
        </div>

        <div className="space-y-1">
          <div className="text-xl lg:text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {value}
          </div>
          <div className="text-xs lg:text-base font-medium text-gray-600">
            {label}
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'xor'
      }} />
    </div>
  );
};