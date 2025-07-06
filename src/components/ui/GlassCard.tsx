import React from 'react';
import { clsx } from 'clsx';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  tint?: 'none' | 'emerald' | 'blue' | 'purple';
  hover?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  intensity = 'medium',
  tint = 'none',
  hover = false,
  animated = false,
  onClick
}) => {
  const intensityClasses = {
    light: 'bg-white/10 backdrop-blur-sm',
    medium: 'bg-white/20 backdrop-blur-md',
    strong: 'bg-white/30 backdrop-blur-lg'
  };

  const tintClasses = {
    none: '',
    emerald: 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5',
    blue: 'bg-gradient-to-br from-blue-500/10 to-blue-600/5',
    purple: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5'
  };

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl',
        intensityClasses[intensity],
        tintClasses[tint],
        hover && [
          'transition-all duration-500 cursor-pointer',
          'hover:bg-white/30 hover:backdrop-blur-xl',
          'hover:border-white/30 hover:shadow-glow',
          'hover:scale-[1.02] hover:-translate-y-2'
        ],
        animated && 'animate-fade-in-up',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 p-6 lg:p-8">
        {children}
      </div>
      
      {/* Shimmer effect */}
      {hover && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
        </div>
      )}
    </div>
  );
};