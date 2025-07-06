import React from 'react';
import { clsx } from 'clsx';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glassmorphism?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'glow';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: boolean;
  gradient?: boolean;
  animated?: boolean;
  tilt?: boolean;
  onClick?: () => void;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className,
  hover = false,
  glow = false,
  glassmorphism = false,
  padding = 'md',
  shadow = 'sm',
  rounded = 'lg',
  border = true,
  gradient = false,
  animated = false,
  tilt = false,
  onClick
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3 lg:p-4',
    md: 'p-4 lg:p-6',
    lg: 'p-6 lg:p-8',
    xl: 'p-8 lg:p-10'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-soft',
    md: 'shadow-medium',
    lg: 'shadow-strong',
    xl: 'shadow-2xl',
    glow: 'shadow-glow'
  };

  const roundedClasses = {
    sm: 'rounded-md lg:rounded-lg',
    md: 'rounded-lg lg:rounded-xl',
    lg: 'rounded-xl lg:rounded-2xl',
    xl: 'rounded-2xl lg:rounded-3xl',
    '2xl': 'rounded-3xl lg:rounded-[2rem]'
  };

  const baseClasses = clsx(
    'relative overflow-hidden transition-all duration-500 ease-out transform-gpu',
    // Background styles
    glassmorphism 
      ? 'bg-white/80 backdrop-blur-md border-white/20' 
      : gradient 
        ? 'bg-gradient-to-br from-white via-gray-50 to-white' 
        : 'bg-white',
    // Shape
    roundedClasses[rounded],
    border && !glassmorphism && 'border border-gray-200/80',
    // Shadow
    shadowClasses[shadow],
    // Interactive states
    hover && [
      'hover:shadow-strong hover:-translate-y-2 hover:scale-[1.02] cursor-pointer',
      glow && 'hover:shadow-glow-lg',
      tilt && 'hover:rotate-1'
    ],
    // Animations
    animated && 'animate-fade-in-up',
    // Spacing
    paddingClasses[padding],
    // Clickable
    onClick && 'cursor-pointer',
    className
  );

  return (
    <div className={baseClasses} onClick={onClick}>
      {/* Glassmorphism effect */}
      {glassmorphism && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
      )}
      
      {/* Gradient overlay for hover effect */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-blue-50/30 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
      
      {/* Glow effect */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10" />
      )}
      
      {/* Shimmer effect */}
      {hover && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};