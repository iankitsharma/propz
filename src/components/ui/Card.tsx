import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  border?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
  shadow = 'sm',
  rounded = 'lg',
  border = true,
  gradient = false,
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
    xl: 'shadow-2xl'
  };

  const roundedClasses = {
    sm: 'rounded-md lg:rounded-lg',
    md: 'rounded-lg lg:rounded-xl',
    lg: 'rounded-xl lg:rounded-2xl',
    xl: 'rounded-2xl lg:rounded-3xl',
    '2xl': 'rounded-3xl lg:rounded-[2rem]'
  };

  const baseClasses = clsx(
    'relative overflow-hidden transition-all duration-300 ease-out',
    gradient 
      ? 'bg-gradient-to-br from-white via-gray-50 to-white' 
      : 'bg-white backdrop-blur-sm',
    roundedClasses[rounded],
    border && 'border border-gray-200/80',
    shadowClasses[shadow],
    hover && 'hover:shadow-strong hover:-translate-y-1 lg:hover:-translate-y-2 hover:scale-[1.01] lg:hover:scale-[1.02] cursor-pointer',
    paddingClasses[padding],
    onClick && 'cursor-pointer',
    className
  );

  return (
    <div className={baseClasses} onClick={onClick}>
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-blue-50/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};